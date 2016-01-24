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

    this.getPiece = function (grid) {
        var availablePieces = {
            0: SquareBar, 1: LongBar,
            2: TBar, 3: LeftDownwardBar,
            4: RightDownwardBar, 5: LeftLBar,
            6: RightLBar
        };
        return new availablePieces[random(0, 6)](grid.x - 2, grid.y - 2, 180);
    };

}

