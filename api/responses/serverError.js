/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError (data, options) {

  // Get access to `req`, `res`, & `sails`
  var res = this.res;

  // Set status code
  res.status(500);

  // Log error to console
  if (data !== undefined) {
    return res.status(500).json('500 ("Server Error") response');
  }
  else  return res.status(500).json('500 ("Server Error") response' + data);


};

