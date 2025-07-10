// const and variable
inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../bg.jpg/eating-chips-81092.mp3");
const gameOverSound = new Audio("../bg.jpg/crash-snake-16-47956.mp3");
const moveSound = new Audio("../bg.jpg/mixkit-attention-bell-ding-586.wav");
const musicSound = new Audio("../bg.jpg/snakeecho-78798.mp3");
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
localStorage.setItem('highscore',score)

// Game fuctionsss
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump in yourself//
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If you bump into the wall//
  if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
    return true;
  }
}

function gameEngine() {
  // Part1 updating the snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over.. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    let highscore = localStorage.getItem('highscore') 
    if (score > highscore) {
      localStorage.setItem('highscore', score)
      document.getElementById('highscoreBox').innerHTML = + score
    }
    score = 0
    document.getElementById('scoreBox').innerHTML = score
  }

  // If you have eat the food than increament the score or regenerate the food....
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    document.getElementById('scoreBox').innerHTML = score


    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake//
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part2 Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// game logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
  highscoreval = 0;
  // localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
  highscoreval = JSON.parse(highscore);
  // highscoreBox.innerHTML = "HighScore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // inputDir = { x: 0, y: 1 }; //Start the game
  // moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
