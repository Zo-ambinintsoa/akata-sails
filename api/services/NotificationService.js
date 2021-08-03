/**
 * Implementation for Notification Service
 *
 * TODO Tests for production. Stub functions?
 */


 var nestedPop = require('nested-pop');

 
 module.exports = {

     /**
     * Get User notification
     * @param values
     * @returns {Promise}
     */
     getNotification(values, done) {
         let notification ;
         if(!values.user_id){
            return done();
         }else {
            Notify.find()
            .where({ owner: values.user_id }).populate('registeredBy')
            .exec((err, result) => {
                if (err) return res.serverError(err);
                notification = result;
            });
         }
     },
          /**
     * Generate notification
     * @param values
     * @returns {Promise}
     */
     async notificationGenerator(values, res) {
        let notification ;
        let action_type , body  , bodyAdmin, projects;
        var playload = {};
        var playloadManager = {};
        if(!values.registeredBy && !values.action_type && !values.owner){
           return res();
        } 
        sails.log('Found "%s"', values.registeredBy );
        sails.log('Found "%s"', values.owner);

           var owner = await Users.findOne({ id: values.owner })  
           .catch(function(err){
            sails.log(err);
          });
           var user = await Users.findOne({ id: values.registeredBy })
           .catch(function(err){
            sails.log(err);
          });
            if(values.project){
            var project = await Projects.findOne({ id: values.project }).populate('state').populate('owner')
            .catch(function(err){
                sails.log(err);
              });

            }if( values.task){
            var tasks = await Tasks.findOne({ id: values.task }).populate('status').populate('project').populate('owner')
            .catch(function(err){
                sails.log(err);
              });
            tasksproject = task.project.title;
        }
            playload.registeredBy = user.id;

            playloadManager.
                registeredBy =  user.id;
        

            switch (values.action_type) {
                case 'UPDATE_PROJECT_STATUS':
                action_type = 'UPDATE_PROJECT_STATES';
                body = user.name + ' updated the status of the project "' + project.name + '" to "' + project.state.name + '"';
                projects = project.id;
                task = null;
                break;
                case 'ADD_MEMBER_TO_TEAM':
                action_type = 'ADD_MEMBER_TO_TEAM';
                body = user.name + ' added you to the project "' + project.name + '"';
                bodyAdmin = user.name + ' added ' + owner.name + ' to the project "' + project.name + '"';
                projects = project.id;
                break;
                case 'REMOVE_MEMBER_FROM_TEAM':
                action_type = 'REMOVE_MEMBER_FROM_TEAM';
                body = user.name + ' removed you from the project "' + project.name +'"';
                bodyAdmin = user.name + ' removed '+ owner.name +' from the project "' + project.name +'"';
                projects = project.id;
                break;
                case 'ADD_TASK_TO_PROJECT':
                action_type = 'ADD_TASK_TO_PROJECT';
                body = user.name + ' added a tasks to the project "' + project.name + '"';
                bodyAdmin = user.name + ' added ' + owner.name + ' to the project "' + project.name + '"';
                projects = project.id;
                break;                
                case 'UPDATE_TASK_STATUS':
                action_type = 'UPDATE_TASK_STATUS';
                body = user.name + ' updated the status of the task "' + tasks.title ;
                task = tasks.id;
                break;
                case 'ADD_COMMENT':
                action_type = 'ADD_COMMENT';
                body = user.name + ' added a coment to the task"' + tasks.title ;
                task = tasks.id;
                break;
                case 'APPROVE_COMMENT':
                action_type = 'APPROVED_COMMENT';
                body = user.name + ' approved your comment "';
                task = tasks.id;
                break;
                default:
                    break;
            }
            playload.project = projects;
            playload.body = body;
            playload.action_type = action_type;
                adminResult = this.generateManagerNotification(playload , res);
            return adminResult ;
            await Notify.createEach([
                playload,
            ]).exec((err, result) => {
                    if (err) return res.send(err);
                    notification = result;
                     return notification;
                });
        
     },
    /**
     * Marque all notification as read
     * @param values
     * @returns {Promise}
     */
     markAsRead(res, req) {
         
     },
    /**
     * Generate notification for admin
     * @param values
     * @returns {Promise}
     */
     async generateAdminNotification(values , res) {
        var adminNotif = [] ;
        let registeredBy , body , action_type , project , task;
        var admin = await Users.find({isSuperAdmin : true})
        .catch(function(err){
            sails.log(err);
          });   
        registeredBy =  values.registeredBy;
        body = values.body;           
        action_type = values.action_type ; 
        project = values.project;
        task = values.task;
        if ( !values.task ) task = null;
        if ( !values.project ) project = null;
        for (   i = 0 ; i < admin.length ;i ++  )
        {
            owner = admin[i].id
            adminNotif[i] = {
                registeredBy,
                body,
                action_type,
                task,
                project,
                owner,
            }
                }
            await Notify.createEach(
                adminNotif
            ).exec((err, result) => {
                    if (err) return sails.log(err);
                    return result;
                });
     },

    /**
     * Generate notification for admin
     * @param values
     * @returns {Promise}
     */
     async generateManagerNotification(values , res) {
        let project , task ;
        var playload = {};
  
          playload.registeredBy = values.registeredBy;
          playload.body = values.body;
          playload.action_type = values.action_type;
          

        if ( !values.task ) task = null;
        else {
            var taskProject = await Tasks.find({id : values.task}).populate('project')
            var Manager = await Users.find({id : taskProject.project.owner})
            task = values.task;
            playload.task = task
            playload.owner = Manager.id;
            playload.project = taskProject.project.id; 
        }
        if ( !values.project ) project = null;
        else {
            var Manager = await Projects.find({id : values.project}).populate('owner')
            .catch(function(err){
                sails.log(err);
              }); 
              playload.owner = Manager.owner.id;
              playload.project = values.project;              
        }

            await Notify.create(
                playload
            ).exec((err, result) => {
                    if (err) return sails.log(err);
                    return result;
                });
     },

    /**
     * Marque all notification as Unread
     * @param values
     * @returns {Promise}
     */
     markAsUnread(values, req) {
         
     },
    /**
     * delete notification as Unread
     * @param values
     * @returns {Promise}
     */
     delete(res, req) {
         
     },
 
 };
 