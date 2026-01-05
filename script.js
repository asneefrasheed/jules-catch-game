const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');

let score = 0;
let playerPosition = 175; // Initial left position
const containerWidth = 400;
const playerWidth = 50;
const playerSpeed = 20;
const objectSpeedBase = 2;
let currentObjectSpeed = objectSpeedBase;
let spawnInterval = 1000;
let gameInterval;
let spawnTimer;

// Handle player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        playerPosition -= playerSpeed;
        if (playerPosition < 0) playerPosition = 0;
    } else if (event.key === 'ArrowRight') {
        playerPosition += playerSpeed;
        if (playerPosition > containerWidth - playerWidth) playerPosition = containerWidth - playerWidth;
    }
    player.style.left = `${playerPosition}px`;
});

function createObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = `${Math.random() * (containerWidth - 20)}px`;
    object.style.top = '-20px';
    gameContainer.appendChild(object);

    let objectY = -20;

    // Move object
    const moveInterval = setInterval(() => {
        objectY += currentObjectSpeed;
        object.style.top = `${objectY}px`;

        // Check collision
        if (objectY + 20 >= 580 && objectY <= 600) { // Player is at bottom: 600 - 20 height = 580
            // Check horizontal overlap
            const objectX = parseFloat(object.style.left);
            if (objectX + 20 > playerPosition && objectX < playerPosition + playerWidth) {
                // Caught!
                score++;
                scoreElement.textContent = score;
                increaseDifficulty();
                clearInterval(moveInterval);
                object.remove();
                return;
            }
        }

        // Remove if off screen
        if (objectY > 600) {
            clearInterval(moveInterval);
            object.remove();
        }
    }, 20);
}

function increaseDifficulty() {
    // Increase speed every 5 points
    if (score % 5 === 0) {
        currentObjectSpeed += 0.5;
        // Decrease spawn interval slightly
        clearInterval(spawnTimer);
        spawnInterval = Math.max(200, spawnInterval - 50);
        spawnTimer = setInterval(createObject, spawnInterval);
    }
}

// Start game
function startGame() {
    spawnTimer = setInterval(createObject, spawnInterval);
}

startGame();
