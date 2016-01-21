module.exports = function (grunt) {

    // Project configuration.
    grunt.registerTask('default', ['exec:qunit', 'jshint', 'plato', 'browserify', 'uglify', 'exec:deploy']);
    grunt.initConfig({
        exec: {
            qunit: {
                command: 'qunit-cli test/**/*',
                stdout: true,
                stderr: false
            },

            deploy: {
                command: 'cp target/tetris.min.js web/tetris.min.js',
                stdout: true,
                stderr: false
            }
        },
        browserify: {
            client: {
                src: ['lib/tetris.js'],
                dest: 'target/tetris.js',
                options: {
                    browserifyOptions: {
                        standalone: 'Tetris'
                    }
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'target/tetris.min.js': ['target/tetris.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
        },
        plato: {
            code_analysis: {
                options : {
                    complexity : {
                        logicalor : true,
                        switchcase : true,
                        forin : true,
                        trycatch : true
                    }
                },
                files: {
                    'reports': ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-plato');

};