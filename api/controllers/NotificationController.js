var nestedPop = require('nested-pop');
module.exports = {

    'delete': (req, res) => {
        
    },
    'notify': (req, res) => {
        const { action_type , 
        project,
        owner,
        task,
        registeredBy
    } = req.body;

    playload = {
        action_type : action_type,
        project : project,
        owner : owner,
        registeredBy : registeredBy
    }
    
    Manager = Tasks.find({id : task}).populate('project')
    .then(  function(tasks) {
        return nestedPop(tasks, {
            Projects: {
                as: 'project',
                populate: [
                    'state'
                ]
            } 
        }).then(function(Ntask) {
            return res.send(Ntask);
        }).catch(function(err) {
            throw err;
        });
        
    }).catch(function(err) {
        throw err;
    });

    // var done = NotificationService.notificationGenerator(playload , done);

      return Manager;
            }
}