if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisFactory = require("../../lib/tetrisFactory");
var Grid = require("../../lib/grid");
var LongBar = require("../../lib/pieces/longBar");

QUnit.test("Tetris Game should initiate witha queue of 4 pieces", function (assert) {
    var tetrisGame = new TetrisFactory().create(new Grid(10, 10));
    assert.equal(4, tetrisGame.pieceQueue.length, "failed!");
});