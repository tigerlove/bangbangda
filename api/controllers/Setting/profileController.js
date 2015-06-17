module.exports = {

    show: function(req, res) {
        var user_notifiction=[];
        var unread_count=0;
        User.find({
            id: req.session.user_id
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
                user:u[0],
                notifications_unread_count: unread_count
            })
        })

    },

    update: function(req, res) {
        var username = req.param("username");
        var email = req.param('email');
        var url = req.param('url');
        var displayname=req.param('displayname');
        var description = req.param('description');


        User.find().where({
            or: [{
                'username': username
            }, {
                'email': email
            }]
        }).then(function(usrs) {
            if (usrs.length > 0 && usrs[0].id != req.session.user_id) {
                req.options.err="Username or email already Taken";
                res.view('user/new');
            };

        }).catch(function(err) {
            res.view(500, {
                error: err
            });
        });

        //update

        User.update({
            id: req.session.user_id
        }, {
            username: username,
            email: email,
            url: url,
            displayname:displayname,
            description: description
        }).then(function(user) {
            res.redirect('/setting/profile');
        }).catch(function(err) {
            res.view(500, {
                error: err
            });
        })
    }
};