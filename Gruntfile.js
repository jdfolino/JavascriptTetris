module.exports = function (grunt) {

    // Project configuration.
    grunt.registerTask('default', ['exec:qunit', 'browserify', 'uglify', 'exec:deploy']);
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
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //browserify lib/tetris.js -s Tetris > target/tetris-min.js

};