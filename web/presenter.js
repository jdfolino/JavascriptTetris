function reverse(a) {
    var result = [];
    var len = a.length;
    for (var i = (len - 1); i >= 0; i--) {
        result.push(a[i]);
    }
    return result;
}

var main = function (uiFunctions, grid, starting_interval) {
    var timeouts = [];
    this.controller = new Tetris();
    this.grid = this.controller.grid;

    var that = this;

    this.activePiece = this.controller.getNextPiece();
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            debugger
            uiFunctions.clearPiece('#grid', that.activePiece, that.grid);
            that.controller.moveLeft(that.activePiece);
            uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 38) {
            uiFunctions.clearPiece('#grid', that.activePiece, that.grid);
            that.controller.rotateClockwise(that.activePiece);
            uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 39) {
            debugger
            uiFunctions.clearPiece('#grid', that.activePiece, that.grid);
            that.controller.moveRight(that.activePiece);
            uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 40) {
            that.controller.score = that.controller.score + 1;
            uiFunctions.clearPiece('#grid', that.activePiece, that.grid);
            if (that.controller.moveDown(that.activePiece) == false) {
                that.activePiece = that.controller.pieceHitsGround(that.activePiece);
            }
            uiFunctions.drawGrid('#grid', that.grid);
            uiFunctions.setLinesCleared(that.controller.score, that.controller.linesCleared, that.controller.level(), that.controller.stats);
            uiFunctions.renderPieceQueue(that.controller.pieceQueue);
            uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
        }
        return false;
    });

    timeouts.push(setInterval(function () {
        uiFunctions.clearPiece('#grid',that.activePiece, that.grid);
        if (that.controller.moveDown(that.activePiece) == false) {
            that.activePiece = that.controller.pieceHitsGround(that.activePiece);
            uiFunctions.renderGameOver(that.activePiece, that.stats);
        }
        uiFunctions.drawGrid('#grid', that.grid);

        uiFunctions.setLinesCleared(that.controller.score, that.controller.linesCleared, that.controller.level(), that.controller.stats);

        uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
    },  1000));

    this.start = function () {
        uiFunctions.drawGrid('#grid', that.grid);
        uiFunctions.drawPiece('#grid', that.activePiece, that.grid);
        uiFunctions.renderPieceQueue(that.controller.pieceQueue);
        uiFunctions.setLinesCleared(that.controller.score, that.controller.linesCleared, that.controller.level(), that.controller.stats);
    }

    this.stop = function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        this.controller.pieceQueue = null;
        this.controller.grid = new Grid(0, 0);
        //quick reset of the timer array you just cleared
        timeouts = [];
    }
    return this;
};

$(document).ready(function () {


    var uiFunctions = {
        drawGrid: function (id, grid) {
            var out = "";
            var rows = reverse(grid.rows);
            for (var a = 0; a < rows.length; a++) {
                out = out + "<div>";
                for (var j = 0; j < rows[a].length; j++) {
                    var cssClass = ""
                    if (rows[a][j] === true) {
                        cssClass = 'arrow2'
                    }

                    out = out + "<span class='" + cssClass + "'></span>";
                }
                out = out + "</div>";
            }
            $(id).html(out);
        },

        setLinesCleared: function (score, linesCleared, level, stats) {
            var el = $("#lines");
            el.text('Lines cleared: ' + linesCleared);

            el = $("#score");
            el.text('Score: ' + score);

            el = $("#level");
            el.text('Level: ' + level);

            el = $("#singles");
            el.text("Singles: " + stats[1]);
            el = $("#doubles");
            el.text("Doubles: " + stats[2]);
            el = $("#triples");
            el.text("Triples: " + stats[3]);

            el = $("#tetra");
            el.text("Tetra: " + stats[4]);

        },

        drawPiece: function(id, piece, grid) {
            for (var i = 0; i < piece.gridItemsOccupied().length; i++) {
                var el = $(id + " > div:eq(" + (grid.y - piece.gridItemsOccupied()[i][1] - 1) + ") > span:eq(" + (piece.gridItemsOccupied()[i][0] ) + ")");
                el.addClass('arrow');
                el.addClass(piece.name);
            }
        },

        clearPiece: function (id, piece, grid) {
            for (var i = 0; i < piece.gridItemsOccupied().length; i++) {
                var el = $(id + " > div:eq(" + (grid.y - piece.gridItemsOccupied()[i][1] - 1) + ") > span:eq(" + (piece.gridItemsOccupied()[i][0] ) + ")");
                el.removeClass('arrow');
                el.removeClass(piece.name);
            }
        },

        renderGameOver: function(piece, stats) {
            if (piece == false) {
                alert('Game Over');
            }
//
//            var scoringTypeGraph = Raphael("graph");
//            var pie = null;
//            pie = scoringTypeGraph.piechart(100, 240, 100, [stats[1], stats[2], stats[3], stats[4]],
//                {
//                    legend: ["Singles", "Doubles", "Triples", "Tetris"],
//                    legendpos: "east"
//                }
//            );
        },

        renderPieceQueue: function (queue) {
        }

    }

    var presenter = null;
    $("#play_now").click(function () {
        $("#controls").hide();
        $("#grid").show();
        presenter = main(uiFunctions);
        presenter.start();
    });

    $("#new_game").click(function () {
        presenter.stop();
        $(document).unbind();
        $("#controls").show();
        $("#grid").hide();
    });

});