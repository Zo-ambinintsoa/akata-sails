/**
 * Comments.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    task: {
        model: 'Tasks',
        required: true
    },
    owner: {
        model: 'Users',
        required: true
    },
    comment: {
        type: 'string',
        required: true
    },
    comment_at: {
        type: 'string',
        required: false,
        example: 'YYY-MM-DD'
    }

  },
  beforeCreate: (values, next) => {
      const moment = require('moment');

      values.comment_at = moment().format('YYYY-MM-DD');

      next();
  },
};
