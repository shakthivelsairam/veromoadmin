'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  suites: {
    nf: paths.e2e + '/app/name-finder-spa/**/*.js',
    full: paths.e2e + '/**/*.js'
  },

  getPageTimeout: 60000,

  allScriptsTimeout: 60000,

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000 /* each spec */
  },

  onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
            savePath: 'tests/e2e',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true
        })
      );
  }
};
