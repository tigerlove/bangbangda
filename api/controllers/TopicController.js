var md = require("node-markdown").Markdown;

module.exports = {

    new: function(req, res) {
        var id=req.options.user.id;
        var user_notifiction=[];
        var unread_count=0;
        User.findOne().where({
            id:id
        }).populate('notifications').then(function(u){
            _.each(u.notifications, function(n) {
                if(n.read==false){
                    user_notifiction.push(n);
                }
             unread_count=user_notifiction.length;
            });
            return res.view({
                notifications_unread_count: unread_count
            });
        });
    },

    create: function(req, res) {
        var title = req.param('title');
        var content = req.param('topic_data');
        //var tags = []
        //var tags = req.param('tags_content');
        //if (tags) {
        //    tags = tags.split(',');
        //} else {
        //    tags = [];
        //}
        var tag = req.param('tag');
        Topic.create({
            title: title,
            content: content,
            owner: req.options.user.id,
            tags: tag
        }).then(function(topic) {
            res.redirect('topics/' + topic.id);
        }).catch(function(err) {
            res.serverError('');
        });
    },

    show: function(req, res) {
        var id = req.param('id');
        var topic = null;
        var replies_owner = [];
        var replies_owner_map = {};
        var user_notifiction=[];
        var unread_count=0;
        Topic.findOne().where({
            id: id
        }).populate('replies').populate('owner').then(function(t) {
            topic = t;
            _.each(t.replies, function(r) {
                
                replies_owner.push(r.owner);
            });

            replies_owner = _.uniq(replies_owner);
            return User.find().where({
                id: replies_owner
            });

        }).then(function(replies_owner) {

            _.each(replies_owner, function(ro) {
                replies_owner_map[ro.id] = {'name':ro.username,'displayname':ro.displayname,'floors':ro.floors};
            });
            

        }).then(function(){
            if(req.options.user){
                return User.findOne().where({
                    id:req.options.user.id
                }).populate('notifications')
            }else{
                return null;
            }

        }).then(function(u){
            if(u) {
                _.each(u.notifications, function (n) {
                    if (n.read == false) {
                        user_notifiction.push(n);
                    }
                    unread_count = user_notifiction.length;
                });
            }
            return res.view({
                topic: topic,
                md: md,
                replies_owner_map: replies_owner_map,
                notifications_unread_count: unread_count
            });
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    update: function(req, res) {
        var id = req.param('topic_id');
        var title = req.param('title');
        var content = req.param('topic_data');
        //var tags = req.param('tags_content');
        //if (tags) {
        //    tags = tags.split(',');
        //} else {
        //    tags = [];
        //}
        var tag = req.param('tag');
        Topic.findOne().where({
            id: id
        }).then(function(topic) {
            if (topic.owner == req.session.user_id) {
                return Topic.update({
                    id: id
                }, {
                    title: title,
                    content: content,
                    owner: req.options.user.id,
                    tags: tag
                })
            }
        }).then(function(topic) {
            res.redirect('topics/' + topic[0].id);
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    edit: function(req, res) {
        var id = req.param('id');
        var owner=req.options.user.id;
        var user_notifiction=[];
        var unread_count=0;
        var topic=null;
        Topic.findOne().where({
            id: id
        }).then(function(t) {
            topic  = t;
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
                topic: topic,
                notifications_unread_count:unread_count
            })
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    like: function(req, res) {
        var id = req.param('id');

        Topic.findOne().where({
            id: id
        }).then(function(topic) {
            if (!_.contains(topic.upvote_ids, req.options.user.id)) {
                topic.upvote_ids.push(req.options.user.id);
                return Topic.update({
                    id: id
                }, {
                    upvote_ids: topic.upvote_ids
                })
            }else{
                return [topic];
            }
        }).then(function(topic) {
            res.ok(topic[0]);
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    unlike: function(req, res) {
        var id = req.param('id');

        Topic.findOne().where({
            id: id
        }).then(function(topic) {
            if (_.contains(topic.upvote_ids, req.options.user.id)) {
                topic.upvote_ids = _.reject(topic.upvote_ids,function(n){
                    return n == req.options.user.id;
                });
                return Topic.update({
                    id: id
                }, {
                    upvote_ids: topic.upvote_ids
                })
            }else{
                return [topic]
            }
        }).then(function(topic) {
            res.ok(topic[0]);
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    find_topic: function(req, res) {
        return res.json({
            todo: 'find_topic() is not implemented yet!'
        });
    },

    find_user_topic: function(req, res) {
        return res.json({
            todo: 'find_user_topic() is not implemented yet!'
        });
    },
    destroy: function(req, res){
        var id = req.param('id');
        Topic.destroy({
            owner:req.options.user.id,
            id:id
        }).then(function(n){
            res.ok();
        }).catch(function(err){
            res.serverError(err);
        })
    }
};