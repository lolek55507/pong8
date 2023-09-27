window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const ball = document.getElementById('ball');
    const canvasWidth = 1000;
    const canvasHeight = 600;
    const playerWidth = 4;
    const playerHeight = 100;
    const ballWidth = 50;
    const ballHeight = 50;
    const body = document.querySelector("body");
    const heartImage = document.getElementById('heart');
    const pongSound = document.getElementById('pongSound');
    let ballCoordsY = canvasHeight / 2 ;
    let ballCoordsX = canvasWidth / 2 - 25;
    let leftCoorsY = 300;
    let rightCoorsY = 300;
    let ballMovingState = "toRight";
    let movingBallInterval;
    let ballSpeed = 5;
    let score = 0;
    let health = 3;
    let gameState = "Paused";
    const playerSpeed = 5;
    window.addEventListener('keydown', (e) => {
        if (e.key === "w" && leftCoorsY > 0) {
            leftCoorsY -= playerSpeed;
            console.log(leftCoorsY);
        } else if (e.key === "s" && leftCoorsY < 500) {
            leftCoorsY += playerSpeed;
            console.log(leftCoorsY);
        }

        if (e.key === "ArrowUp"  && rightCoorsY > 0) {
            rightCoorsY -= playerSpeed;
        } else if (e.key === "ArrowDown" && rightCoorsY < 500) {
            rightCoorsY += playerSpeed;
        }

        if (e.key === "Escape" && gameState === "Resumed") {
            gameState = "Paused";

        }
    })


    window.addEventListener('mousemove', (e) => {
        if (e.clientX > canvasWidth/3 && e.clientX < canvasWidth/3.5 + 450 && e.clientY > canvasHeight/3 && e.clientY < canvasHeight/3 + 250 && gameState == "GameOver") {
            console.log("here");
            body.style.cursor = "pointer";
        } else {
            body.style.cursor = "pointer";
        }
        window.addEventListener('click', (e) => {
            if (e.clientX > canvasWidth/3 && e.clientX < canvasWidth/3.5 + 450 && e.clientY > canvasHeight/3 && e.clientY < canvasHeight/3 + 250 && gameState == "GameOver") {
                console.log("clicked");
                health = 3;
                gameState = "Resumed";
                score = 0;
                ballSpeed = 5;
            } else {

            }

            if (e.clientX > canvasWidth/3 && e.clientX < canvasWidth/3.5 + 450 && e.clientY > canvasHeight/3 && e.clientY < canvasHeight/3 + 250 && gameState == "Paused") {
                console.log("clicked");
                health = 3;
                gameState = "Resumed";
            } else {
                
            }


            if (e.clientX > canvasWidth/3 && e.clientX < canvasWidth/3.5 + 450 && e.clientY > canvasHeight/3 && e.clientY < canvasHeight/3 + 250 && gameState == "Paused") {
                console.log("here");
                body.style.cursor = "pointer";
            } else {
                body.style.cursor = "pointer";
            }
        
        }); 
    });


    function moveTheball () {
        if (gameState == "Resumed") {
            if (ballMovingState === "toLeft") {
                ballCoordsX -= ballSpeed;
                ballSpeed += 0.1;
    
            }
            if (ballMovingState === "toRight") {
                ballCoordsX += ballSpeed;
                ballSpeed += 0.1;
            }
            if (ballMovingState === "toRightUp") {
                ballCoordsX +=ballSpeed;
                ballCoordsY -=ballSpeed;
                ballSpeed += 0.1;
            }
            if (ballMovingState === "toRightDown") {
                ballCoordsX +=ballSpeed;
                ballCoordsY +=ballSpeed;
                ballSpeed += 0.1;
            } 
            if (ballMovingState === "toLeftDown") {
                ballCoordsX -=ballSpeed;
                ballCoordsY +=ballSpeed;
                ballSpeed += 0.1;
            }
            if (ballMovingState === "toLeftUp") {
                ballCoordsX -=ballSpeed;
                ballCoordsY -=ballSpeed;
                ballSpeed += 0.1;
            }
            collisionChecker();
        }
        
    }
    function collisionChecker() {
        if (ballCoordsX < 20 + playerWidth && ballCoordsY >= leftCoorsY - ballHeight  && ballCoordsY  < leftCoorsY + (playerHeight * 0.5)) {
            ballMovingState = "toRightDown";
            score++;
            pongSound.play();
        }  else if (ballCoordsX < 20 + playerWidth && ballCoordsY <= leftCoorsY + playerHeight  && ballCoordsY > leftCoorsY + (playerHeight * 0.5) ) {
            ballMovingState = "toRightUp";
            score++;
            pongSound.play();
        }    else if (ballCoordsX + ballWidth > 970 - playerWidth && ballCoordsY >= rightCoorsY - ballHeight  && ballCoordsY  < rightCoorsY + (playerHeight * 0.5)) {
            ballMovingState = "toLeftDown";
            score++;
            pongSound.play();
        } else if (ballCoordsX + ballWidth > 970 - playerWidth && ballCoordsY <= rightCoorsY + playerHeight && ballCoordsY > rightCoorsY + (playerHeight * 0.5) ) {
            ballMovingState = "toLeftUp";
            score++;
            pongSound.play();
        } 




        
        if (ballCoordsX < 0) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
        } else if (ballCoordsX > canvasWidth) {
            health--;
            ballCoordsX = canvasWidth / 2 - 25;
        }   else if (ballCoordsY <= 0 && ballMovingState === "toRightUp") {
            ballMovingState = "toRightDown";
            pongSound.play();
        } else if (ballCoordsY >= canvasHeight - ballHeight && ballMovingState === "toRightDown") {
            ballMovingState = "toRightUp";
            pongSound.play();
        } else if (ballCoordsY <= 0 && ballMovingState === "toLeftUp") {
            ballMovingState = "toLeftDown";
            pongSound.play();
        } else if (ballCoordsY >= canvasHeight - ballHeight && ballMovingState === "toLeftDown") {
            ballMovingState = "toLeftUp";
            pongSound.play();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Game state Resumed
        if (gameState === "Resumed") {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Score: ", 10, 40);
            ctx.fillText("Health: ", 10, 70);
            if (health == 3) { 
            ctx.drawImage(heartImage, 110, 48, 30, 30);
            ctx.drawImage(heartImage, 140, 48, 30, 30);
            ctx.drawImage(heartImage, 170, 48, 30, 30);
            }   else if (health == 2) {
            ctx.drawImage(heartImage, 110, 48, 30, 30);
            ctx.drawImage(heartImage, 140, 48, 30, 30);
            }   else if (health == 1) {
                ctx.drawImage(heartImage, 110, 48, 30, 30);
            } else if (health == 0) {
                gameState = "GameOver";
            }
        ctx.fillText(score, 100, 42);
        ctx.fillRect(20, leftCoorsY, playerWidth, playerHeight);
        ctx.fillRect(970, rightCoorsY, playerWidth, playerHeight);
        ctx.fillRect(canvasWidth/2, 50, 1, 500);
        ctx.drawImage(ball, ballCoordsX, ballCoordsY, ballWidth, ballHeight);
        }  
        // Game state GameOver
        else if (gameState === "GameOver") {
            ctx.fillStyle = "white";
            ctx.fillRect(canvasWidth/3.5, canvasHeight/3, 400, 200);
            ctx.fillStyle = "black";
            ctx.fillRect(canvasWidth/3.45, canvasHeight/2.9, 390, 190);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("PLAY AGAIN", canvasWidth/2.5, canvasHeight/2);
        } 
        // Game state Paused
        else if (gameState === "Paused") {
            ctx.fillStyle = "white";
            ctx.fillRect(canvasWidth/3.5, canvasHeight/3, 400, 200);
            ctx.fillStyle = "black";
            ctx.fillRect(canvasWidth/3.45, canvasHeight/2.9, 390, 190);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("RESUME THE GAME", canvasWidth/3, canvasHeight/2);
        }
        
        requestAnimationFrame(animate);
    }
    animate();
    movingBallInterval = setInterval(moveTheball, 120);
})