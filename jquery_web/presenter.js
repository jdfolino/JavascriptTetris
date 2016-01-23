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
    var that = this;
    this.controller.getNextPiece();
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            uiFunctions.clearPiece('#grid', that.controller);
            that.controller.moveLeft();
            uiFunctions.drawPiece('#grid', that.controller);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 38) {
            uiFunctions.clearPiece('#grid', that.controller);
            that.controller.rotateClockwise();
            uiFunctions.drawPiece('#grid', that.controller);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 39) {
            uiFunctions.clearPiece('#grid', that.controller);
            that.controller.moveRight();
            uiFunctions.drawPiece('#grid', that.controller);
        }
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 40) {
            that.controller.score = that.controller.score + 1;
            uiFunctions.clearPiece('#grid', that.controller);
            if (that.controller.moveDown() == false) {
                that.activePiece = that.controller.pieceHitsGround(that.activePiece);
            }
            uiFunctions.drawAll(that.controller);
        }
        return false;
    });

    timeouts.push(setInterval(function () {
        uiFunctions.clearPiece('#grid',that.controller);
        if (that.controller.moveDown() == false) {
            that.activePiece = that.controller.pieceHitsGround();
            uiFunctions.renderGameOver(that.controller.activePiece, that.stats);
        }
        uiFunctions.drawAll(that.controller);
    }, 1000));

    this.start = function() {
        uiFunctions.drawAll(that.controller);
    }
    return this;
};

$(document).ready(function () {
    var uiFunctions = {
        drawAll: function(controller){
            this.drawGrid('#grid', controller);
            this.drawPiece('#grid', controller);
            this.renderPieceQueue(controller);
            this.setLinesCleared(controller);
        },

        drawGrid: function (id, controller) {
            var grid = controller.grid
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

        setLinesCleared: function (controller) {
            var score = controller.score;
            var linesCleared = controller.linesCleared;
            var level = controller.level();
            var stats = controller.stats;
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

        drawPiece: function(id, controller) {
            var piece = controller.activePiece
            var grid = controller.grid
            for (var i = 0; i < piece.gridItemsOccupied().length; i++) {
                var el = $(id + " > div:eq(" + (grid.y - piece.gridItemsOccupied()[i][1] - 1) + ") > span:eq(" + (piece.gridItemsOccupied()[i][0] ) + ")");
                el.addClass('arrow');
                el.addClass(piece.name);
            }
        },

        clearPiece: function (id, controller) {
            var piece = controller.activePiece
            var grid = controller.grid
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

        renderPieceQueue: function (controller) {
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