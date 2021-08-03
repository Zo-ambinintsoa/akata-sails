/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var nestedPop = require('nested-pop');
module.exports = {
    'index': (req, res) => {
        const moment = require('moment');
        const math = require('mathjs');
        const _LIMIT_ = 2;
        let total = 0;
        let projectId = req.param('projectId');

        Tasks.find({ project: projectId }).limit(_LIMIT_).populate('project').populate('status').populate('executor').populate('owner').exec((err, result) => {
            if (err) {
                return res.serverError(err);
            }

            Tasks.count({ project: projectId }).exec((err, totalRecords) => {
                total = totalRecords;


                return res.send({ tasks: result, projectId: projectId, total: total, moment: moment });
            });

        });
    },

    'view': (req, res) => {

        const moment = require('moment');

        let status;
        let teams;
        let mapStatus = [];

        Status.find().exec((err, result) => {
            if (err) return res.serverError(err);

            status = result;
            status.forEach((item) => {
                if (item.code == 1) {
                    result.forEach((row) => {
                        if (row.code == 3)
                            mapStatus[1] = [row.id];
                    })
                }

                if (item.code == 2) {
                    result.forEach((row) => {
                        if (row.code == 1)
                            mapStatus[2] = [row.id];
                    })
                }

                if (item.code == 3) {
                    result.forEach((row) => {
                        if (row.code == 4)
                            mapStatus[3] = [row.id];
                        if (row.code == 5)
                            mapStatus[3].push(row.id);
                    })
                }
            })
        })

        Tasks.findOne({ id: req.param('id') }).populate('project').populate('status').populate('owner').populate('executor').exec((err, result) => {
            if (err) return res.serverError(err);

            return res.send({ task: result, status: status, mapStatus: mapStatus, moment: moment });
        })


    },

    'new': (req, res) => {
        let projectId = req.param('projectId');

        Status.findOne({ code: '0' }).exec((err, result) => {
            if (err) return res.serverError(err);

            return res.send({ status: result, projectId: projectId, });
        });
    },

    'create': (req, res) => {
        let projectId = req.param('project');

        Tasks.create({
            owner: req.param('owner'),
            status: req.param('status'),
            project: projectId,
            title: req.param('title'),
            body: req.param('body'),
            estimated_start: req.param('estimated_start')
        }, (err, user) => {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'task created' });
        });
    },

    'edit': (req, res) => {
        const moment = require('moment');
        let users;
        let status;

        Projectteams.find({ project: req.param('p') }).populate('member').exec((err, result) => {
            if (err) return res.serverError(err);

            if (!result) {
                return res.notFound();
            }

            let team = [];
            result.forEach((item) => {
                team.push(item.member);
            })

            users = team;
        });

        Status.find().exec((err, result) => {
            if (err) return res.serverError(err);

            if (!result) {
                sails.log.info('status not found');
                return res.notFound();
            }

            status = result;
        })

        Tasks.findOne({ id: req.param('id') }).populate('project').populate('owner').populate('executor').populate('status').exec((err, result) => {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            return res.send({ task: result, moment: moment, users: users, status: status });
        })
    },

    'update': (req, res) => {


        Tasks.update({ id: req.param('id') }, {
            title: req.param('title'),
            body: req.param('body'),
            estimated_start: req.param('estimated_start'),
            estimated_effort: req.param('estimated_effort'),
            real_effort: req.param('real_effort'),
            executor: req.param('executor'),
            last_informations: req.param('last_informations'),
            status: req.param('status')
        }).exec((err) => {
            if (err) { return res.serverError(err); }

            return res.send({ message: 'project updated' });
        });
    },

    'delete': (req, res) => {
        let project = req.param('p');
        Tasks.destroy({ id: req.param('id') }).exec((err) => {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'Task deleted' });
        });
    },

    'status': (req, res) => {

        let id = req.param('id');
        let status = req.param('status');

        Tasks.update({ id: id }, { status: status }).exec((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        });
    },

    'comment': (req, res) => {

        let task = req.param('task');
        let comment = req.param('comment');
        let owner = req.param('id');

        Comments.create({
            task: task,
            owner: owner,
            comment: comment
        }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        })
    },

    'effort': (req, res) => {

        let task = req.param('task');
        let effort = req.param('effort');
        let owner = req.param('id');

        Efforts.create({
            task: task,
            owner: owner,
            effort: effort
        }, (err, rs) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.ok();
        })
    },

    'updateEffort': (req, res) => {

        let id = req.param('id');
        let effort = req.param('effort');
        let estimatedEffort = req.param('estimated_effort');

        Tasks.update({ id: id }, { real_effort: effort, estimated_effort: estimatedEffort }).exec((err) => {
            if (err) { return res.status(500).json({ error: err }); }

            return res.status(200).json({ status: 'ok' });;
        });
    },

    'task': (req, res) => {
        let id = req.param('id');

        Tasks.findOne({ id: id }).exec((err, result) => {
            if (err) { return res.status(500).json({ error: err }); }

            return res.status(200).json({ task: task });
        })
    },

    'commentList': (req, res) => {
        let id = req.param('id');
        Comments.find({ task: id }).sort('id DESC').populate('owner').exec((err, result) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json({ comments: result });
        })
    },

    'effortList': (req, res) => {

        let id = req.param('id');
        Efforts.find({ task: id }).sort('id DESC').populate('owner').exec((err, result) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json({ efforts: result });
        })
    },

    'list': (req, res) => {

        let id = req.param('id');

        Tasks.find({ select: ['estimated_effort', 'real_effort', 'project'], where: { project: id } }).exec((err, result) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json({ tasks: result });
        })

    },

    
    'allTask':  (req, res) => {

        const moment = require('moment');
        const math = require('mathjs');
        const _LIMIT_ = 3;
        let total = 0;

         Tasks.find().limit(_LIMIT_).populate('project').populate('status').populate('executor').populate('owner').exec((err, result) => {
            if (err) {
                return res.serverError(err);
            }

            Tasks.count().exec((err, totalRecords) => {
                total = totalRecords;
                return res.send({ tasks: result, total: total, moment: moment });
            });

        });

    },


};