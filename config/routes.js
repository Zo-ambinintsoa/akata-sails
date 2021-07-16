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
    'GET /user': 'UserController/index',
    'GET /user/new': 'UserController/new',
    'GET /user/edit/:id': 'UserController/edit',

    /* ========= POST METHODS =========== */
    'POST /user/create': 'UserController/create',
    'POST /user/update': 'UserController/update',
    'POST /user/delete': 'UserController/delete',

    /* ======== AJAX METHODS ========= */
    'GET /user/search': 'UserController/search',
    'GET /user/list': 'UserController/list',
    /* ================================= END: USERS ====================================== */

    /* ================================= BEGIN: PROJECTS ====================================== */
    'GET /project': 'ProjectController/index',
    'GET /project/new': 'ProjectController/new',
    'GET /project/edit/:id': 'ProjectController/edit',
    'GET /project/view/:id': 'ProjectController/view',
    'GET /project/:id': 'ProjectController/view',

    /* ========= POST METHODS =========== */
    'POST /project/create': 'ProjectController/create',
    'POST /project/update': 'ProjectController/update',
    'POST /project/delete': 'ProjectController/delete',

    /* ========= AJAX METHODS =========== */
    'POST /project/state': 'ProjectController/state',
    'GET /project/calc': 'ProjectController/calc',
    'GET /project/members': 'ProjectController/members',
    'GET /project/team': 'ProjectController/team',
    'GET /project/member/remove': 'ProjectController/remove',
    /* ================================= END: PROJECTS ====================================== */

    /* ================================= BEGIN: TASKS ====================================== */
    'GET /task/p/:projectId': 'TaskController/index',
    'GET /task/new/:projectId': 'TaskController/new',
    'GET /task/:id': 'TaskController/view',
    'GET /task/edit/:p/:id': 'TaskController/edit',

    /* ================ POST METHODS ================= */
    'POST /task/create': 'TaskController/create',
    'POST /task/update': 'TaskController/update',
    'POST /task/delete': 'TaskController/delete',
    'POST /task/status': 'TaskController/status',
    'POST /task/comment': 'TaskController/comment',
    'POST /task/effort': 'TaskController/effort',
    'GET /task/seteffort': 'TaskController/updateEffort',
    'GET /task/task': 'TaskController/task',
    'GET /task/comment/list': 'TaskController/commentList',
    'GET /task/effort/list': 'TaskController/effortList',
    'GET /task/list': 'TaskController/list',


    /* ================================= END: TASKS ====================================== */

    /* ================================= BEGIN: LOGIN ======================================= */
    'GET /login': 'LoginController/login',
    'POST /login': 'LoginController/login',



    /* ================================= BEGIN: TARIFF ====================================== */

    'GET /tariff': 'TariffController/list',
    'GET /tariff/:id': 'TariffController/show',

    /* ========= POST METHODS =========== */
    'POST /tariff/create': 'TariffController/create',
    'PUT /tariff/update/:id': 'TariffController/update',
    'POST /tariff/delete/:id': 'TariffController/delete',
    /* ================================= END: TASKS ====================================== */
    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝

};