module.exports = function(grunt) {
    grunt.config.set('sass', {
        dev: {
            options: {
                style: 'expanded' //Set your prefered style for development here.
            },
            files: [{
                expand: true,
                cwd: 'assets/styles/',
                src: ['*.scss', '*.sass'], // Feel free to remove a format if you do not use it.
                dest: '.tmp/public/styles/',
                ext: '.css'
            }, {
                expand: true,
                cwd: 'assets/linker/styles/',
                src: ['*.scss', '*.sass'], // Feel free to remove a format if you do not use it.
                dest: '.tmp/public/linker/styles/',
                ext: '.css'
            }]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};