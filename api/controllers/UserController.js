module.exports = {
    new: function(req, res) {
        return res.view();
    },

    create: function(req, res) {
        var username = req.param("username");
        var password = req.param("password");
        var displayname=req.param("displayname");
        var email = req.param('email');
        console.log('--signup username:' + username);
        User.find().where({
            or: [{
                'username': username
            }, {
                'email': email
            }]
        }).then(function(usrs) {
            if (usrs.length > 0) {
                req.options.err="Username already Taken";
                res.view('user/new');
            }
            var hasher = require("password-hash");
            password = hasher.generate(password);
            return User.create({
                username: username,
                email: email,
                displayname:displayname,
                password: password
            });
        }).then(function(user) {
            util.login_as({
                user: user,
                req: req,
                res: res
            });
            util.redirect_back_or_default({
                'default': '/',
                req: req,
                res: res
            });
        }).catch(function(err) {
            req.options.err=err;
            res.view('user/new');
        });
    }
};