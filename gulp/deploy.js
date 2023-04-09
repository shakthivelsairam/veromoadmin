'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );
var $ = require( 'gulp-load-plugins' )( {
    pattern: [ 'gulp-*', 'main-bower-files', 'uglify-save-license', 'del' ]
} );

gulp.task( 'clean-nfspa', function () {
    return $.del( path.join( conf.paths.websiteNameFinderSpa, '/**/*' ), {force:true} );
} );

gulp.task('deploy-nfspa', ['clean-nfspa'], function () {
    return gulp.src( path.join( conf.paths.dist, '/**/*' ), {base:'./dist/'})
        .pipe( gulp.dest( conf.paths.websiteNameFinderSpa ) );
});

gulp.task( 'clean-abnonly', function () {
    return $.del( path.join( conf.paths.websiteAbnOnly, '/**/*' ), {force:true} );
} );

gulp.task('deploy-abnonly', ['clean-abnonly'], function () {
    return gulp.src( path.join( conf.paths.dist, '/**/*' ), {base:'./dist/'})
        .pipe( gulp.dest( conf.paths.websiteAbnOnly ) );
});
