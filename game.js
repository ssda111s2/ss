const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game elements
const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

// Player paddle
let playerY = (canvas.height - paddleHeight) / 2;
let playerSpeed = 4;

// AI paddle
let aiY = (canvas.height - paddleHeight) / 2;
let aiSpeed = 3;

// Ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Controls
let upPressed = false, downPressed = false;

// Event listeners for controls
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key == "Up" || event.key == "ArrowUp") {
        upPressed = true;
    } else if (event.key == "Down" || event.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key == "Up" || event.key == "ArrowUp") {
        upPressed = false;
    } else if (event.key == "Down" || event.key == "ArrowDown") {
        downPressed = false;
    }
}

// Update game logic
function update() {
    // Move paddles
    if (upPressed && playerY > 0) {
        playerY -= playerSpeed;
    } else if (downPressed && playerY < canvas.height - paddleHeight) {
        playerY += playerSpeed;
    }

    // AI logic to move the paddle
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += aiSpeed;
    } else if (aiY + paddleHeight / 2 > ballY) {
        aiY -= aiSpeed;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight || 
        ballX + ballRadius >= canvas.width - paddleWidth && ballY >= aiY && ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    // Draw everything
    draw();
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = "#fff";

    // Draw player paddle
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);

    // Draw AI paddle
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
