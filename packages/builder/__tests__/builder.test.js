'use strict';

const builder = require('..');
const assert = require('assert').strict;

assert.strictEqual(builder(), 'Hello from builder');
console.info("builder tests passed");
