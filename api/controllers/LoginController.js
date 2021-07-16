/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nestedPop = require('nested-pop');
const API_ERRORS = require('../constants/APIErrors');
const validator = require('validator');
const passValidator = require('password-validator');

const passSchema = new passValidator();
const passMinLen = 6;
const passMaxLen = 24;

// Scheme for password validation
// See ref https://github.com/tarunbatra/password-validator
passSchema
    .is().min(passMinLen)
    .is().max(passMaxLen)
    .has().letters()
    .has().digits();



module.exports = {

    'loginV1': (req, res) => {
        let validations = {};
        let userRecord;

        if (req.param('email')) {

            let inputs = { email, password, rememberMe } = req.allParams();
            Users.findOne({
                email: inputs.email.toLowerCase(),
            }).populate('profile').exec((err, userRecord) => {
                if (!userRecord) {
                    validations = { email: true };

                    return res.send({ validations: validations });
                }

                userRecord.isCustomer = false;
                userRecord.isManager = false;
                userRecord.isUser = false;

                if (inputs.password != userRecord.password) {
                    validations = { password: true };

                    return res.send({ validations: validations });
                }

                switch (userRecord.profile.name) {
                    case 'client':
                        userRecord.isCustomer = true;
                        break;

                    case 'admin':
                        userRecord.isManager = true;
                        break;

                    case 'developper':
                        userRecord.isUser = true;
                        break;
                }
                //TO DO : generate token for each user Type
                return res.send({ message: 'User logged in successfully' });
            });
        } else {
            res.send({ validations: validations });
        }
    },
    /**
     * Action for /user/login
     * @param req
     * @param res
     * @returns {*}
     */
    login: function(req, res) {
        if (!req.body) {
            return res.badRequest(Utils.jsonErr('Empty body'));
        }

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !validator.isEmail(email)) {
            return res.badRequest(Utils.jsonErr('Invalid email'));
        }

        if (!password) {
            return res.badRequest(Utils.jsonErr('Invalid email or password'));
        }

        UserServices.authenticateUserByPassword(email, password)
            .then(token => {
                res.ok({ token });
            })
            .catch(err => {
                switch (err) {
                    case API_ERRORS.INVALID_EMAIL_PASSWORD:
                    case API_ERRORS.USER_NOT_FOUND:
                        return res.badRequest(Utils.jsonErr('Invalid email or password'));
                    case API_ERRORS.USER_LOCKED:
                        return res.forbidden(Utils.jsonErr('Account locked'));
                    default:
                        /* istanbul ignore next */
                        return res.serverError(Utils.jsonErr(err));
                }
            });
    },


    /**
     * Action for /user/forgot
     * @param req
     * @param res
     * @returns {*}
     */
    forgotPassword: function(req, res) {
        if (!req.body) {
            return res.badRequest(Utils.jsonErr('Empty body'));
        }

        const email = req.body.email;

        if (!email || !validator.isEmail(email)) {
            return res.badRequest(Utils.jsonErr('Invalid email'));
        }

        UserServices
            .generateResetToken(email)
            .then(function() {
                res.ok({ message: 'Check your email' });
            })
            .catch(err => {
                if (err === API_ERRORS.USER_NOT_FOUND) {
                    return res.notFound(Utils.jsonErr('User not found'));
                }
                /* istanbul ignore next */
                return res.serverError(Utils.jsonErr(err));
            });
    },


    /**
     * Action for /user/change_password
     * @param req
     * @param res
     * @returns {*}
     */
    changePassword: function(req, res) {
        if (!req.body) {
            return res.badRequest(Utils.jsonErr('Empty body'));
        }

        const email = req.body.email;
        const currentPassword = req.body.password;
        const newPassword = req.body.new_password;
        const newPasswordConfirm = req.body.new_password_confirm;


        if (!email || !validator.isEmail(email)) {
            return res.badRequest(Utils.jsonErr('Invalid email'));
        }

        if (!currentPassword) {
            return res.badRequest(Utils.jsonErr('Current password is required'));
        }

        if (!newPassword || newPassword !== newPasswordConfirm) {
            return res.badRequest(Utils.jsonErr('Password does not match'));
        }

        if (!passSchema.validate(newPassword)) {
            return res.badRequest(Utils.jsonErr('Password must be 6-24 characters, including letters and digits'));
        }

        UserServices
            .changePassword(email, currentPassword, newPassword)
            .then(function(token) {
                return res.ok({ token });
            })
            .catch(err => {
                switch (err) {
                    case API_ERRORS.USER_NOT_FOUND:
                        return res.badRequest(Utils.jsonErr('Email not found'));

                        // Processed by 'Invalid token' from policy
                        // case API_ERRORS.USER_LOCKED:
                        // 	return res.forbidden(Utils.jsonErr('Account locked'));

                    case API_ERRORS.INVALID_PASSWORD:
                        return res.badRequest(Utils.jsonErr('Invalid password'));
                    default:
                        /* istanbul ignore next */
                        return res.serverError(Utils.jsonErr(err));
                }
            });
    },


    /**
     * Action for /user/reset_password
     * @param req
     * @param res
     * @returns {*}
     */
    resetPasswordByResetToken: function(req, res) {
        if (!req.body) {
            return res.badRequest(Utils.jsonErr('Empty body'));
        }

        const email = req.body.email;
        const resetToken = req.body.reset_token;
        const newPassword = req.body.new_password;
        const newPasswordConfirm = req.body.new_password_confirm;

        if (!email || !validator.isEmail(email)) {
            return res.badRequest(Utils.jsonErr('Invalid email'));
        }

        if (!resetToken) {
            return res.badRequest(Utils.jsonErr('Reset token is required'));
        }

        if (!newPassword || newPassword !== newPasswordConfirm) {
            return res.badRequest(Utils.jsonErr('Password does not match'));
        }

        if (!passSchema.validate(newPassword)) {
            return res.badRequest(Utils.jsonErr('Password must be 6-24 characters, including letters and digits'));
        }

        UserServices
            .resetPasswordByResetToken(email, resetToken, newPassword)
            .then(() => {
                res.ok({ message: 'Done' });
            })
            .catch(err => {
                if (err === API_ERRORS.USER_NOT_FOUND) {
                    // We show invalid email instead of User Not Found
                    return res.badRequest(Utils.jsonErr('Invalid email'));
                }
                /* istanbul ignore next */
                return res.serverError(Utils.jsonErr(err));
            });
    },
};