var LongBar = require('./longBar');
var SquareBar = require('./squareBar');
var TBar = require('./tBar');
var LeftLBar = require('./leftLBar');
var LeftDownwardBar = require('./leftDownwardBar');
var RightLBar = require('./rightLBar');
var RightDownwardBar = require('./rightDownwardBar');
module.exports = PieceFactory;

function PieceFactory() {

    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    this.getPiece = function(grid) {
        var number = random(0, 6);
        var piece = null;
        switch (number) {
            case 0:
                piece = new SquareBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 1:
                piece = new LongBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 2:
                piece = new TBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 3:
                piece = new LeftDownwardBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 4:
                piece = new RightDownwardBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 5:
                piece = new LeftLBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 6:
                piece = new RightLBar(grid.x - 2, grid.y - 2, 180);
                break;
        }
        return piece;
    };

}