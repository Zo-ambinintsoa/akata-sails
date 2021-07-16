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
            type: 'string',
            required: true,
            example: 'YYY-MM-DD'
        },
        estimated_end: {
            type: 'string',
            required: true,
            example: 'YYY-MM-DD'
        },
        real_start: {
            type: 'string',
            required: false,
            example: 'YYY-MM-DD'
        },
        real_end: {
            type: 'string',
            required: false,
            example: 'YYY-MM-DD'
        },
        progress_percentage: {
            type: 'number',
            example: '50', // 50% of progress
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
        }

    },
    beforeCreate: function(values, next) {
        const moment = require('moment');

        if (values.estimated_start.length) {
            let date = values.estimated_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_start = moment(format).format('YYYY-MM-DD');
        }

        if (values.estimated_end.length) {
            let date = values.estimated_end.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_end = moment(format).format('YYYY-MM-DD');
        }

        if (values.real_start.length) {
            let date = values.real_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.real_start = moment(format).format('YYYY-MM-DD');
        }

        if (values.real_end.length) {
            let date = values.real_end.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.real_end = moment(format).format('YYYY-MM-DD');
        }

        next();
    },
    beforeUpdate: function(values, next) {
        const moment = require('moment');

        if (values.estimated_start) {
            let date = values.estimated_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_start = moment(format).format('YYYY-MM-DD');
        }

        if (values.estimated_end) {
            let date = values.estimated_end.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_end = moment(format).format('YYYY-MM-DD');
        }

        if (values.real_start) {
            let date = values.real_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.real_start = moment(format).format('YYYY-MM-DD');
        }

        if (values.real_end) {
            let date = values.real_end.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.real_end = moment(format).format('YYYY-MM-DD');
        }

        next();
    }

};