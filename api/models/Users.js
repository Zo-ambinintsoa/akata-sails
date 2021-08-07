/**
 * Users.js
 *
 * A user who can log in to this application.
 */
 const bcrypt = require('bcrypt');

 function generatePasswordHash(password) {
     return bcrypt.genSalt(10) // 10 is default
         .then((salt) => {
             return bcrypt.hash(password, salt);
         })
         .then(hash => {
             return Promise.resolve(hash);
         });
 }


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
        return _.omit(this, ['password', 'lastPasswordFailure', 'isSuperAdmin', 'is_active', 'locked', 'resetToken', 'passwordFailures']);
    },

/**
		 * Validates user password with stored password hash
		 * @param password
		 * @returns {Promise}
		 */
		validatePassword: function (password) {
			return bcrypt.compare(password, this.toObject().encryptedPassword);

		},


		/**
		 * Set user password
		 * @param password
		 * @returns {Promise}
		 */
		setPassword: function (password) {
			return generatePasswordHash(password)
				.then(hash => {
					this.encryptedPassword = hash;
				});
		},

	/**
	 * Encrypt password before creating a User
	 * @param values
	 * @param next
	 */
	beforeCreate: function (values, next) {
		generatePasswordHash(values.password)
			.then(hash => {
				delete(values.password);
				values.encryptedPassword = hash;
				next();
			})
			.catch(err => {
				/* istanbul ignore next */
				next(err);
			});
	} ,

    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.users.save([{profile: 'hashid of administrador profile', name: 'Administrator', email: 'email@administrador', password: 'sha256 hashad password', is_active: true} ])
    ================================================================================================================================================================================================================================== */
};