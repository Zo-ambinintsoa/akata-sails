/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var nestedPop = require('nested-pop');
module.exports = {
    'index': (req, res) => {

        const math = require('mathjs');
        const _LIMIT_ = 20;
        let status = [];
        let total = 0;

        Status.find().where({ 'code': { '<': 4 } }).exec((err, result) => {
            if (err) return res.serverError(err);

            result.forEach((item) => {
                status.push(item.id);
            })

            Tasks.find({ executor: req.param('id'), status: { in: status } }).limit(_LIMIT_).sort('id DESC').populate('project').populate('status').exec((err, result) => {
                if (err) return req.serverError(err);

                Tasks.count({ executor: req.param('id'), status: { in: status } }).exec((err, totalRecords) => {
                    total = totalRecords;
                    return res.send({ tasks: result, total: total });
                });

            })
        });

    },
    'admin': (req, res) => {

        const moment = require('moment');
        const math = require('mathjs');
        const _LIMIT_ = 20;
        let status = [];
        let total = 0;
        Projects.find().limit(_LIMIT_).populate('state').populate('owner').exec((err, result) => {
            if (err) {
                return res.serverError(err);
            }

            Projects.count().exec((err, totalRecords) => {
                total = totalRecords;
                return res.send({ projects: result, moment: moment, total: total });
            });

        });

    },
    'developer': (req, res) => {

        const math = require('mathjs');
        const _LIMIT_ = 20;
        let status = [];
        let total = 0;

        Status.find().where({ 'code': { '<': 4 } }).exec((err, result) => {
            if (err) return res.serverError(err);

            result.forEach((item) => {
                status.push(item.id);
            })

            Tasks.find({ executor: req.param('id'), status: { in: status } }).limit(_LIMIT_).sort('id DESC').populate('project').populate('status').exec((err, result) => {
                if (err) return req.serverError(err);

                Tasks.count({ executor: req.param('id'), status: { in: status } }).exec((err, totalRecords) => {
                    total = totalRecords;
                    return res.send({ tasks: result, total: total });
                });

            })
        });

    }

};