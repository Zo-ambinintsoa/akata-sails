/**
 * Projects.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        owner: {
            model: 'Users',
            required: true
        },
        task: {
            collection: 'tasks',
            via: 'project'
        },
        state: {
            model: 'States'
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 100,
            example: 'Projeto site da empresa'
        },
        description: {
            type: 'string',
            required: false
        },
        estimated_start: {
            type: 'ref', columnType: 'datetime',
            required: true,
            example: 'YYY-MM-DD'
        },
        estimated_end: {
            type: 'ref', columnType: 'datetime',
            required: true,
            example: 'YYY-MM-DD'
        },
        real_start: {
            type: 'ref', columnType: 'datetime',
            required: false,
            example: 'YYY-MM-DD'
        },
        real_end: {
            type: 'ref', columnType: 'datetime',
            required: false,
            example: 'YYY-MM-DD'
        },
        progress_percentage: {
            type: 'number',
            example: '50',
            defaultsTo: 0
        },
        justification: {
            type: 'string',
            required: false
        },
        premisse: {
            type: 'string',
            required: false
        },
        restrictions: {
            type: 'string',
            required: false
        },
        last_informations: {
            type: 'string',
            required: false
        },
        total_hours: {
            type: 'number',
            required: false,
            example: 100, // total hours of the project, will be calculated based on the hours entered in the tasks when the calculation of hours is requested. 
            defaultsTo: 0
        },
        amount_spent: {
            type: 'number',
            required: false,
            defaultsTo: 0,
            example: 55 // hours consumed in the project, will be calculated based on the tasks performed 
        },

    },
    beforeCreate: function(values, next) {
        const moment = require('moment');
        if (values.estimated_start) {
            values.estimated_start = moment().format('YYYY-MM-DD');
        }        
        if (values.estimated_end) {
            values.estimated_end = moment().format('YYYY-MM-DD');
        }
        if (values.real_start) {
            values.real_start = moment().format('YYYY-MM-DD');
        }
        if (values.real_end) {
            values.real_end = moment().format('YYYY-MM-DD');
        }

        next();
    },
    beforeUpdate: function(values, next) {
        const moment = require('moment');
        if (values.estimated_start) {
            values.estimated_start = moment().format('YYYY-MM-DD');
        }        
        if (values.estimated_end) {
            values.estimated_end = moment().format('YYYY-MM-DD');
        }
        if (values.real_start) {
            values.real_start = moment().format('YYYY-MM-DD');
        }
        if (values.real_end) {
            values.real_end = moment().format('YYYY-MM-DD');
        }

        next();
    }

};