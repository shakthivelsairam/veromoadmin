'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require( './conf' );

var $ = require( 'gulp-load-plugins' )( {
    pattern: [ 'gulp-*', 'main-bower-files', 'uglify-save-license', 'del' ]
} );

gulp.task( 'inline-asset-paths', [ 'markups' ], function() {

    // Fix inline asset paths (mainly images)
    var assets_originalPath = "src=\"/assets";
    var assets_websitePath = "src=\"/wp-content/themes/veromo/assets/" +
        "name-finder-spa/assets";

    return gulp.src( [
            path.join( conf.paths.tmp, '/serve/app/abn-only/**/*.html' ) // ABN
        ] )
        .pipe( $.replace( assets_originalPath, assets_websitePath ))
        .pipe( gulp.dest( conf.paths.tmp + '/serve/app/abn-only/' ) );

});

gulp.task( 'partials', [ 'markups', 'inline-asset-paths' ], function () {

    return gulp.src( [
            path.join( conf.paths.src, '/app/**/*.html' ),
            path.join( conf.paths.tmp, '/serve/app/**/*.html' )
        ] )
        .pipe( $.htmlmin( {
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        } ) )
        .pipe( $.angularTemplatecache( 'templateCacheHtml.js', {
            module: 'va.core',
            root: 'app'
        } ) )
        .pipe( gulp.dest( conf.paths.tmp + '/partials/' ) );
} );

gulp.task( 'html', [ 'inject', 'partials' ], function () {
    var partialsInjectFile = gulp.src( path.join( conf.paths.tmp, '/partials/templateCacheHtml.js' ), { read: false } );
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join( conf.paths.tmp, '/partials' ),
        addRootSlash: false
    };

    var htmlFilter = $.filter( '*.html', { restore: true } );
    var jsFilter = $.filter( '**/*.js', { restore: true } );
    var cssFilter = $.filter( [ '**/*.css', '!**/app-external.css' ], { restore: true } );

    var nameFinderSpa_originalPath = "app/name-finder-spa";
    var nameFinderSpa_websitePath = "/wp-content/themes/veromo/assets/" +
        "name-finder-spa/app/name-finder-spa";
    var abnOnly_originalPath = "app/abn-only";
    var abnOnly_websitePath = "/wp-content/themes/veromo/assets/" +
        "abn-only/app/abn-only";

    return gulp.src( [ path.join( conf.paths.tmp, '/serve/*.html' ), path.join( conf.paths.tmp, '/serve/app/app-external.css' ) ] )
        .pipe( $.inject( partialsInjectFile, partialsInjectOptions ) )
        .pipe( $.useref() )
        .pipe( jsFilter )
        .pipe( $.sourcemaps.init() )
        .pipe( $.ngAnnotate() )
        .pipe( $.uglify( { preserveComments: $.uglifySaveLicense } ) ).on( 'error', conf.errorHandler( 'Uglify' ) )
        .pipe( $.rev() )
        // .pipe( $.sourcemaps.write( 'maps' ) )
        // .pipe( $.replace( nameFinderSpa_originalPath, nameFinderSpa_websitePath ))
        // .pipe( $.replace( abnOnly_originalPath, abnOnly_websitePath ))
        .pipe( jsFilter.restore )
        .pipe( cssFilter )
        // .pipe($.sourcemaps.init())
        .pipe( $.cssnano() )
        .pipe( $.rev() )
        // .pipe($.sourcemaps.write('maps'))
        .pipe( cssFilter.restore )
        .pipe( $.revReplace() )
        .pipe( htmlFilter )
        .pipe( $.htmlmin( {
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        } ) )
        .pipe( htmlFilter.restore )
        .pipe( gulp.dest( path.join( conf.paths.dist, '/' ) ) )
        .pipe( $.size( {
            title: path.join( conf.paths.dist, '/' ),
            showFiles: true
        } ) );

} );

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task( 'fonts', function () {
    return gulp.src( $.mainBowerFiles() )
        .pipe( $.filter( '**/*.{eot,otf,svg,ttf,woff,woff2}' ) )
        .pipe( $.flatten() )
        .pipe( gulp.dest( path.join( conf.paths.dist, '/fonts/' ) ) );
} );

gulp.task( 'other', function () {
    var fileFilter = $.filter( function ( file ) {
        return file.stat.isFile();
    } );

    return gulp.src( [
            path.join( conf.paths.src, '/**/*' ),
            path.join( '!' + conf.paths.src, '/**/*.{html,css,js,scss,jade}' )
        ] )
        .pipe( fileFilter )
        .pipe( gulp.dest( path.join( conf.paths.dist, '/' ) ) );
} );

gulp.task( 'clean', function () {
    return $.del( [ path.join( conf.paths.dist, '/' ), path.join( conf.paths.tmp, '/' ) ] );
} );

gulp.task('build', ['clean'], function () {
    gulp.start('build-construct');
});

gulp.task( 'build-construct', [ 'html', 'fonts', 'other' ] );
