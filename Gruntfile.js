module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: ['app', '.'],
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['app/**/*.js', 'i18n/**/*.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['app/**/*.html']
      },
      translations: {
        files: ['i18n/**/*.json'],
        tasks: ['jsonlint']
      }
    },
    jshint: {
      uses_defaults: ['app/**/*.js', 'i18n/**/*.js']
    },
    jsonlint: {
      uses_defaults: ['i18n/**/*.json']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('serve', ['jshint', 'jsonlint', 'connect', 'watch']);

  grunt.registerTask('default', ['serve']);

};
