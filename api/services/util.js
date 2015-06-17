module.exports = {

    storeLocation: function(options) {
        options.req.session.return_to = options.req.header('Referer') || '/';
    },
    redirect_back_or_default: function(options) {
        options.res.redirect(options.req.session.return_to || options.default);
        delete options.req.session.return_to;
    },
    logout: function(options) {
        delete options.req.session.user_id;
        delete options.req.options.user;
        options.res.cookie('remember_token', undefined, {httpOnly: true });

    },
    login_as: function(options) {
        options.req.options.user = options.user;
        options.req.session.user_id = options.user.id;
    },
    current_user: function(options) {
        var Promise = require('bluebird');
        return new Promise(function(resolve, reject) {
            if (options.req.options.user) {
                resolve(options.req.options.user);
            } else if (options.req.session.user_id) {
                User.find({
                    id: options.req.session.user_id
                }).then(function(users) {
                    if (users.length > 0) {
                        options.req.options.user = users[0];
                        resolve(users[0]);
                    } else {
                        delete options.req.session.user_id;
                        reject();
                    }
                }).catch(function(err) {
                    delete options.req.session.user_id;
                    reject();
                });
            } else { //cookie
                if (options.req.cookies.remember_token) {
                    var id = options.req.cookies.remember_token.split('$')[0];
                    User.findOne({
                        id: id
                    }).then(function(user) {
                        options.req.options.user = user;
                        options.req.session.user_id = user.id;
                        resolve(user);
                    }).catch(function(err) {
                        delete options.req.cookies.remember_token;
                        reject();
                    })
                }

            }
        });

    },
    isLogined:function(options){
        return options.req.session.user_id;
    },
    load_user: function(options) {
        var Promise = require('bluebird');
        return new Promise(function(resolve, reject) {
            if (options.req.options.user) {
                resolve();
            } else if (options.req.session.user_id) {
                User.find({
                    id: options.req.session.user_id
                }).then(function(users) {
                    if (users.length > 0) {
                        options.req.options.user = users[0];
                    } else {
                        delete options.req.session.user_id;
                    }
                    resolve();
                }).catch(function(err) {
                    delete options.req.session.user_id;
                    resolve();
                });
            } else { //cookie
                if (options.req.cookies.remember_token) {
                    var id = options.req.cookies.remember_token.split('$')[0];
                    User.findOne({
                        id: id
                    }).then(function(user) {
                        options.req.options.user = user;
                        options.req.session.user_id = user.id;
                        resolve();
                    }).catch(function(err) {
                        delete options.req.cookies.remember_token;
                        resolve();
                    })
                }else{
                    resolve();
                }
            }
        });
    }
}