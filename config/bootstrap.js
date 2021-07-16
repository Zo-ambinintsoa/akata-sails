/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */



module.exports.bootstrap = async function(done) {

    // Import dependencies
    var path = require('path');

    // This bootstrap version indicates what version of fake data we're dealing with here.
    var HARD_CODED_DATA_VERSION = 1;
    var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');
    if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
        if (process.env.NODE_ENV === 'production' || sails.config.models.migrate === 'safe') {
            sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "' + sails.config.environment + '" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
            return done();
        } //•

        // Compare bootstrap version from code base to the version that was last run
        var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
            .tolerate('doesNotExist'); // (it's ok if the file doesn't exist yet-- just keep going.)

        if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
            sails.log('Skipping v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (because it\'s already been run)');
            sails.log('(last run on this computer: @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) + ')');
            return done();
        } //•

        sails.log('Running v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (' + (lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v' + lastRunBootstrapInfo.lastRunVersion + ' @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer') + ')');
    } else {
        sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
    }


    for (let identity in sails.models) {
        await sails.models[identity].destroy({});
    } //∞

    // By convention, this is a good place to set up fake data during development.
    await Users.createEach([
        { email: 'Zo@admin.com', name: 'Zo ambinintsoa', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
        { email: 'Test@admin.com', name: 'Test ambinintsoa', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc133') },
    ]);
    await Profiles.createEach([
        { name: 'Administrator', code: 1 }, { name: 'Manager', code: 2 }, { name: 'Employee', code: 3 }, { name: 'Customer', code: 4 },
    ]);
    await Status.createEach([
        { name: 'Received', code: '0' }, { name: 'In Service', code: '1' }, { name: 'Awaiting Interaction', code: '2' }, { name: 'Awaiting Approval ', code: '3' }, { name: 'Pass', code: '4' }, { name: 'Fail', code: '5' }
    ]);
    await States.createEach([
        { name: 'Pending', code: 1 }, { name: 'In Progress', code: 2 }, { name: 'Closed', code: 3 }
    ]);
    // Save new bootstrap version
    await sails.helpers.fs.writeJson.with({
            destination: bootstrapLastRunInfoPath,
            json: {
                lastRunVersion: HARD_CODED_DATA_VERSION,
                lastRunAt: Date.now()
            },
            force: true
        })
        .tolerate((err) => {
            sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `' + sails.config.appPath + '`.  Full error details: ' + err.stack + '\n\n(Proceeding anyway this time...)');
        });

    // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
    // (otherwise your server will never lift, since it's waiting on the bootstrap)
    return done();

};