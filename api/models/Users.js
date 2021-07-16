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

    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return cb(err);
                user.password = hash;
                return cb();
            });
        });
    },

    comparePassword: function(password, encryptedPassword, callback) {
        bcrypt.compare(password, encryptedPassword, function(error, match) {
            if (error) callback(error);
            if (match) {
                callback(null, true);
            } else {
                callback(error);
            }
        });
    },

    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.users.save([{profile: 'hashid of administrador profile', name: 'Administrator', email: 'email@administrador', password: 'sha256 hashad password', is_active: true} ])
    ================================================================================================================================================================================================================================== */
};