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
        var password = req.param("password");
        var current_password = req.param("current_password");


        var hasher = require("password-hash");
        if (hasher.verify(current_password, req.options.user.password)) {
            User.update({
                id: req.session.user_id
            }, {
                password: hasher.generate(password)
            }).then(function(user) {
                res.redirect('/setting/password');
            }).catch(function(err) {
                res.view(500, {
                    error: err
                });
            })
        } else {
            res.redirect('/setting/password');
        }

    }
};