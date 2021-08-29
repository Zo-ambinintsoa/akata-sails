/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, options) {

  var res = this.res;

  res.status(400);
    // Log error to console
    if (data !== undefined) {
      return res.status(400).json( '400 ("Bad Request") response ');
    }
    else return res.status(400).json( '400 ("Bad Request") response ' + data);
  
};

