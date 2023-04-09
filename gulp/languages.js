'use strict';

var gulp = require('gulp');
var conf = require( './conf' );
var path = require( 'path' );

var browserSync = require( 'browser-sync' );

/**
 * Copy languages
 * @return {Stream}
 */
gulp.task('languages', [], function() {
  console.log('Copying languages');

  return gulp.src(path.join(conf.paths.src, '/app/**/*.json'))
    .pipe(gulp.dest(conf.paths.tmp + '/serve/app/'));

});


gulp.task( 'languages-reload', [ 'languages' ], function () {
  browserSync.reload();
} );

