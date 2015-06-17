module.exports = function(req, res, next) {

    if (req.options.user.email == sails.config.app.admin) {
        return next();
    }

    return res.redirect('/login');
};