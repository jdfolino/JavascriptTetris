module.exports = function (grunt) {

    // Project configuration.
    grunt.registerTask('default', ['clean', 'bootlint', 'copy', 'exec:bower_install', 'bower_concat', 'exec:tetris_install']);
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/**/*.*', '../core/target/tetris.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
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
                cssDest: 'build/css/_bower.css',
                mainFiles: {
                    jquery: ['dist/jquery.js'],
                    bootstrap: [ 'dist/css/bootstrap.min.css', 'dist/js/bootstrap.min.js' ]
                },
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
        },
        bootlint: {
            options: {
                stoponerror: true,
                relaxerror: ['W005']
            },
            files: ['src/*.html']
        }
    });
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};