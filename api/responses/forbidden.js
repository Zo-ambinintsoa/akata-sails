/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data, options) {

  // Get access to `req`, `res`, & `sails`
  var res = this.res;

  // Set status code
  res.status(403);
  if (data !== undefined) {
    return res.status(403).json('403 ("Forbidden") response');
  }
  else return res.status(403).json('403 ("Forbidden") response' + data);

};

