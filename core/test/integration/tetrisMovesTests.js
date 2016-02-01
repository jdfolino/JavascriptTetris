if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisFactory = require("../../lib/tetrisFactory");
var Grid = require("../../lib/grid");
var LongBar = require("../../lib/pieces/longBar");

QUnit.test("it should not allow to a piece to rotate clockwise if it falls off the grid", function (assert) {
    var grid = new Grid(5, 5);
    var longBar = new LongBar();
    longBar.place(4, 0, 0);
    var gameController = new TetrisFactory().create(grid, [longBar], 0);
    var result = gameController.rotateClockwise();
    assert.equal(false, result, "failed\nexpected false,\ngot " + result);
});

QUnit.test("should allow a piece to rotate if it does not fall off the grid", function (assert) {
    var piece = new LongBar();
    piece.place(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisFactory().create(grid, [piece], 0);
    var result = gameController.rotateClockwise();
    assert.equal(true, result, 'false');
});

QUnit.test("should not allow pieces to fall of the grid going SOUTH", function (assert) {
    var piece = new LongBar();
    piece.place(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisFactory().create(grid, [piece], 0);
    var result = gameController.moveDown();
    assert.equal(false, result, 'failed');
});

QUnit.test("should not allow pieces to fall of the grid going left", function (assert) {
    var piece = new LongBar();
    piece.place(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisFactory().create(grid, [piece], 0);
    var result = gameController.moveLeft();
    assert.equal(false, result, 'failed');
});


QUnit.test("should not allow pieces to fall of the grid going right", function (assert) {
    var piece = new LongBar();
    piece.place(0, 5, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisFactory().create(grid, [piece], 0);
    var result = gameController.moveRight();
    assert.equal(false, result, 'failed');
});

QUnit.test("should not allow pieces to fall of the grid going EAST (Part II)", function (assert) {
    var piece = new LongBar();
    piece.place(5, 5, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisFactory().create(grid, [piece], 0);
    var result = gameController.moveRight();
    assert.equal(false, result, 'failed');
});

