/**
 * Profiles.js
 *
 * A user who can log in to this application.
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true,
            maxLength: 15,
            example: 'Funcionário'
        },
        code: {
            type: 'number',
            required: true,
            example: 1 // 1 == Administrator, 2 == Project Manager, 3 == Employee and 4 == Customer 
        }
    },

    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.profiles.save([{name: 'Administrator', code: 1},{name: 'Manager', code: 2},{name: 'Employee', code: 3},{name: 'Customer', code: 4}])
    ================================================================================================================================================================================================================================== */
};