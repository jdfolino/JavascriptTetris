module.exports = LongBar;
module.exports = TBar;
module.exports = SquareBar;
module.exports = LeftLBar;
module.exports = RightLBar;
module.exports = LeftDownwardBar;
module.exports = RightDownwardBar;

var BasePiece = function (x, y, d) {
    this.x_coord = x;
    this.y_coord = y;
    this.direction = d;

    return this;
};

BasePiece.prototype.rotateClockwise = function () {
    this.direction = (this.direction + 90) % 360;
};

BasePiece.prototype.rotateAntiClockwise = function () {
    this.direction = (this.direction - 90) % 360;
    if (this.direction < 0) {
        this.direction = 360 + this.direction;
    }
};

BasePiece.prototype.up = function () {
    this.y_coord = this.y_coord + 1;
};

BasePiece.prototype.down = function () {
    this.y_coord = this.y_coord - 1;
};

BasePiece.prototype.left = function () {
    this.x_coord = this.x_coord - 1;
};

BasePiece.prototype.right = function () {
    this.x_coord = this.x_coord + 1;
};

var calcGridItemsOccupied = function(northCoordinates, x, y, direction) {
    var eastCoordinates = _.map(northCoordinates, function (array) { return [array[1] , array[0]]; });
    var southCoordinates = _.map(northCoordinates, function (array) { return [array[0] * -1, array[1] * -1]; });
    var westCoordinates = _.map(eastCoordinates, function (array) { return [array[0] * -1, array[1] * -1]; });

    if (direction === 0) {
        return _.map(northCoordinates, function (array) { return [array[0] + x, array[1] + y]; });
    }
    else if (direction === 90) {
        return _.map(eastCoordinates, function (array) { return [array[0] + x, y-  array[1] ]; });
    }
    else if (direction === 180) {
        return _.map(southCoordinates, function (array) { return [array[0] + x, array[1] + y]; });
    }
    else if (direction === 270) {
        return _.map(westCoordinates, function (array) { return [array[0] + x, y-array[1]]; });
    }
    return null;

};

var LongBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
LongBar.prototype = Object.create(BasePiece.prototype);
LongBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [0, 2], [0, 3]], this.x_coord, this.y_coord, this.direction);
};
LongBar.prototype.name = "LongBar";
LongBar.prototype.clone = function(){
    return new LongBar(this.x_coord,this.y_coord, this.direction);
}

var TBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
TBar.prototype = Object.create(BasePiece.prototype);
TBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [-1, 0], [1, 0] ], this.x_coord, this.y_coord, this.direction);
};
TBar.prototype.name = "TBar";
TBar.prototype.clone = function(){
    return new TBar(this.x_coord,this.y_coord, this.direction);
}

var SquareBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
SquareBar.prototype = Object.create(BasePiece.prototype);
SquareBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [1, 1], [1, 0] ], this.x_coord, this.y_coord, this.direction);
};
SquareBar.prototype.name = "SquareBar";
SquareBar.prototype.clone = function(){
    return new SquareBar(this.x_coord,this.y_coord, this.direction);
}

var RightLBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
RightLBar.prototype = Object.create(BasePiece.prototype);
RightLBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [1, 0], [2, 0], [0, 1] ], this.x_coord, this.y_coord, this.direction);
};
RightLBar.prototype.name = "RightLBar";
RightLBar.prototype.clone = function(){
    return new RightLBar(this.x_coord,this.y_coord, this.direction);
}

var LeftLBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
LeftLBar.prototype = Object.create(BasePiece.prototype);
LeftLBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [0, 2], [1, 0] ], this.x_coord, this.y_coord, this.direction);
};
LeftLBar.prototype.name = "LeftLBar";
LeftLBar.prototype.clone = function(){
    return new LeftLBar(this.x_coord,this.y_coord, this.direction);
}

var RightDownwardBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
RightDownwardBar.prototype = Object.create(BasePiece.prototype);
RightDownwardBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [1, 1], [1, 2] ], this.x_coord, this.y_coord, this.direction);
};
RightDownwardBar.prototype.name = "RightDownwardBar";
RightDownwardBar.prototype.clone = function(){
    return new RightDownwardBar(this.x_coord,this.y_coord, this.direction);
}

var LeftDownwardBar = function (x, y,d) {
    BasePiece.call(this, x,y,d);
};
LeftDownwardBar.prototype = Object.create(BasePiece.prototype);
LeftDownwardBar.prototype.gridItemsOccupied = function () {
    return calcGridItemsOccupied([ [0, 0], [0, 1], [-1, 1], [-1, 2] ], this.x_coord, this.y_coord, this.direction);
};
LeftDownwardBar.prototype.name = "LeftDownwardBar";
LeftDownwardBar.prototype.clone = function(){
    return new LeftDownwardBar(this.x_coord,this.y_coord, this.direction);
}

function createPieceByName(name){
    if (name === "LongBar"){
        return new LongBar(1,0,0);
    }
    else if (name === "TBar"){
        return new TBar(1,0,0);
    }
    else if (name === "SquareBar"){
        return new SquareBar(1,0,0);
    }
    else if (name === "RightLBar"){
        return new RightLBar(1,0,0);
    }
    else if (name === "LeftLBar"){
        return new LeftLBar(0,0,0);
    }
    else if (name === "RightDownwardBar"){
        return new RightDownwardBar(1,0,0);
    }
    else if (name === "LeftDownwardBar"){
        return new LeftDownwardBar(1,0,0);
    }
}
