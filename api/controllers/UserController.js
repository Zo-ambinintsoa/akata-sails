/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var nestedPop = require('nested-pop');

module.exports = {
    'index': function(req, res) {
        Users.find().populate('profile').exec(function(err, users) {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ users: users });
        });
    },

    'new': function(req, res) {

        Profiles.find().exec(function(err, profiles) {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ profiles: profiles });
        });

    },

    'create': function(req, res) {

        Users.create({
            profile: req.param('profile'),
            lastName: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
        }, function userCreated(err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'user created' });
        });
    },

    'edit': function(req, res) {
        Profiles.find().exec(function(err, result) {
            if (err) {
                return res.serverError(err);
            }

            if (!result) {
                return res.notFound();
            }

            profiles = result;
        });

        Users.findOne(req.param('id')).populate('profile').exec(function(err, user) {
            if (err) {
                return res.serverError(err);
            }

            if (!user) {
                return res.notFound();
            }

            user = user;

            return res.send({ profile : profiles , user : user });
        });

        return;
    },

    'update': function(req, res) {

        return console.log( req.param('id') + ' name : ' + req.param('name') + ' email :' +req.param('email'));
        // Users.update({ id: req.param('id') }, {
        //     name: req.param('name'),
        //     email: req.param('email'),
        //     profile: req.param('profile'),
        //     password: req.param('password')
        // }).exec(function(err) {
        //     if (err) { return res.serverError(err); }

        //     return res.ok({ message: 'user updated' });
        // });
    },

    'delete': function(req, res) {

        Users.destroy({ id: req.param('id') }).exec(function(err) {
            if (err) {
                return res.serverError(err);
            }

            return res.send({ message: 'user deleted' });
        });
    },

    'search': (req, res) => {
        Users.count().then((err, founder) => {
            if (err) { return res.serverError(err); }
            if (!founder) { return res.notFound(err); }
            console.log('we are here ')
            Users.find({
                where: { name: req.param('term') },
                select: ['name', 'email']
            }).exec((result , err) => {
                if (err) return res.status(500).send({ error: err });

                return res.status(200).send(result);
            })
        })
    },

    'list': (req, res) => {

        let listUser = req.param('listUser');

        Users.find().where({ 'id': { 'nin': listUser } }).exec((err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            return res.status(200).json(result);
        });
    }

}