if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris")
var Grid = require("../../lib/grid")
var tetrisGame =new TetrisGame(new Grid(10, 10), 1);

QUnit.test("Tetris Game should initiate witha queue of 4 pieces", function( assert ) {
    assert.equal(4, tetrisGame.pieceQueue.length , "failed!" );
});
