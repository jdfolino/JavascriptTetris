var BasePiece = require('./basePiece');

module.exports = LeftDownwardBar
function LeftDownwardBar(x, y,d) {
    BasePiece.call(this, x,y,d);
    this.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([ [0, 0], [0, 1], [-1, 1], [-1, 2] ], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "LeftDownwardBar";
    this.clone = function(){
        return new LeftDownwardBar(this.x_coord,this.y_coord, this.direction);
    }
};
