/**
 * Auth
 *
 * @description :: JSON Web token Service for sails
 * @help        :: See https://github.com/auth0/node-json web token & http://sailsjs.org/#!/documentation/concepts/Services
 */

 const jwt = require('jsonwebtoken');

 module.exports = {
   currentUser: null,
 
   /**
    * generate a new token
    * @param payload
    * @returns {*}
    */
   generateToken: function (payload) {
     var secret ;
     var expirTime ;
     secret = sails.config.constant.token.SECRET;
     expirTime = sails.config.constant.token.expiration; 
     return jwt.sign(payload, secret, {
       expiresIn: expirTime,
     });
   },
 
   /**
    * check token is valid
    * @param token
    * @param callback
    * @returns {Promise}
    */
   verifyToken: function (token, callback) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, sails.config.constant.token.SECRET, {}, (err, tokenData) => {
          if (err) return reject(err); 

          User
              .findOne({ id: tokenData.id })
              .exec((err, user) => {
                  if (err) return reject(err); // Query error
                  if (!user) return reject(API_ERRORS.USER_NOT_FOUND);
                  if (user.locked) return reject(API_ERRORS.USER_LOCKED);

                  const passwordHash = farmhash.hash32(user.encryptedPassword);
                  if (tokenData.pwh !== passwordHash) { // Old token, built with inactive password
                      return reject(API_ERRORS.INACTIVE_TOKEN);
                  }
                  return resolve(user);
              });
      });
  });
   },
 
   /**
    * get decoded date from token
    * @param token
    * @returns {*}
    */
   decodeToken: function (token) {
     return jwt.decode(token);
   },
 
   /**
    * set current user
    * @param user
    */
   setUser: function (user) {
     this.currentUser = user;
   },
 
   /**
    * get logged user
    * @param field
    * @returns {null}
    */
   user: function (field) {
     console.log(this.currentUser);
     return field != null ? this.currentUser[field] : this.currentUser;
   },
 
   /**
    * check if there is logged user
    * @returns {boolean}
    */
   check: function () {
     return !!this.currentUser;
   },
 };
 