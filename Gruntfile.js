module.exports = function (grunt) {

    // Project configuration.
    grunt.registerTask('default', ['exec', 'browserify']);
    grunt.initConfig({
        exec: {
            qunit: {
                command: 'qunit-cli test/**/*',
                stdout: true,
                stderr: false
            }
        },
        browserify: {
            client: {
                src: ['lib/tetris.js'],
                dest: 'target/tetris.min.js',
                options: {
                    browserifyOptions: {
                        standalone: 'Tetris'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exec');
    //browserify lib/tetris.js -s Tetris > target/tetris-min.js

};