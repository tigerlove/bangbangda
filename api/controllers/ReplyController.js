var Promise = require("bluebird");
module.exports = {

    create: function(req, res) {
        var topic_id = req.query.topic_id;
        var content = req.param('reply_data');
        var topic = null;
        var reply = null;


        var metioned_names = content.match(/@[\w\u4e00-\u9fa5]+/mg);
        if (metioned_names) {
            _.each(metioned_names, function(n, i) {
                metioned_names[i] = n.split('@')[1];
            })
            metioned_names = _.uniq(metioned_names);
        }


        Topic.findOne().where({
            id: topic_id
        }).populate('replies').then(function(t) {
            topic = t;
            var p=0;
            p= t.replies.length+1;
            return Reply.create({
                content: content,
                floors:p,
                owner: req.options.user.id,
                to_topic: t.id
            })
        }).then(function(r) {
            reply = r;
            if (metioned_names) {
                return User.find().where({
                    username: metioned_names
                });
            } else {
                return [];
            }

        }).then(function(users) {
            //create notifications
            return Promise.all(notification.send({
                users: users,
                topic_owner: topic.owner,
                author: req.options.user.id,
                to_topic: topic.id,
                to_reply: reply.id
            }))

        }).then(function() {
            res.redirect('/topics/' + topic_id);
        }).catch(function(err) {
            res.serverError(err);
        });
    },

    update: function(req, res) {
        var id = req.param('reply_id');
        var content = req.param('reply_edit_data');
        var topic_id = req.param('to_topic');
        Reply.findOne().where({
            id: id
        }).then(function(reply) {
            if (reply.owner == req.session.user_id) {
                return Reply.update({
                    id: id
                }, {
                    content: content,
                    owner: req.options.user.id
                })
            }
        }).then(function(reply) {
            res.redirect('topics/' + topic_id);
        }).catch(function(err) {
            res.serverError(err);
        })
    },
    edit: function(req, res) {
        var id = req.param('id');
        Reply.findOne().where({
            id: id
        }).then(function(reply) {
            res.view({
                reply: reply,
                notifications_unread_count: 1
            })
        }).catch(function(err) {
            res.serverError(err);
        })

    },
    like: function(req, res) {
        var id = req.param('id');

        Reply.findOne().where({
            id: id
        }).then(function(reply) {
            if (!_.contains(reply.upvote_ids, req.options.user.id)) {
                reply.upvote_ids.push(req.options.user.id);
                return Reply.update({
                    id: id
                }, {
                    upvote_ids: reply.upvote_ids
                })
            }else{
                return [reply];
            }
        }).then(function(reply) {
            res.ok(reply[0]);
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    unlike: function(req, res) {
        var id = req.param('id');

        Reply.findOne().where({
            id: id
        }).then(function(reply) {
            if (_.contains(reply.upvote_ids, req.options.user.id)) {
                reply.upvote_ids = _.reject(reply.upvote_ids,function(n){
                    return n == req.options.user.id;
                });
                return Reply.update({
                    id: id
                }, {
                    upvote_ids: reply.upvote_ids
                })
            }else{
                return [reply]
            }
        }).then(function(reply) {
            res.ok(reply[0]);
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    destroy: function(req, res){
        var id = req.param('id');
        Reply.destroy({
            owner:req.options.user.id,
            id:id
        }).then(function(n){
            res.ok();
        }).catch(function(err){
            res.serverError(err);
        })
    },

    show: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    }
};