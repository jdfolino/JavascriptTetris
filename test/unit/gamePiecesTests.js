if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');


var BasePiece = require("../../lib/pieces/basePiece")
var basePiece = new BasePiece(10, 10);

var LeftDownwardBar = require("../../lib/pieces/leftDownwardBar")
var leftDownwardBar = new LeftDownwardBar(10, 10);


QUnit.test( "LeftDownwardBar name", function( assert ) {
    assert.equal("LeftDownwardBar", leftDownwardBar.name, "failed!" );
    assert.equal(10, leftDownwardBar.x_coord,  "failed!" );
});

QUnit.test( "LeftDownwardBar x_coord", function( assert ) {
    assert.equal("LeftDownwardBar", leftDownwardBar.name, "failed!" );
    assert.equal(10, leftDownwardBar.x_coord,  "failed!" );
});