module.exports = {
    edit: function(req, res) {
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
    uploadAvatar: function(req, res) {
        req.file('avatar').upload({
            // don't allow the total upload size to exceed ~1MB
            maxBytes: 4000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.options.user.id, {
                    avatar: uploadedFiles[0].fd
                })
                .exec(function(err, user) {
                    if (err) return res.negotiate(err);
                    return res.ok();
                });
        });
    },

    avatar: function(req, res) {
        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function(err, user) {
            if (err) return res.negotiate(err);

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk();

            if (!user || !user.avatar ) {
                fileAdapter.read(sails.config.app.root_path+'/public/images/default.png')
                    .on('error', function(err) {
                        return res.serverError(err);
                    })
                    .pipe(res);
            }else{
                fileAdapter.read(user.avatar)
                    .on('error', function(err) {
                        return res.serverError(err);
                    })
                    .pipe(res);
            }
        });
    }

};