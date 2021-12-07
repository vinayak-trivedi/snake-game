const startBtn = document.getElementById("startGame");
const moveUp = document.getElementById("move-up")
const moveDown = document.getElementById("move-down")
const moveRight = document.getElementById("move-right")
const moveLeft = document.getElementById("move-left")
let score = 0;
const scoreDisplay = document.getElementById("score");
const highScore = document.getElementById("highScore")
const gameOver = document.getElementById("game-over")
const btn = document.querySelector(".btn-container")
console.log(btn)

const grid = document.querySelector(".grid");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let interval = 1000;
let speed = 0.9;
let appleIndex = 0;
let intervalId = 0;
let previousScore = 0

// Creating all the squares of our grid
function makeGrid() {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    grid.appendChild(div);
    squares.push(div);
  }
}
makeGrid();

// Initial snake position
currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach(index => squares[index].classList.remove("snake"))
  squares[appleIndex].classList.remove("apple")
  clearInterval(intervalId)
  currentSnake = [2,1,0]
  direction = 1
  interval =1000
  score = 0

  btn.style.display = "block"
  gameOver.style.display = "none"
  scoreDisplay.textContent = score
  generateApples()
  currentSnake.forEach(index => squares[index].classList.add("snake"))
  intervalId = setInterval(move, interval)

}

// moving our snake

function move() {
  // stopping the game when the snake hits any wall.
  if (
    (currentSnake[0] % 10 === 9 && direction === 1) ||
    (currentSnake[0] % 10 === 0 && direction === -1) ||
    (currentSnake[0] - 10 < 0 && direction === -10) ||
    (currentSnake[0] + 10 > 100 && direction === 10) ||
    (squares[currentSnake[0] + direction].classList.contains("snake"))
  ) {
    gameOver.style.display = "block"
    btn.style.display = "none"
    if(score>previousScore) {
      previousScore = score
      highScore.textContent = score
    }
    return clearInterval(intervalId);
  }

  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");

  // Snake eating the apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(intervalId);
    intervalId = setInterval(move, interval * speed);
  }
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();

function controls(e) {
  if (e.key === "ArrowDown") {
    direction = 10;
  } else if (e.key === "ArrowUp") {
    direction = -10;
  } else if (e.key === "ArrowRight") {
    direction = 1;
  } else if (e.key === "ArrowLeft") {
    direction = -1;
  }
}

document.addEventListener("keyup", controls);
startBtn.addEventListener("click", startGame);

moveDown.addEventListener("click",function(){
direction = 10
})
moveUp.addEventListener("click",function() {
  direction = -10
})
moveRight.addEventListener("click",function() {
  direction = 1
})
moveLeft.addEventListener("click",function() {
  direction = -1
})