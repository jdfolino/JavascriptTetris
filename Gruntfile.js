module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
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
    //browserify lib/tetris.js -s Tetris > target/tetris-min.js

};