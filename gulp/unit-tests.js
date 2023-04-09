'use strict';

/**
 * SETUP
 */
var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );

var karma = require( 'karma' );

var pathSrcHtml = [
    path.join( conf.paths.tmp, '/serve/**/*.html' ),
    path.join( conf.paths.src, '/**/*.html' )
];

var pathSrcJs = [
    path.join( conf.paths.src, '/**/!(*.spec).js' )
];


/**
 * CONFIGURE AND THEN RUN THE KARMA TESTS
 * @param singleRun {boolean}
 * @param useMocks {boolean}
 * @param done {function}
 */
function runTests( singleRun, useMocks, done ) {
    var reporters = [ 'progress', 'html' ];
    var preprocessors = {};

    pathSrcHtml.forEach( function ( path ) {
        preprocessors[ path ] = [ 'ng-html2js' ];
    } );

    if ( singleRun ) {
        pathSrcJs.forEach( function ( path ) {
            preprocessors[ path ] = [ 'coverage' ];
        } );
        reporters.push( 'coverage' )
    }

    var localConfig = {
        configFile: path.join( __dirname, '/../karma.conf.js' ),
        singleRun: singleRun,
        autoWatch: !singleRun,
        reporters: reporters,
        preprocessors: preprocessors,
        client: {
            useMocks: useMocks
        }
    };

    var server = new karma.Server( localConfig, function ( failCount ) {
        done( failCount ? new Error( "Failed " + failCount + " tests." ) : null );
    } );

    server.start();
}


/**
 * GULP TASKS
 */
gulp.task( 'test', [], function ( done ) {
    runTests( true, true, done );
} );

gulp.task( 'test:auto', [], function ( done ) {
    runTests( false, true, done );
} );

gulp.task( 'test:api', [], function ( done ) {
    runTests( true, false, done );
} );

gulp.task( 'test:api:auto', [], function ( done ) {
    runTests( false, false, done );
} );

gulp.task( 'test:build', [ 'scripts', 'markups' ], function ( done ) {
    runTests( true, true, done );
} );
