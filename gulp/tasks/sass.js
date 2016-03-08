/* global module */
/**
 * This file is part of the "WeCodeMore Base Theme" package.
 *
 * © 2015 Franz Josef Kaiser
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var gulp   = require( 'gulp' ),
	config = require( '../config' ),
	sass   = require( 'gulp-sass' ),
	lint   = require( 'gulp-scss-lint' );

gulp.task( 'sass', function () {
	gulp.src( config.sass.src )
		.pipe(
			lint( config.scsslint )
		)
		.pipe(
			sass( config.sass.options )
				.on( 'error', sass.logError )
		)
		.pipe( gulp.dest( config.sass.deploy ) );
} );