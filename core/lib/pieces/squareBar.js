var BasePiece = require('./basePiece');
module.exports = SquareBar;
function SquareBar(x, y,d) {
    BasePiece.call(this, x,y,d);
    this.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([ [0, 0], [0, 1], [1, 1], [1, 0] ], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "SquareBar";
    this.clone = function(){
        return new SquareBar(this.x_coord,this.y_coord, this.direction);
    };
}
