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
    is_aproved: {
        type: 'boolean',
        defaultsTo: false,
    },
    comment_at: {
        type: 'ref', columnType: 'datetime',
        required: false,
        example: 'YYY-MM-DD',
        defaultsTo: new Date(),

    },    
    parent: {
        model: 'Comments',
    },
    children: {
        collection: 'Comments',
        via: 'parent'
    },


  },

};
