'use strict';

module.exports = function(grunt) {

  var frontendFiles = ['frontend/js/**/*.js'];
  var backendFiles = ['backend/**/*.js'];
  var allFiles = frontendFiles.concat(backendFiles).concat(['test/**/*.js', 'index.js', 'Gruntfile.js']);

  grunt.initConfig({
    karma: {
      unit: {
        configFile: './test/config/karma.conf.js',
        browsers: ['PhantomJS']
      }
    },
    eslint: {
      target: allFiles
    },
    puglint: {
      all: {
        options: {
          config: {
            disallowAttributeInterpolation: true,
            disallowLegacyMixinCall: true,
            validateExtensions: true,
            validateIndentation: 2
          }
        },
        src: [
          'frontend/**/*.pug'
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-puglint');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('pug-linter', 'Check the pug/jade files', ['puglint:all']);
  grunt.registerTask('linters', ['eslint', 'pug-linter']);
  grunt.registerTask('test-frontend', ['karma:unit']);
  grunt.registerTask('test', ['linters', 'test-frontend']);

  grunt.registerTask('default', ['test']);
};
