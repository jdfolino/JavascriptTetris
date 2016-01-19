module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        requirejs: {
            compile: {

                // !! You can drop your app.build.js config wholesale into 'options'
                options: {
                    appDir: "lib/",
                    baseUrl: ".",
                    dir: "target/",
                    optimize: 'uglify',
                    mainConfigFile: './lib/tetris.js',
                    modules: [
                        {
                            name: 'MyModule'
                        }
                    ],
                    logLevel: 0,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    inlineText: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');

};