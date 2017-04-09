"use strict";

var assert = require ('assert');

var originalFile = process.argv[2];
var verifyFile = process.argv[3];

var originalTree;
var verifyTree;

try
{
	originalTree = require ('./'+originalFile);
}
catch (e)
{
	console.error ('Cannot load original AST from '+originalFile);
	process.exit (-1);
}

try
{
	verifyTree = require ('./'+verifyFile);
}
catch (e)
{
	console.error ('Cannot load AST from '+verifyFile);
	process.exit (-1);
}

if (!originalTree.error)
{
	assert.deepStrictEqual (originalTree, verifyTree);
}
else
{
	if (originalTree.error !== verifyTree.error)
	{
		console.error ('The error type should be '+originalTree.error);
		process.exit (-1);
	}
	else
	if (originalTree.line !== verifyTree.line)
	{
		console.error ('The error line should be '+originalTree.line);
		process.exit (-1);
	}
	else
	if (typeof verifyTree.token !== 'string')
	{
		console.error ('Your error should have a token');
		process.exit (-1);
	}
	else
	if (typeof verifyTree.expected !== 'array' || verifyTree.expected.length === 0 || typeof verifyTree.expected[0] !== 'string')
	{
		console.error ('You should have at least an expected token');
		process.exit (-1);
	}
}



