'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );

var browserSync = require( 'browser-sync' );

var $ = require( 'gulp-load-plugins' )();

var wiredep = require( 'wiredep' ).stream;
var _ = require( 'lodash' );

gulp.task( 'styles-reload', [ 'styles' ], function () {
    return buildStyles()
        .pipe( browserSync.stream() );
} );

gulp.task( 'styles', function () {
    return buildStyles();
} );

var buildStyles = function () {
    var sassOptions = {
        style: 'expanded'
    };

    // Inject files but ignore app/common/* SCSS files to preserve load order.
    var injectFiles = gulp.src( [
        path.join( conf.paths.src, '/app/**/*.scss' ),
        path.join( '!' + conf.paths.src, '/app/index.scss' ),
        path.join( '!' + conf.paths.src, '/app/common/**/*.scss' ),
        path.join( conf.paths.src, '/lib/**/*.scss' )
    ], { read: false } );

    var injectOptions = {
        transform: function ( filePath ) {
            filePath = filePath.replace( conf.paths.src + '/app/', '' );
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };


    // Copy app-external file to our build DIR
    gulp.src( [
            path.join( conf.paths.src, '/app/app-external.css' )
        ] )
        .pipe( gulp.dest( path.join( conf.paths.tmp, '/serve/app/' ) ) );


    return gulp.src( [
            path.join( conf.paths.src, '/app/index.scss' ),
        ] )
        .pipe( $.inject( injectFiles, injectOptions ) )
        .pipe( wiredep( _.extend( {}, conf.wiredep ) ) )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sass( sassOptions ) ).on( 'error', conf.errorHandler( 'Sass' ) )
        .pipe( $.autoprefixer() ).on( 'error', conf.errorHandler( 'Autoprefixer' ) )
        .pipe( $.sourcemaps.write() )
        .pipe( gulp.dest( path.join( conf.paths.tmp, '/serve/app/' ) ) );
};
