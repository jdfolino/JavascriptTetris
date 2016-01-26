module.exports = function (grunt) {

    // Project configuration.
    grunt.registerTask('default', ['clean', 'copy', 'exec:bower_install', 'bower_concat', 'exec:tetris_install']);
    grunt.initConfig({
        clean: 'build',
        copy: {
            build: {
                cwd: 'src',
                src: [ '**' ],
                dest: 'build',
                expand: true
            },
        },
        bower_concat: {
            all: {
                dest: 'build/js/_bower.js',
                bowerOptions: {
                    relative: false
                }
            }
        },
        exec: {
            bower_install: {
                cmd: "bower install"
            },
            tetris_install : {
                cmd: "cp ../core/target/tetris.js build/js/tetris.min.js"
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');
};