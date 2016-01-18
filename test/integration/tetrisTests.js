if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris")
var Grid = require("../../lib/grid")
//var LongBar = require("../../lib/pieces/longBar")
var tetrisGame =new TetrisGame(new Grid(10, 10), 1);

QUnit.test("Tetris Game should initiate witha queue of 4 pieces", function( assert ) {
    assert.equal(4, tetrisGame.pieceQueue.length , "failed!" );
});


QUnit.test("it should not allow to a piece to rotate clockwise if it falls off the grid", function (assert) {
    var grid = new Grid(5,5);
    var piece = new LongBar(4,0,0);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0});
    assert.equal(false, result, "failed");
});