var canvas = document.getElementById("c");
var painter = canvas.getContext("2d")
drawBackground();
var big = 10;
var small = 4;

for (var r = 0; r < 400/big; ++r) {
    for (var c = 0; c < 400/big; ++c){
        var x = 0 + c*big;
        var y = 0 + r*big;
        if((c+r) %2 == 0) {//(even column and even row), or (odd column and odd row)
            var color = "#BBBBBB";
        } else {// odd column
            var color = "#555555";
        }
        drawSquare(color, x, y, big);   
    }
}

for (var r = 0; r < 400/big - 1; ++r) {
    for (var c = 0; c < 400/big -1; ++c){
        var x = 0 + c*big + big-small/2;//everytime
        var y = 0 + r*big + big-small/2;
        var color = "#BBBBBB";
        if((c+r) %2 == 0) {//(even column and even row), or (odd column and odd row)
            var color = "#000000";
        } else {// odd column
            var color = "#FFFFFF";
        }
        if (r > 1/4 * 400/big && r < 3/4 * 400/big && 
            c > 1/4 * 400/big && c < 3/4 * 400/big){
                if (color == "#000000")
                    color = "#FFFFFF";
                 else
                    color = "#000000";
            }
        drawSquare(color, x, y, small);   
    }
}

function drawBackground(){
// creating and filling a rectangle
painter.fillStyle = "#000000"; // 0 Less dense color, F is most dense color
painter.fillRect(0,0, 400, 400); // (x, y, width, height)
}

function drawSquare(color, x, y,size) {
    painter.fillStyle = color;
    painter.fillRect(x, y, size, size);
}







//for (var i = 0; i < 13; ++i){
    //painter.fillRect(10 + 30*i, 10, 20, 20);








