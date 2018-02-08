// Breakout First Line of Code Canvas variables 
var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius=10;

//
var x=canvas.width/2;
var y=canvas.height-30;

// Values that add small value to x and y to make the ball move 
var dx=4;
var dy=-4;

// Paddle Definition variables
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;

// Arrow Key Definitons
var rightPressed= false;
var leftPressed=false;

// Brick variable definitions 
var brickRowCount = 6;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 35;
var brickOffsetLeft = 50;

// Lives and Score Board Variables to call 
var score = 0;
var lives = 3; 

// Event listener For Paddle Movement 
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Key Down Listener
function keyDownHandler(e){
	if(e.keyCode==39){
		
		rightPressed=true;
		
		}
		else if(e.keyCode==37){
		
		leftPressed=true;
		
		}
		
	}
// Key Up Listener 	
function keyUpHandler(e){
	
	if(e.keyCode==39){
		
		rightPressed=false;
	}
	else if(e.keyCode==37){
		
		leftPressed=false;
		
		}
    }
// Mouse movement Listener    
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

// Draw Ball Function
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillstyle="#0033FF";
	ctx.fillStroke="#0033FF";
	ctx.Stroke="10"
	ctx.fill();
	ctx.closePath();
	}

// Draw Paddle Function     
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillstyle="#0095DD";
	ctx.fill();
	ctx.closePath();
    }

// Draw Bricks Function 
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Collision Detection Function 
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Score and Lives Counters
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
///////////////////////////////////// 
// Draw function
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

// Collision Detection
 if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
// Paddle and Ball Collision Detection 
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

// Paddle Moving Logic 
	if(rightPressed && paddleX<canvas.width-paddleWidth){
		
		paddleX+=7;
		}
	 else if(leftPressed && paddleX>0 ){
		 paddleX-=7;
		 
		 }
		 
		 x=x+dx;
         y=y+dy;
         requestAnimationFrame(draw);
	}

draw();