const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 200,
  y:  400,
  width: 25,
  height: 25,
  color: "blue", 
  speed: 50,
};

let blocks = [];
let gameOver = false;
let score = 0;
let paused = false;
let highScore = 0;

// Create random falling blocks
function spawnBlock() {
  const block = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    color: "red",
    speed: 5 + Math.random() * 2
  };p
  blocks.push(block);
}

// Movement
document.addEventListener("keydown", function (e) {
  
  if(!gameOver){
    if (e.key === "a" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "d" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}
});

// Collision detection
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Update game state
function update() {
  if (gameOver) return;

  for (let block of blocks) {
    block.y += block.speed;
    if (isColliding(player, block)) {
      gameOver = true;
    }
  }

  // Remove blocks off-screen
  blocks = blocks.filter(block => block.y < canvas.height);

  // Spawn a new block every ~40 frames
  if (Math.random() < 0.02) {
    spawnBlock();
  }

  score++;
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw blocks
  for (let block of blocks) {
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.width, block.height);
  }

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
  ctx.fillText("High Score: " + highScore, 10, 60);

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 150, 300);
  }
}



// Game loop
function loop() {
  update();
  draw();
  if (!gameOver) {
    requestAnimationFrame(loop);
  }
}



//resets game
function resetGame() {

    if (score > highScore) {
    highScore = score;
  }

    console.log("Final Score:", score, "High Score:", highScore);

    player.x = 200;
    player.y = 425;
    blocks = [];
    console.log("Final Score:", score, "High Score:", highScore);
    score = 0;
    gameOver = false;
    loop();

}
//designate  key to restart game/pause game
document.addEventListener("keydown", function(event){
    const key = event.key.toLowerCase();
    if (key === "w") {
        resetGame();
    }
    if(key==="p"){
        paused = !paused;
    }
});

function loop(){
    if (!paused && !gameOver) {
    update();
    draw();
  }

    if (!gameOver) {
    requestAnimationFrame(loop);
  }
}
loop();
