if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var Grid = require("../../lib/grid.js");
var grid = new Grid(10, 10);

QUnit.test( "Grid length should be number specified", function( assert ) {
    assert.equal(grid.x, 10, "failed!" );
});

QUnit.test( "Grid height should be number specified", function( assert ) {
    assert.equal(grid.y, 10, "failed!" );
});
