module.exports = Grid;

function Grid(x, y) {
    this.x = x;
    this.y = y;
    this.rows = [];

    for (var i = 0; i < this.y; i++) {
        this.rows.push([]);
        for (var j = 0; j < this.x; j++) {
            this.rows[i].push(false);
        }
    }

    this.addNewRow = function () {
        var row_to_add = [];
        for (var d = 0; d < this.x; d++) {
            row_to_add.push(false);
        }
        this.rows.push(row_to_add);
    }
}