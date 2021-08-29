/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var res = this.res;

  if (data !== undefined) {
    return res.status(200).json( '200 ("OK") response ');
  }
  else return res.status(200).json( '200 ("OK") response ' + data);

};
