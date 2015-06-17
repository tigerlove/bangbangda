module.exports = {
    show: function(req, res) {

        res.view({
        });

    },
    images: function(req, res){
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();

        var path = sails.config.app.root_path + "/uploads/images/"+req.param('id');
        fileAdapter.read(path)
            .pipe(res);
    },
    uploadimage: function (req, res) {

        req.file('files[]').upload({
            // don't allow the total upload size to exceed ~1MB
            maxBytes: 4000000,
            dirname:'images/'
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            var filename = _.last(uploadedFiles[0].fd.split('/'));
            res.json({
                files:
                    [
                        {
                            url: '/img/'+filename
                        }
                    ]
            });
        });
    }
}
