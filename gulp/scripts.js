'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );

var browserSync = require( 'browser-sync' );

var $ = require( 'gulp-load-plugins' )();


gulp.task( 'scripts-reload', function () {
    return buildScripts()
        .pipe( browserSync.stream() );
} );

gulp.task( 'scripts', function () {
    return buildScripts();
} );

function buildScripts() {
    return gulp.src([
            path.join( conf.paths.src, '/app/**/*.js' ),
            path.join( conf.paths.src, '/lib/**/*.js' )
        ])
        .pipe( $.eslint({
            globals: [
                'ga',
                'StripeCheckout',
                '_gaq'
            ],
            rules: {
                "no-unused-vars": 0,
                "angular/log": 0,
                "no-console": 0
            }
        }) )
        .pipe( $.eslint.format() )
        .pipe( $.size() )
}
