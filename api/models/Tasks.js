/**
 * Tasks.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        project: {
            model: 'Projects',
            required: true
        },
        owner: {
            model: 'Users',
            required: true
        },
        executor: {
            model: 'Users',
            required: false
        },
        title: {
            type: 'string',
            required: true,
            maxLength: 150,
            example: 'Make search engine'
        },
        body: {
            type: 'string',
            required: false
        },
        estimated_start: {
            type: 'string',
            required: false,
            example: 'YYY-MM-DD'
        },
        estimated_effort: {
            type: 'number',
            required: false,
            defaultsTo: 0,
            example: '5' // (5) in hors not decimal
        },
        real_effort: {
            type: 'number',
            required: false,
            defaultsTo: 0,
            example: '10' // (10) in hors not decimal
        },
        progress_percentage: {
            type: 'number',
            defaultsTo: 0,
            example: '50' // 50% of progress - (Calculated when the real effort is seted)
        },
        last_informations: {
            type: 'string',
            required: false
        },
        status: {
            model: 'Status',
            required: true,
            example: '0 == Received, 1 == In Service, 2 == Awaiting Interaction, 3 == Awaiting Approval, 4 == Approved, 5 == Disapproved '
        }
    },
    beforeCreate: function(values, next) {
        const moment = require('moment');

        if (values.estimated_start) {
            let date = values.estimated_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_start = moment(format).format('YYYY-MM-DD');
        }

        next();
    },
    beforeUpdate: function(values, next) {
        const moment = require('moment');
        const math = require('mathjs');

        if (values.estimated_start) {
            let date = values.estimated_start.split('/');
            let format = date[2] + '-' + date[1] + '-' + date[0];
            values.estimated_start = moment(format).format('YYYY-MM-DD');
        }

        if (values.real_effort) {
            // calculate the percentage between real effort and estimated effort
            values.progress_percentage = math.round(100 + ((values.real_effort - values.estimated_effort) / values.estimated_effort * 100));
        }

        next();
    }

};