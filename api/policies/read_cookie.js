module.exports = function(req, res, next) {
	util.load_user({req:req}).then(function(){
		return next();
	});
};