var md = require("node-markdown").Markdown;
module.exports = {
	index: function(req, res) {
        var owner=req.options.user.id;
        var user_notifiction=[];
        var unread_count=0;
        var allnotifications=null;
		Notification.find({
			owner:owner
		}).populate('owner').populate('to_topic').populate('to_reply').populate('author')
		.then(function(ns) {
                allnotifications=ns;
                return User.findOne().where({
                    id:owner
                }).populate('notifications')

            }).then(function(u){
                _.each(u.notifications, function(n) {
                    if(n.read==false){
                        user_notifiction.push(n);
                    }
                    unread_count=user_notifiction.length;
                });
            res.view({
                md:md,
                notifications: allnotifications,
                notifications_unread_count: unread_count
            });
        }).catch(function(err) {
            res.serverError(err);
        });
	},

    read: function(req, res){
        var id = req.param('id');
        Notification.update({
            owner:req.options.user.id,
            id:id
        },{
            read: true
        })
        .then(function(n){
            res.ok();
        }).catch(function(err){
            res.serverError(err);
        })
    },
    
    destroy: function(req, res){
        var id = req.param('id');
        Notification.destroy({
            owner:req.options.user.id,
            id:id
        })
        .then(function(n){
            res.ok();
        }).catch(function(err){
            res.serverError(err);
        })
    }
};