if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris")
var Grid = require("../../lib/grid")
var LongBar = require("../../lib/pieces/longBar")

QUnit.test("Tetris Game should initiate witha queue of 4 pieces", function( assert ) {
    var tetrisGame =new TetrisGame(new Grid(10, 10), 1);
    assert.equal(4, tetrisGame.pieceQueue.length , "failed!" );
});


QUnit.test("it should not allow to a piece to rotate clockwise if it falls off the grid", function (assert) {
    var grid = new Grid(5,5);
    var longBar = new LongBar(4,0, 0);
    var gameController = new TetrisGame(grid, 0, longBar);
    var result = gameController.tryMove(longBar,
        {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
    );
    assert.equal(false, result, "failed");
});