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
                    src: ['**', '!scss/**'], //sassファイルはbuildフォルダに含めない
                    dest: '<%= variable.buildPath%>/assets'
                }
        },
        assemble: {
            options: {
                layout: '<%= variable.srcPath%>/partials/common.hbs',
                partials: '<%= variable.srcPath%>/partials/**/*.hbs',
                assets: '<%= variable.buildPath%>/assets',
                data: ['<%= variable.srcPath%>/data/config.yml']
            },
            watch: {
                expand: true,
                cwd: '<%= variable.srcPath%>',
                src: '*.hbs',
                dest: '<%= variable.buildPath%>'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir:'<%= variable.srcPath%>/assets/scss',
                    cssDir:'<%= variable.buildPath%>/assets/css'
                }
            }
        },
        csslint: {
            check: {
                src: '<%= variable.buildPath%>/assets/css/*.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            assemble: {
                files: ['<%= variable.srcPath%>/**'],
                tasks: ['assemble', 'copy']
            },
            compass: {
                files: ['<%= variable.srcPath%>/**/*.scss'],
                tasks: ['compass', 'csslint', 'assemble']
            }
        }
    });

    //tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');

    //regist
    grunt.registerTask('default', ['connect', 'watch']);
};
