/**
 * Users.js
 *
 * A user who can log in to this application.
 */

module.exports = {
    attributes: {
        profile: {
            model: 'Profiles'
        },
        notify : {
            collection: 'notify',
            via: 'owner',
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 200,
            example: 'Joseph Leonard'
        },
        isSuperAdmin: {
            type: 'boolean',
            defaultsTo: false
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            isEmail: true,
            example: 'joseph@task.co'
        },
        password: {
            type: 'string',
            required: true,
            maxLength: 64,
            example: 'dffff$$fdxsssff3455',
            protect: true
        },
        is_active: {
            type: 'boolean',
            defaultsTo: false
        },
        locked: {
            type: 'boolean',
            defaultsTo: false
        },

        passwordFailures: {
            type: 'number',
            defaultsTo: 0
        },

        lastPasswordFailure: {
            type: "string",
            columnType: "date"
        },

        resetToken: {
            type: 'string'
        },
    },
    customToJSON: function() {
        return _.omit(this, ['password', 'lastPasswordFailure', 'isSuperAdmin', 'is_active', 'locked', 'resetToken']);
    },

    beforeCreate: function(values, next) {
        let crypto = require('crypto');
        values.password = crypto.createHash('sha256').update(values.password).digest('base64');;

        next();
    },
    beforeUpdate: function(values, next) {
        let crypto = require('crypto');
        values.password = crypto.createHash('sha256').update(values.password).digest('base64');;

        next();
    },

    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.users.save([{profile: 'hashid of administrador profile', name: 'Administrator', email: 'email@administrador', password: 'sha256 hashad password', is_active: true} ])
    ================================================================================================================================================================================================================================== */
};