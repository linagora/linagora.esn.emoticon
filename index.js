'use strict';

var AwesomeModule = require('awesome-module');
var Dependency = AwesomeModule.AwesomeModuleDependency;
var glob = require('glob-all');
var moduleName = 'linagora.esn.emoticon';
var FRONTEND_JS_PATH = __dirname + '/frontend/js/';

var AwesomeEmoticonModule = new AwesomeModule(moduleName, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],

  states: {
    deploy: function(dependencies, callback) {
      // Register the webapp
      var app = require('./backend/webserver')(dependencies);
      var webserverWrapper = dependencies('webserver-wrapper');
      var jsFiles = glob.sync([
        FRONTEND_JS_PATH + '**/*.module.js',
        FRONTEND_JS_PATH + '**/!(*spec).js'
      ]).map(function(filepath) {
        return filepath.replace(FRONTEND_JS_PATH, '');
      });

      webserverWrapper.injectAngularModules(moduleName, jsFiles, [moduleName], ['esn']);
      webserverWrapper.addApp(moduleName, app);

      return callback();
    }
  }
});

/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = AwesomeEmoticonModule;
