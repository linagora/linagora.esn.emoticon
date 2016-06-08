'use strict';

var express = require('express');

module.exports = function(dependencies) {

  var application = express();

  require('./views')(dependencies, application);

  return application;
};
