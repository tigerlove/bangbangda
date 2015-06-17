module.exports = {

    show: function (req, res) {
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


        var skipnum = (pageNo-1)*pagelimit;

        var username = req.param('username');
        var user_id;
        var people;
        var user_notifiction=[];
        var unread_count=0;
        User.findOne({
            username: username
        }).populate('notifications').then(function (p) {
            if (p) {
                people = p;
                _.each(p.notifications, function(n) {
                    if(n.read==false){
                        user_notifiction.push(n);
                    }
                    unread_count=user_notifiction.length;
                });
                return Topic.find({
                    owner: p.id
                }).limit(pagelimit).skip(skipnum).sort({createdAt:'desc'}).populate('owner').populate('replies')
            }else{
                res.notFound();
            }
        }).then(function (topics) {
            res.view({
                topics: topics,
                people: people,
                pageNo: pageNo,
                notifications_unread_count: unread_count
            });
        }).catch(function (err) {
            res.view({
                topics: [],
                notifications_unread_count: unread_count
            });
        });

    }
};