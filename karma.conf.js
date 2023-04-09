'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
    path.join(conf.paths.tmp, '/serve/**/*.html'),
    path.join(conf.paths.src, '/**/*.html')
];

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    var patterns = wiredep(wiredepOptions).js
        .concat([
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/ng-dialog/js/ngDialog.js',
            'bower_components/ngToast/dist/ngToast.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'bower_components/js-signals/dist/signals.js',
            'bower_components/angular-material/angular-material.min.js',
            path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join(conf.paths.src, '/app/**/*.js'),
            path.join(conf.paths.src, '/**/*.spec.js'),
            path.join(conf.paths.src, '/**/*.mock.js')
        ])
        .concat(pathSrcHtml);

    var files = patterns.map(function (pattern) {
        return {
            pattern: pattern
        };
    });
    files.push({
        pattern: path.join(conf.paths.src, '/assets/**/*'),
        included: false,
        served: true,
        watched: false
    });
    files.push({
        pattern: path.join(conf.paths.src, '/lib/**/*.js'),
        included: false,
        served: true,
        watched: false
    });
    return files;
}

module.exports = function (config) {

    var configuration = {
        files: listFiles(),

        singleRun: true,

        autoWatch: false,

        ngHtml2JsPreprocessor: {
            stripPrefix: '(' + conf.paths.src + '/|' + conf.paths.tmp + '/serve/)',
            moduleName: 'va.templates'
        },

        logLevel: 'WARN',

        frameworks: [
            'phantomjs-shim',
            'jasmine',
            'angular-filesort',
            'jasmine-matchers'
        ],

        angularFilesort: {
            whitelist: [ path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js') ]
        },

        browsers: [ 'PhantomJS' ],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-angular-filesort',
            'karma-phantomjs-shim',
            'karma-coverage',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-htmlfile-reporter',
            'karma-jasmine-matchers'
        ],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        reporters: [ 'progress', 'html' ],

        htmlReporter: {
            outputFile: 'tests/units.html'
        },

        proxies: {
            '/assets/': path.join('/base/', conf.paths.src, '/assets/')
        }

    };

    // This is the default preprocessors configuration for a usage with Karma cli
    // The coverage preprocessor is added in gulp/unit-test.js only for single tests
    // It was not possible to do it there because karma doesn't let us now if we are
    // running a single test or not
    configuration.preprocessors = {};
    pathSrcHtml.forEach(function (path) {
        configuration.preprocessors[ path ] = [ 'ng-html2js' ];
    });

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if ( configuration.browsers[ 0 ] === 'Chrome' && process.env.TRAVIS ) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: [ '--no-sandbox' ]
            }
        };
        configuration.browsers = [ 'chrome-travis-ci' ];
    }

    config.set(configuration);
};
