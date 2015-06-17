module.exports = {
    new: function(req, res) {
        return res.view({
            current_user:false

        });
    },

    create: function(req, res) {
        var login = req.param("login");
        var password = req.param("password");
        console.log('--login login:' + login + ' password:' + password);
        User.find().where({
            or: [{
                'username': login
            }, {
                'email': login
            }]
        }).then(function(users) {
            if (users.length > 0) {
                var hasher = require("password-hash");
                if (hasher.verify(password, users[0].password)) {
                    
                    var remember_me = 'yes';//req.param("remember_me");
                    if (remember_me == 'yes') {
                        var token = [users[0].id, require('crypto').createHash('sha512').update(users[0].password).digest('hex')].join('$');
                        res.cookie('remember_token', token, {httpOnly: true });
                    }
                    util.login_as({
                        user: users[0],
                        req: req,
                        res: res
                    });
                    util.redirect_back_or_default({
                        'default': '/',
                        req: req,
                        res: res
                    });
                } else {
                    req.options.err= sails.__("errors")['messages']['current_password_no_match'];
                    res.view('session/new');
                }
            } else {
                req.options.err="Wrong User Or Password";
                res.view('session/new');
            }

        }).catch(function(err) {
            req.options.err=err;
            res.view('session/new');

        });
    },

    destroy: function(req, res) {
        util.logout({
            req: req,
            res: res
        });
        return res.redirect('/');
    }
};