var BasePiece = require('./basePiece');
module.exports = function (x, y,d) {
    BasePiece.call(this, x,y,d);
    LongBar.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([ [0, 0], [0, 1], [0, 2], [0, 3]], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "LongBar";
    this.clone = function(){
        return new LongBar(this.x_coord,this.y_coord, this.direction);
    }
};
