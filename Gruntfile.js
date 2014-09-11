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
        files: ['app/**/*.js', 'lib/**/*.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['app/**/*.html']
      },
      translations: {
        files: ['translations/**/*.json'],
        tasks: ['jsonlint', 'concat']
      }
    },
    jshint: {
      uses_defaults: ['app/**/*.js', 'lib/**/*.js']
    },
    jsonlint: {
      uses_defaults: ['translations/**/*.json']
    },
    concat: {
      translations: {
        options: {
          banner: '/* Generated file, do not edit. */\n' +
            'Ember.ENV.I18N_SUPPORTED_LANGUAGES = [];\n' +
            'Ember.ENV.translations={};\n',
          process: function (src, filepath) {
            var language = filepath.split('/').pop().split('.')[0];
            var supported = 'Ember.ENV.I18N_SUPPORTED_LANGUAGES.push(\'' + language + '\')';
            var key = 'Ember.ENV.translations.' + language;
            var value = JSON.stringify(JSON.parse(src));
            return supported + ';\n' + key + '=' + value + ';';
          }
        },
        src: ['translations/**/*.json'],
        dest: 'lib/translations.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('serve', ['jshint', 'jsonlint', 'concat', 'connect', 'watch']);

  grunt.registerTask('default', ['serve']);

};
