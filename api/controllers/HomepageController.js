module.exports = {

    index: function(req, res) {
        var page = req.param('page');
        var pagelimit = 10; 
        var pageNo = 1;
        var tag  = req.param('tag')
        if(!tag){
            tag = ''
        }
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
        var op = {};
        if(tag){
            op.tags=tag
        }

        Topic.find().where({
            or:[{
                top:true
            },op]
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
                pageNo: pageNo,
                tag:tag
            });
        }).catch(function(err) {
            res.view({
                topics: [],
                notifications_unread_count: unread_count,
                pageNo: pageNo,
                tag: tag
            });
        });
    },
    counttag:function(req, res) {
        var tag  = req.param('tag')
        Topic.count().where({
            tags:tag
        }).then(function(data){
            res.json(data)
        })
    }

};