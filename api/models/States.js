/**
 * States.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },
        code: {
            type: 'number',
            required: true,
            example: 1 // 1 == Pending (It has just been opened), 2 == In Progress (This project is being worked on) and 3 == Closed (Project completed) 
        }

    },
    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.states.save([{name: 'Pending', code: 1},{name: 'In Progress', code: 2},{name: 'Closed', code: 3} ])
    ================================================================================================================================================================================================================================== */
};