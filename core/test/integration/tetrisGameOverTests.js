if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisFactory = require("../../lib/tetrisFactory");
var Grid = require("../../lib/grid");
var LongBar = require("../../lib/pieces/longBar");

QUnit.test("it should flag the game as finished if a newly place piece cannot fit on the grid", function (assert) {
    var grid = new Grid(5, 5);
    grid.rows = [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]];
    var longBar = new LongBar();
    var longBar2 = new LongBar();
    var gameController = new TetrisFactory().create(grid, [longBar, longBar2], 0);
    gameController.updateGameOverStatus();
    var result = gameController.gameOver;
    assert.equal(true, result);
});
