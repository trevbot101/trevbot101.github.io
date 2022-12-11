var painter = document.getElementById("c").getContext("2d");
var button = document.getElementById("b");
var x = 50;
var y = 360;
var dinoSize = 19;
var g = 0.5;
var dy = 10;
var dx = 2;
var jump = -10;
var isleft = false;
var isright = false;
var isup = false;
var allowjump = false;
var bush_dx = -2;
var cloud_dx = -2;
var coin_dx = -2;
var bushes = [[150, 100, 20, 230],[300, 100, 20, 230],[400, 100, 20, 230]];
var clouds = [[100, 45, 50, 40], [250, 40, 30, 50], [390, 50, 40, 50]];
var coin = [[150, 285, 20, 20]];
var timer;
var score = 0;
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
button.addEventListener("click", onClick);

drawBackground();
drawSquare(x, y);


function onKeyUp(e) {
   
  if (e.key === "ArrowUp") {
        isup = false;
    } 
    
}


function onKeyDown(e) {
  if (e.key === "ArrowUp") {
        isup = true;
}
}


function onClick(){
    timer = setInterval(onTick, 20);

    
  
    
}
 function onTick(){
    if(isup && allowjump) {
        dy += jump;
        allowjump = false;
    }
    if (isOver()){
        drawGameOver ();
        clearInterval(timer);
        return;
    }
    drawBackground();
    drawSquare(x, y);
    drawBushes();
    moveBushes();
    drawScore();
    drawClouds();
    moveClouds();
    drawCoin();
    moveCoin();
    updateScore();
   dy += g;
    y += dy;

    if (y>360) {
        y = 360;
        dy = 0;
        allowjump = true;
    }
}

function drawSquare(x, y) {
    painter.fillStyle = "#FF0000";
    if(x < 0 && x > -20) {
    painter.fillRect(0, y, 20+x, 20);
    painter.fillRect(400+x, y, -x, 20);
    }
    if(x > 380 && x < 400) {
    painter.fillRect(x, y, 400-x, 20);
    painter.fillRect(0, y, 20+x-400, 20);
    }
    
    painter.fillRect(x, y, 20, 20);
}



function drawBackground() {
    painter.fillStyle = "#7ff5fe";
    painter.fillRect(0, 0, 400, 380);

    painter.fillStyle = "#5f2704";
    painter.fillRect(0, 380, 400, 20);

    painter.fillStyle = "#4ede09";
    painter.fillRect(0, 380, 400, 5);
}

function drawBushes () {
    painter.fillStyle= "#098657";
    for (var i = 0; i < bushes.length; ++i){
        painter.fillRect(bushes[i][0], bushes[i][1]+bushes[i][3], bushes[i][2] , 400-bushes[i][1]-bushes[i][3]);
    }
}

function moveBushes () {
    for (var i = 0; i < bushes.length; ++i){
        bushes[i][0] += bush_dx;
        if (bushes[i][0] < 0- bushes[i][2]){
            bushes[i][0]=400 + Math.random()*(50-10)+10;
            
        }
    }
    
}

function drawClouds () {
    painter.fillStyle= "#FFFFFF";
    for (var i = 0; i < clouds.length; ++i){
        painter.fillRect(clouds[i][0], clouds[i][1], clouds[i][2] ,clouds[i][3]);
        painter.fillRect(clouds[i][0]+10, clouds[i][1], clouds[i][2] ,clouds[i][3]/2);
        painter.fillRect(clouds[i][0]-10, clouds[i][1], clouds[i][2] ,clouds[i][3]/2);
    }
}

function moveClouds () {
    for (var i = 0; i < clouds.length; ++i){
        clouds[i][0] += cloud_dx;
        if (clouds[i][0] < 0- clouds[i][2]){
            clouds[i][0]=400 + Math.random()*(50-10)+10;
        }
    }
    
}

function drawCoin () {
    painter.fillStyle= "#fbd92d";
    for (var i = 0; i < coin.length; ++i){
        painter.fillRect(coin[i][0], coin[i][1], coin[i][2] ,coin[i][3]);
    }
}

function moveCoin () {
    for (var i = 0; i < coin.length; ++i){
        coin[i][0] += coin_dx;
        if (coin[i][0] < 0- coin[i][2] || coin[i][2]<1){
            coin[i][0]=400 + Math.random()*(50-10)+10;
            coin[i][2] = 20;
            coin[i][3] = 20;
        }
    }
    
}

function isOver () {
    for (var i = 0; i < bushes.length; ++i){
      if (isXyInRect(x, y+dinoSize, bushes[i][0], bushes[i][1]+bushes[i][3], bushes[i][2] , 400-bushes[i][1]-bushes[i][3]) ||
        isXyInRect(x+dinoSize, y+dinoSize, bushes[i][0], bushes[i][1]+bushes[i][3], bushes[i][2] , 400-bushes[i][1]-bushes[i][3])){
            return true;
        }
}
}

function updateScore () {
    for (var i = 0; i < coin.length; ++i){
        var coins = coin[i];
      if (isXyInRect(x, y+dinoSize, coins[0], coins[1], coins[2] ,coins[3]) ||
        isXyInRect(x+dinoSize, y+dinoSize, coins[0], coins[1], coins[2], coins[3]) ||
        isXyInRect(x+dinoSize, y, coins[0], coins[1], coins[2] ,coins[3])){
        score++;
        coins[2] = 0;
        coins[3] = 0;
        }
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
    painter.font= "50px Arial";
    painter.fillStyle = "#000000";
    painter.textBaseline = "top";
    painter.textAlign = "center";
    painter.fillText('GAME OVER!', 200, 200);
    }
    
function drawScore(){
        painter.font= "20px Arial";
        painter.fillStyle = "#000000";
        painter.textBaseline = "top";
        painter.textAlign = "left";
        painter.fillText('Coins: '+ score,10, 10);
        }
        