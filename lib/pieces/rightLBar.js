var BasePiece = require('./basePiece');
module.exports = RightLBar
function RightLBar(x, y,d) {
    BasePiece.call(this, x,y,d);
    this.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([ [0, 0], [1, 0], [2, 0], [0, 1] ], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "RightLBar";
    this.clone = function(){
        return new RightLBar(this.x_coord,this.y_coord, this.direction);
    }
};
