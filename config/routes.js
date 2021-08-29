/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    'GET /': 'HomeController/index',

    /* ================================= BEGIN: USERS ====================================== */
    'GET /users': 'UserController/index',
    'GET /users/new': 'UserController/new',
    'GET /users/edit/:id': 'UserController/edit',

    /* ========= POST METHODS =========== */
    'POST /users/create': 'UserController/create',
    'POST /users/update/:id': 'UserController/update',
    'DELETE /users/delete': 'UserController/delete',

    /* ======== AJAX METHODS ========= */
    'GET /users/search': 'UserController/search',
    'GET /users/list': 'UserController/list',
    /* ================================= END: USERS ====================================== */

    /* ================================= BEGIN: PROJECTS ====================================== */
    'GET /project': 'ProjectController/index',
    'POST /project/new': 'ProjectController/new',
    'GET /project/edit/:id': 'ProjectController/edit',
    'GET /project/view/:id': 'ProjectController/view',

    /* ========= POST METHODS =========== */
    'POST /project/create': 'ProjectController/create',
    'PUT /project/update': 'ProjectController/update',
    'DELETE /project/delete': 'ProjectController/delete',

    /* ========= AJAX METHODS =========== */
    'POST /project/state': 'ProjectController/state',
    'GET /project/calc': 'ProjectController/calc',
    'GET /project/members': 'ProjectController/members',
    'GET /project/team': 'ProjectController/team',
    'DELETE /project/member/remove': 'ProjectController/remove',
    /* ================================= END: PROJECTS ====================================== */

    /* ================================= BEGIN: TASKS ====================================== */
    'GET /task/p/:projectId': 'TaskController/index',
    'GET /task': 'TaskController/allTask',
    'POST /task/new/:projectId': 'TaskController/new',
    'GET /task/:id': 'TaskController/view',
    'GET /task/edit/:p/:id': 'TaskController/edit',

    /* ================ POST METHODS ================= */
    'POST /task/create': 'TaskController/create',
    'PUT /task/update': 'TaskController/update',
    'DELETE /task/delete': 'TaskController/delete',
    'PUT /task/status': 'TaskController/status',
    'POST /task/comment': 'TaskController/comment',
    'POST /task/effort': 'TaskController/effort',
    'PUT /task/seteffort': 'TaskController/updateEffort',
    'GET /task/task': 'TaskController/task',
    'GET /task/comment/list': 'TaskController/commentList',
    'GET /task/effort/list': 'TaskController/effortList',
    'GET /task/list': 'TaskController/list',


    /* ================================= END: TASKS ====================================== */

    /* ================================= BEGIN: LOGIN ======================================= */
    'GET /login': 'LoginController/login',
    'POST /login': 'LoginController/login',
    'POST /notify': 'NotificationController/notify',



    /* ================================= BEGIN: TARIFF ====================================== */

    'GET /tariff': 'TariffController/list',
    'GET /tariff/:id': 'TariffController/show',

    /* ========= POST METHODS =========== */
    'POST /tariff/create': 'TariffController/create',
    'PUT /tariff/update/:id': 'TariffController/update',
    'DELETE /tariff/delete/:id': 'TariffController/delete',
    /* ================================= END: TASKS ====================================== */
    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝

};