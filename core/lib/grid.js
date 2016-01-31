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
    };

    this.fill = function(piece) {
        var coordinates = piece.gridItemsOccupied();
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            this.rows[y][x] = piece.name;
        }
    };

    this.explodeCompleteLines = function (linesAlreadyExploded) {
        function findRowToDelete(me) {
            var rows_to_delete = null;
            for (var i = 0; i < me.rows.length; i++) {
                if (me.rows[i].filter(function (cell) {
                        return cell === true;
                    }).length === me.rows[i].length) {
                    rows_to_delete = i;
                    break;
                }
            }
            return rows_to_delete;
        }

        var row_to_delete = findRowToDelete(this);
        if (row_to_delete === null) {
            return linesAlreadyExploded;
        }

        this.rows.splice(row_to_delete, 1);
        this.addNewRow();
        return this.explodeCompleteLines(linesAlreadyExploded + 1);

    };
}