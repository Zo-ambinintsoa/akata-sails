/**
 * ProjectTeams.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member: {
        model: 'Users',
        required: true
    },
    project: {
        model: 'Projects',
        required: true
    }

  },

};
