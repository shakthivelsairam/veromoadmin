'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );

var $ = require( 'gulp-load-plugins' )();

var wiredep = require( 'wiredep' ).stream;
var _ = require( 'lodash' );

var browserSync = require( 'browser-sync' );

gulp.task( 'inject-reload', [ 'inject' ], function () {
    browserSync.reload();
} );

gulp.task( 'inject', [ 'scripts', 'styles', 'languages' ], function () {
    var injectStyles = gulp.src( [
        path.join( conf.paths.tmp, '/serve/app/**/*.css' ),
        path.join( '!' + conf.paths.tmp, '/serve/app/app-external.css' ),
        path.join( '!' + conf.paths.tmp, '/serve/app/vendor.css' )
    ], { read: false } );

    var injectScripts = gulp.src( [
            path.join( conf.paths.src, '/app/**/*.module.js' ),
            path.join( conf.paths.src, '/app/**/*.js' ),
            path.join( conf.paths.src, '/lib/**/*.js' ),
            path.join( '!' + conf.paths.src, '/app/**/*.spec.js' ),
            path.join( '!' + conf.paths.src, '/app/**/*.mock.js' )
        ] )
        .pipe( $.angularFilesort() ).on( 'error', conf.errorHandler( 'AngularFilesort' ) );

    var injectOptions = {
        ignorePath: [ conf.paths.src, path.join( conf.paths.tmp, '/serve' ) ],
        addRootSlash: false
    };

    // NOTE: from Brad,
    // I'm temporarily injecting only into index.html for faster local dev
    // as injecting into *.html takes a long time and multiple refreshes, and
    // we are not using the other .html files at the moment.
    // Change /index.html to /*.html to resume injection into all html files
    return gulp.src( path.join( conf.paths.src, '/index.html' ) )
        .pipe( $.inject( injectStyles, injectOptions ) )
        .pipe( $.inject( injectScripts, injectOptions ) )
        .pipe( wiredep( _.extend( {}, conf.wiredep ) ) )
        .pipe( gulp.dest( path.join( conf.paths.tmp, '/serve' ) ) );
} );
