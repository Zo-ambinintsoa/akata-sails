/**
 * Tariff
 *
 * @description :: Server-side logic for managing Tariff
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: async function(req, res, next) {
        const {
            pays,
            taux,
            TVA,
        } = req.body;

        console.log('creating tariff');

        const playload = {
            pays: pays,
            taux: taux,
            TVA: TVA,
        };
        await Tariff.create(
                playload
            )
            .exec(function Founded(err, value) {
                if (err) {
                    return res.send(err);
                }
                console.log(err);
                return res.status(200).json({
                    data: value
                });
            });
    },

    show: function(req, res) {
        Tariff.findOne(req.param('id')).populate('project').populate('member').exec(
            function(tariff, err) {
                console.log('all clear');
                if (err) return res.send(err);
                console.log('listing all tariff');
                return res.send(tariff);
            });
    },
    update: function(req, res) {

        const {
            pays,
            taux,
            TVA,
            project
        } = req.body;

        console.log('creating tariff');

        const playload = {
            pays: pays,
            taux: taux,
            TVA: TVA,
            project: project,
        };
        Tariff.update(req.param('id'), playload).exec(
            function(tariff, err) {
                console.log('all clear');
                if (err) return res.send(err);
                console.log('listing all tariff');
                return res.send(tariff);
            });
    },

    delete: function(req, res) {
        Tariff.destroy(req.param('id')).exec(
            function(tariff, err) {
                console.log('all clear');
                if (err) return res.send(err);
                console.log('listing all tariff');
                return res.send(tariff);
            });
    },
    list: function(req, res) {
        Tariff.find().exec(
            function(tariff, err) {
                console.log('all clear');
                if (err) return res.send(err);
                console.log('listing all tariff');
                return res.send(tariff);
            })
    },

};