module.exports = function(req, res, next) {

  if (req.session.user_id) {
    return next();
  }

  return res.redirect('/login');
};