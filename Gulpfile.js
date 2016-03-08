/* global module */
/**
 * This file is part of the "" package.
 *
 * © 2015 Franz Josef Kaiser
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var fs    = require( 'fs' );
var pkg   = require( './package.json' );
var paths = JSON.parse( fs.readFileSync(
	'./config/paths.json',
	'utf8'
) );
var config = require( './gulp/config.js' );

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )( {
	//DEBUG    : true,
	camelize : true,
	pattern  : [ 'gulp-*', 'gulp.*' ]
} );

// Error handling: Does not break during watch tasks
var _gulpsrc = gulp.src;
gulp.src = function () {
	return _gulpsrc.apply( gulp, arguments )
		.pipe( plugins.plumber( {
			errorHandler : function ( err ) {
				plugins.notify.onError( {
					title   : 'Gulp Error',
					message : '<%= error.message %>',
					sound   : 'Bottle'
				} ).apply(
					this,
					Array.prototype.slice.call( arguments )
				);
				// Do not break watch tasks
				this.emit( 'end' );
			}
		} ) );
};

var del = require( 'del' );
var browserSync = require( 'browser-sync' ).create();

// - - - - - - - - - -

gulp.task( 'clean', function() {
	del.sync( paths.deploy.root );
} );

// Runnable and default tasks
gulp.task( 'default', [ 'clean', 'copy' ], function () {
	gulp.src( paths.dev.jsx + '/*.jsx' )
		.pipe( plugins.sourcemaps.init() )
		.pipe( plugins.babel() )
		.pipe( plugins.debug( {
			title   : ' ---> Compiled:',
			minimal : false
		} ) )
		.pipe( plugins.sourcemaps.write( '.' ) )
		.pipe( gulp.dest( paths.deploy.assets ) );
} );

gulp.task( 'copy', function() {
	gulp.src( [
			paths.dev.root + '/index.html',
			paths.dev.root + '/favicon.ico',
			paths.dev.root + '/server.js'
		] )
		.pipe( plugins.debug( {
			title   : ' ---> Copied:',
			minimal : false
		} ) )
		.pipe( gulp.dest( paths.deploy.root ) );
} );

gulp.task( 'watch', [ 'default' ], function() {
	var spawn = require( 'child_process' ).spawn;
	var child = spawn( 'docker-machine', [ 'ip', 'default' ] );
	child.stdout.setEncoding( 'utf8' );
	var proxy = '';
	child.stdout.on( 'data', function( data ) {
		proxy = data;
		console.log( proxy );
	} );
	browserSync.init( {
		logLevel       : "info",
		logPrefix      : "[ BrowserSync ]",
		logConnections : true,
		port           : 80,
		files          : paths.deploy.root + '/*.*',
		startPath      : '/',
		host           : proxy,
		socket: {
			domain: 'docker.dev:3000'
		}
		//proxy : proxy
		//proxy : "docker.dev"
	} );

	gulp.watch( [ '*.jsx' ], { cwd : paths.dev.jsx }, [ 'default' ] );
		//.on( 'change', browserSync.reload );
} );