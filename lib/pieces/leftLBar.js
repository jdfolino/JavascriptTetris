var BasePiece = require('./basePiece');
module.exports = LeftLBar;

function LeftLBar(x, y, d) {
    BasePiece.call(this, x, y, d);
    this.prototype = Object.create(BasePiece.prototype);
    this.gridItemsOccupied = function () {
        return this.calcGridItemsOccupied([[0, 0], [0, 1], [0, 2], [1, 0]], this.x_coord, this.y_coord, this.direction);
    };
    this.name = "LeftLBar";
    this.clone = function () {
        return new LeftLBar(this.x_coord, this.y_coord, this.direction);
    };
}
