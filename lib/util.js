/**
 * Created by jarrodfolino on 21/01/2016.
 */
module.exports = Util;

function Util(){

     this.reverse = function(a) {
        var result = [];
        var len = a.length;
        for (var i = (len - 1); i >= 0; i--) {
            result.push(a[i]);
        }
        return result;
    }

    this.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
}