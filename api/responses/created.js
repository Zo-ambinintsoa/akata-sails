/**
 * 201 (CREATED) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 * return res.created(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function created (data, options) {

  // Get access to `req`, `res`, & `sails`
  var res = this.res;

  sails.log.silly('Sending 201 ("CREATED") response');

  return res.status(201).json('201 ("CREATED") response');

};
