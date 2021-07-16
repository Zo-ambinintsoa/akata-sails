/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var nestedPop = require('nested-pop');
module.exports = {
    'index': (req, res) => {
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

    'view': (req, res) => {

        const moment = require('moment');

        let states;
        let teams;
        let tasks;

        Status.findOne({ code: 4 }).exec((err, result) => {
            if (err) return res.serverError(err);

            Tasks.find().where({ project: req.param('id'), status: { '!=': result.id } }).populate('status').exec((err, result) => {
                if (err) return res.serverError(err);

                tasks = result;
            })
        })


        Projectteams.find({ project: req.param('id') }).populate('member').exec((err, result) => {
            teams = result;
        });

        States.find().exec((err, result) => {
            if (err) {
                return res.badRequest();
            }

            if (!result) {
                return res.notFound();
            }

            states = result;
        });

        Projects.findOne(req.param('id')).populate('owner').populate('state').exec((err, result) => {
            if (err) {
                return res.serverError(err);
            }

            if (!result) {
                return res.notFound();
            }

            return res.send({ project: result, states: states, teams: teams, tasks: tasks, moment: moment });
        })
    },

    'new': (req, res) => {
        States.findOne({ name: 'Pending' }).exec((err, result) => {
            if (err) return res.serverError(err);

            return res.send({ state: result });
        });
    },

    'create': (req, res) => {

        Projects.create({
            owner: req.param('owner'),
            state: req.param('state'),
            name: req.param('name'),
            description: req.param('description'),
            estimated_start: req.param('estimated_start'),
            estimated_end: req.param('estimated_end'),
            real_start: req.param('real_start'),
            real_end: req.param('real_end'),
            justification: req.param('justification'),
            premisse: req.param('premisse')
        }, (err, user) => {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'project created' });
        });
    },

    'edit': (req, res) => {
        const moment = require('moment');

        var result = Projects;
        Projects.findOne({ id: req.param('id') }).populate('state').populate('owner').exec((err, result) => {
            if (err) {
                return res.serverError(err);
            }

            if (!result) {
                return res.notFound();
            }

            return res.send({ project: result, moment: moment });
        })
    },

    'update': (req, res) => {

        Projects.update({ id: req.param('id') }, {
            owner: req.param('owner'),
            state: req.param('state'),
            name: req.param('name'),
            description: req.param('description'),
            estimated_start: req.param('estimated_start'),
            estimated_end: req.param('estimated_end'),
            real_start: req.param('real_start'),
            real_end: req.param('real_end'),
            justification: req.param('justification'),
            premisse: req.param('premisse'),
            last_informations: req.param('last_informations'),
        }).exec((err) => {
            if (err) { return res.serverError(err); }

            return res.send({ message: 'project Updated' });
        });
    },

    'delete': (req, res) => {
        Projects.destroy({ id: req.param('id') }).exec((err) => {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'project deleted' });
        });
    },

    'state': (req, res) => {

        let id = req.param('id');
        let state = req.param('state');

        Projects.update({ id: id }, { state: state }).exec((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        });
    },

    'calc': (req, res) => {

        let calcul = req.param('data');
        let id = calcul.id;

        Projects.update({ id: id }, {
            progress_percentage: calcul.percentage,
            amount_spent: calcul.amount_spent,
            total_hours: calcul.total_hours
        }).exec((err) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json(true);
        })
    },

    'members': (req, res) => {
        let projectId = req.param('id');

        Projectteams.find({ project: projectId }).exec((err, result) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json(result);
        })
    },

    'team': (req, res) => {

        let project = req.param('id');
        let member = req.param('member');

        Projectteams.create({
            member: member,
            project: project
        }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        });
    },

    'remove': (req, res) => {
        Projectteams.destroy({ member: req.param('member') }).exec((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        });
    },
};