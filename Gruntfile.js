module.exports = function(grunt) {
    //config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        variable: {
            buildPath: 'resources/build',
            releasePath: 'resources/release',
            srcPath: 'resources/src'
        },
        connect: {
          server: {
            options: {
                base: '<%= variable.buildPath%>',
                port:9000
            }
          }
        },
        copy: {
                assets: {
                    expand: true,
                    cwd: '<%= variable.srcPath%>/assets',
                    src: ['**', '!_*/**'],
                    dest: '<%= variable.buildPath%>/assets'
                }
        },
        assemble: {
            develop: {
                options: {
                    layout: '<%= variable.srcPath%>/partials/common.hbs',
                    partials: '<%= variable.srcPath%>/partials/**/*.hbs',
                    assets: '<%= variable.buildPath%>/assets',
                    data: ['<%= variable.srcPath%>/data/config.yml'],
                    helpers: ['<%= variable.srcPath%>/assets/_plugin/custom-helper.js'],
                    develop: true,
                    release: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= variable.srcPath%>',
                    src: '*.hbs',
                    dest: '<%= variable.buildPath%>'
                }]
            },
            release: {
                options: {
                    layout: '<%= variable.srcPath%>/partials/common.hbs',
                    partials: '<%= variable.srcPath%>/partials/**/*.hbs',
                    assets: '<%= variable.buildPath%>/assets',
                    data: ['<%= variable.srcPath%>/data/config.yml'],
                    develop: false,
                    release: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= variable.srcPath%>',
                    src: '*.hbs',
                    dest: '<%= variable.buildPath%>'
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir:'<%= variable.srcPath%>/assets/_scss',
                    cssDir:'<%= variable.buildPath%>/assets/css'
                }
            }
        },
        csslint: {
            check: {
                src: '<%= variable.buildPath%>/**/*.css'
            }
        },
        jshint: {
            files: ['<%= variable.buildPath%>/**/*.js', '!<%= variable.buildPath%>/**/jquery*.js'],
            options: {
                jshintrc: '<%= variable.srcPath%>/assets/_plugin/jshint.json',
                force: true
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= variable.srcPath%>/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: ['<%= variable.srcPath%>/**/*.js']
            },
            assemble: {
                files: ['<%= variable.srcPath%>/**'],
                tasks: ['assemble:develop', 'copy', 'csslint', 'jshint']
            }
        }
    });

    //tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('assemble');

    //regist
    grunt.registerTask('build:develop', ['compass', 'assemble:develop', 'copy', 'csslint', 'jshint']);
    grunt.registerTask('build:release', ['compass', 'assemble:release', 'copy', 'csslint', 'jshint']);
    grunt.registerTask('default', ['connect', 'watch']);
};
