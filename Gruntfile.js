module.exports = function(grunt) {
    //config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
          server: {
            options: {base: 'resources/build'}
          }
        },
        assemble: {
            options: {
                layoutdir: 'resources/src/layout',
                data: ['resources/src/data/config.yml']
            },
            watch: {
                expand: true,
                cwd: 'resources/src',
                src: '*.hbs',
                dest: '<%= connect.server.options.base %>'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            assemble: {
                files: ['resources/src/**/*.hbs'],
                tasks: ['assemble']
            },
            compass: {
                files: ['resources/src/**/*.scss'],
                tasks: ['compass', 'csslint', 'assemble']
            },
            data: {
                files: ['resources/src/data/*.yml'],
                tasks: ['assemble']
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir:'resources/src/assets/scss',
                    cssDir:'resources/build/assets/css'
                }
            }
        },
        csslint: {
            check: {
                src: 'build/css/*.css'
            }
        }
    });

    //tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('assemble');

    //regist
    grunt.registerTask('default', ['connect', 'watch']);
};
