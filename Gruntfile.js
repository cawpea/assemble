module.exports = function(grunt) {
  //config
  grunt.initConfig({
    connect: {
      server: {
        options: {base: 'resources/build'}
      }
    },

    assemble: {
      options: {layoutdir: 'resources/src/layout'},
      watch: {
        expand: true,
        cwd: 'resources/src',
        src: ['**/index.hbs'],
        dest: '<%= connect.server.options.base %>'
      }
    },

    watch: {
      assemble: {
        files: ['resources/src/**/*.hbs'],
        tasks: 'assemble'
      }
    }
  });

  //tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble');

  //regist
  grunt.registerTask('default', ['connect', 'watch']);
};
