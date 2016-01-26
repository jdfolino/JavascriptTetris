var BasePiece = require('./basePiece');
module.exports =TBar;
function TBar(x, y,d) {
    BasePiece.call(this, x,y,d);
    this.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([ [0, 0], [0, 1], [-1, 0], [1, 0] ], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "TBar";
    this.clone = function(){
        return new TBar(this.x_coord,this.y_coord, this.direction);
    };
}
