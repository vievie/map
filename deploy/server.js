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

const express = require( 'express' );

// Constants
const PORT = 3000;

// App
const app = express();

app.get( '/', function ( req, res ) {
	res.send( 'Hello, you awesome Nodejs world!\n' );
} );

app.listen( PORT );

console.log( 'Running on http://localhost:' + PORT );