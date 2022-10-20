var canvas = document.getElementById("c");
var painter = canvas.getContext("2d")

// creating and filling a rectangle
painter.fillStyle = "#000000"; // 0 Less dense color, F is most dense color
painter.fillRect(0,0, 400, 400); // (x, y, width, height)
painter.fillStyle = "#FF0000"; // bus the red color to the repeated squares

var count = 0

for(var r = 0; r < 13; ++r){
    for( var c=0; c<13; ++c){
        if (c == 30){
            continue;
        }
        painter.fillRect(10 + 30*c, 10 + r*30, 20, 20);
        ++count;
    }
}
    






//for (var i = 0; i < 13; ++i){
    //painter.fillRect(10 + 30*i, 10, 20, 20);








