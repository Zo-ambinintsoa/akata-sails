/**
 * notifications.js
 *
 * @description :: A e definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/es-and-orm/es
 */

 module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
      body: { type: "string", required: true },
      date: { type: 'ref', columnType: 'datetime', defaultsTo: new Date()},
      action_type: { type: "string", required: true },
      highlighted: { type: "boolean", defaultsTo: false },
  
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  
      registeredBy: {
        model: 'Users',
        required: true
      },
      owner: {
        model: 'Users',
        required: true
      },
      project: {
        model: 'Projects',
      },
      tasks: {
        model: 'Tasks',
      },
  
    },
  
  };
  
  