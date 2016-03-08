/* global module */
/**
 * This file is part of the "" package.
 *
 * © 2016 Franz Josef Kaiser
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var fs = require( 'fs' );
var paths =  JSON.parse( fs.readFileSync(
	'./config/paths.json',
	'utf8'
) );

module.exports = {

	scsslint : {
		config  : paths.config + '/scss-lint.yml',
		verbose : true
		//reporterOutputFormat : 'Checkstyle'
	},

	sass : {
		src     : paths.dev.assets + '/*.scss',
		dest    : paths.deploy.assets,
		options : {
			outputStyle : 'compressed',
			includePaths : [
				paths.dev.assets
			]
		}
	}

};