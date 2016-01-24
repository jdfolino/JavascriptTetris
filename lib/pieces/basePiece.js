module.exports = BasePiece;

function BasePiece(x, y, d) {
    this.x_coord = x;
    this.y_coord = y;
    this.direction = d;

    this.name = "BasePiece";

    this.rotateClockwise = function () {
        this.direction = (this.direction + 90) % 360;
    };

    this.rotateAntiClockwise = function () {
        this.direction = (this.direction - 90) % 360;
        if (this.direction < 0) {
            this.direction = 360 + this.direction;
        }
    };

    this.up = function () {
        this.y_coord = this.y_coord + 1;
    };

    this.down = function () {
        this.y_coord = this.y_coord - 1;
    };

    this.left = function () {
        this.x_coord = this.x_coord - 1;
    };

    this.right = function () {
        this.x_coord = this.x_coord + 1;
    };

    this.calcGridItemsOccupied = function(northCoordinates, x, y, direction) {
        var eastCoordinates = northCoordinates.map(function (array) { return [array[1] , array[0]]; });
        var southCoordinates = northCoordinates.map(function (array) { return [array[0] * -1, array[1] * -1]; });
        var westCoordinates = eastCoordinates.map(function (array) { return [array[0] * -1, array[1] * -1]; });

        if (direction === 0) {
            return northCoordinates.map(function (array) { return [array[0] + x, array[1] + y]; });
        }
        else if (direction === 90) {
            return eastCoordinates.map(function (array) { return [array[0] + x, y-  array[1] ]; });
        }
        else if (direction === 180) {
            return southCoordinates.map(function (array) { return [array[0] + x, array[1] + y]; });
        }
        else if (direction === 270) {
            return westCoordinates.map(function (array) { return [array[0] + x, y-array[1]]; });
        }
        return null;

    };

}

