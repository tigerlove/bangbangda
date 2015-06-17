module.exports = function(req, res, next) {

  if (!req.session.user_id) {
    return next();
  }

  return res.forbidden('You are not permitted to perform this action.');
};