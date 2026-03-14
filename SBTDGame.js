// SBTDGame.js
// This file contains the JavaScript logic for the game.

// Select the canvas element
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Game variables
const sheep = {
    x: 100,
    y: 500,
    width: 50,
    height: 50,
    color: 'white',
    dx: 0,
    dy: 0,
    speed: 5,
    jumpPower: -15,
    isJumping: false,
    isBlocking: false
};

const gravity = 0.8;

// Draw the sheep
function drawSheep() {
    ctx.fillStyle = sheep.color;
    ctx.fillRect(sheep.x, sheep.y, sheep.width, sheep.height);
}

// Refine the greeting message
function drawGreeting() {
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to Sheep Beets The Dragon!', canvas.width / 2, 100);
    ctx.fillText('Game!', canvas.width / 2, 160);
}

// Update the sheep's position
function updateSheep() {
    // Horizontal movement
    sheep.x += sheep.dx;

    // Vertical movement (gravity)
    if (sheep.isJumping) {
        sheep.dy += gravity;
        sheep.y += sheep.dy;

        // Stop jumping when hitting the ground
        if (sheep.y >= 500) {
            sheep.y = 500;
            sheep.isJumping = false;
            sheep.dy = 0;
        }
    }

    // Prevent going out of bounds
    if (sheep.x < 0) sheep.x = 0;
    if (sheep.x + sheep.width > canvas.width) sheep.x = canvas.width - sheep.width;
}

// Update controls to use WASD for movement
function handleKeyDown(e) {
    switch (e.key) {
        case 'd': // Run right
            sheep.dx = sheep.speed;
            break;
        case 'a': // Run left
            sheep.dx = -sheep.speed;
            break;
        case 'w': // Jump
            if (!sheep.isJumping) {
                sheep.isJumping = true;
                sheep.dy = sheep.jumpPower;
            }
            break;
        case 'z': // Punch
            console.log('SheepBeetsTheDragon Punch!');
            break;
        case 'x': // Kick
            console.log('SheepBeetsTheDragon Kick!');
            break;
        case 'c': // Block
            sheep.isBlocking = true;
            console.log('SheepBeetsTheDragon Block!');
            break;
        case 'v': // Throw
            console.log('SheepBeetsTheDragon Throw!');
            break;
    }
}

function handleKeyUp(e) {
    switch (e.key) {
        case 'd':
        case 'a':
            sheep.dx = 0;
            break;
        case 'c': // Stop blocking
            sheep.isBlocking = false;
            break;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGreeting();
    updateSheep();
    drawSheep();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

gameLoop();