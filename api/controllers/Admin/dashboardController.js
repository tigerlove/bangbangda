module.exports = {

    topics: function(req, res) {
        var page = req.param('page');
        var pagelimit = 10;
        var pageNo = 1;

        try{
            pageNo = parseInt(page);
            if(_.isNaN(pageNo)){
                pageNo =1;
            }
            if(pageNo < 1){
                pageNo =1;
            }
        }catch(err){

        }

        var user_notifiction=[];
        var unread_count=0;
        var topics;


        var skipnum = (pageNo-1)*pagelimit;

        Topic.find().where({
            or:[{
                top:true
            },{

            }]
        }).limit(pagelimit).skip(skipnum).sort('top desc').sort({createdAt:'desc'}).populate('replies').populate('owner').then(function(t) {
            topics=t;
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

            res.view({
                topics: topics,
                notifications_unread_count: unread_count,
                pageNo: pageNo
            });
        }).catch(function(err) {
            res.view({
                topics: [],
                notifications_unread_count: unread_count,
                pageNo: pageNo
            });
        });
    },

    topicupdate: function(req, res) {
        var id = req.param('topic_id');
        var title = req.param('title');
        var content = req.param('topic_data');

        var tag = req.param('tag');
        Topic.findOne().where({
            id: id
        }).then(function(topic) {

            return Topic.update({
                id: id
            }, {
                title: title,
                content: content,
                owner: req.options.user.id,
                tags: tag
            })

        }).then(function(topic) {
            res.redirect('admin/topics/');
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    topicedit: function(req, res) {
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
            res.view('admin/dashboard/topic_edit',{
                topic: topic,
                notifications_unread_count:unread_count
            })
        }).catch(function(err) {
            res.serverError(err);
        })
    },

    topicdestroy: function(req, res){
        var id = req.param('id');
        Topic.destroy({

            id:id
        }).then(function(n){
            res.ok();
        }).catch(function(err){
            res.serverError(err);
        })
    },
    topictop: function(req, res){
        var id = req.param('id');
        Topic.findOne().where({
            id: id
        }).then(function(topic) {

            return Topic.update({
                id: id
            }, {
                top: true
            })

        }).then(function(topic) {
            res.redirect('admin/topics/');
        }).catch(function(err) {
            res.serverError(err);
        })
    }

};

