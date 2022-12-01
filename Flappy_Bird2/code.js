var painter = document.getElementById("c").getContext("2d"); 
var pipes = [[100, 100, 50, 100],[240, 200, 50, 100],[380, 150, 50, 100]]; //a[1] = 3, number are assigned 0-3 - his comment [x, y, w, h] of the passage
var pipe_dx = -2;
var birdX = 50;
var birdY = 100;
var birdSize = 20;
var g = 0.1;
var birdDY = 0;// delta y, the increasement in an interval
var jump = -5;
var timer;
var score = 0;

drawFrame();

document.addEventListener('keydown', onkeydown);

function init (){
    pipes = [[100, 100, 50, 100],[240, 200, 50, 100],[380, 150, 50, 100]]; 
 pipe_dx = -2;
 birdX = 50;
 birdY = 100;
 birdSize = 20;
 g = 0.1;
 birdDY = 0;
 score = 0;
 timer = setInterval(drawFrame, 20)
 

}

function onkeydown (e) {
    if (e.key === 'Enter'){
       timer = setInterval(drawFrame, 20);
    } else if (e.key === ' ') {
        birdDY += jump;
    }
}

function updatePipes(){
    for (var i = 0; i < pipes.length; ++i){
        pipes[i][0] += pipe_dx;
        // if any pipe is outside the left, then place it to the right
        if (pipes[i][0] < 0- pipes[i][2]){
            pipes[i][0]=400 + Math.random()*(50-10)+10;
            score ++;

        }
    }
}

function updateBird (){
    birdDY += g;
    birdY += birdDY;
}

function isOver() {
    for (var i = 0; i < pipes.length; ++i){
        // bird is in the upper rect
        if (isXyInRect(birdX, birdY, pipes[i][0], 0, pipes[i][2], pipes[i][1]) ||
        isXyInRect(birdX+birdSize, birdY, pipes[i][0], 0, pipes[i][2], pipes[i][1])){
            return true;
        }
        // bird is in the lower rect
        if (isXyInRect(birdX, birdY+birdSize, pipes[i][0], pipes[i][1]+pipes[i][3], pipes[i][2] , 400-pipes[i][1]-pipes[i][3]) ||
        isXyInRect(birdX+birdSize, birdY+birdSize, pipes[i][0], pipes[i][1]+pipes[i][3], pipes[i][2] , 400-pipes[i][1]-pipes[i][3])){
            return true;
        }
    }
    // top edge or bottom edge
    if (birdY <= 0 || birdY >= 400-birdSize){
        return true;
    }
    return false;
}

function drawFrame () {
    //detect collision
    if (isOver()){
        // show game over, clear the timer
        drawGameOver ();
        clearInterval(timer);
        return;

    }
    //update data
    updatePipes();
    updateBird();
    //draw
    drawBackground();
    drawPipes ();
    drawBird(); 
    drawScore();
}

function drawBird (){
    painter.fillStyle = "#ff0000";
    painter.fillRect(birdX, birdY, birdSize, birdSize);
}

function drawBackground (){
    
    painter.fillStyle = "#00FFFF";
    painter.fillRect(0,0,400,300);
    painter.fillStyle = "#000000";
    painter.fillRect(0,300,400,10);
    painter.fillStyle = "#FFC300";
    painter.fillRect(0,310,400,90);
}

function drawPipes () {
    painter.fillStyle= "#098657";
    for (var i = 0; i < pipes.length; ++i){
        // upper rect
        painter.fillRect(pipes[i][0], 0, pipes[i][2], pipes[i][1]);
        // lower rect
        painter.fillRect(pipes[i][0], pipes[i][1]+pipes[i][3], pipes[i][2] , 400-pipes[i][1]-pipes[i][3]);
    }
}

function isXyInRect (x, y, rx, ry, rw, rh) {
    if (x >= rx && x <= rx+rw && y >= ry && y<= ry+rh){
        return true;
    } else {
        return false;
    }
}

function drawGameOver (){
painter.font= "30px Arial";
painter.fillStyle = "#000000";
painter.textBaseline = "top";
painter.textAlign = "center";
painter.fillText('GAME OVER!', 200, 200);
}


function drawScore(){
painter.font= "10px Arial";
painter.fillStyle = "#000000";
painter.textBaseline = "top";
painter.textAlign = "left";
painter.fillText('score:'+ score,10, 10);
}

