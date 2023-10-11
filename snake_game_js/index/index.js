let snake = document.getElementsByClassName("snake");
let snake_body = document.getElementById("snake-body");
let food = document.getElementById("food");
let speed_level = document.querySelectorAll(".speed-level");
let score = document.getElementById("score");
let btn_start = document.getElementById("start");
let start_background = document.getElementById("start-background");
let background = document.getElementById("background");
let food_y = 0;
let food_x = 0;
const color = "#019201";
const scolor = "#777777";
let index_level = 1;
let score_var = 0;
let startGame;

// snake var
let position = [];
let x = 100,
  x_diriction = 1;
let y = 100,
  y_diriction = 0;
let speed = 10;
// ###########
let isNotStart = true; //to don't change the levels when you play

let save_score = localStorage.length !== 0 ? localStorage.getItem("score") : 0;
score.innerText = save_score;

function tenNumbers(x, y) {
  if (x % 10 !== 0) {
    x = x + 10 - (x % 10);
  }
  if (y % 10 !== 0) {
    y = y + 10 - (y % 10);
  }
  return [x, y];
}

// start game
btn_start.addEventListener("click", () => {
  randomPositionOfFood();
  position = [];
  snake_body.innerHTML = ""; //to make snake body empty
  let num = Math.floor(Math.random() * 371);
  [x, y] = tenNumbers(num, num);
  createBodyOfSnake(x, x);
  background.style.width = "400px";
  background.style.height = "400px";
  background.style.overflow = "visible";
  start_background.style.width = "0px";
  btn_start.style.left = "-1000px";
  isNotStart = false;
  console.log(isNotStart);
  setTimeout(() => {
    startGame = setInterval(moveSnake, 600 - index_level * 100);
  }, 1000);
});

// ########
speed_level.forEach((e, index) => {
  e.addEventListener("click", () => {
    index_level = index + 1;
    if (isNotStart) {
      for (let i = 0; i < speed_level.length; i++) {
        i <= index
          ? (speed_level[i].style.backgroundColor = color)
          : (speed_level[i].style.backgroundColor = scolor);
      }
    }
  });
});
// #####

function randomPositionOfFood() {
  food_x = Math.floor(Math.random() * 371);
  food_y = Math.floor(Math.random() * 371);
  [food_x, food_y] = tenNumbers(food_x, food_y);
  food.style.top = food_x + "px";
  food.style.left = food_y + "px";
}

function createBodyOfSnake(x, y) {
  let body = document.createElement("div");
  body.className = "snake";
  body.style.top = y + "px";
  body.style.left = x + "px";
  snake_body.appendChild(body);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && y_diriction === 0) {
    y_diriction = -1;
    x_diriction = 0;
  }
  if (e.key === "ArrowDown" && y_diriction === 0) {
    y_diriction = 1;
    x_diriction = 0;
  }
  if (e.key === "ArrowLeft" && x_diriction === 0) {
    y_diriction = 0;
    x_diriction = -1;
  }
  if (e.key === "ArrowRight" && x_diriction === 0) {
    y_diriction = 0;
    x_diriction = 1;
  }
});

function eatFood(x, y, food_x, food_y) {
  if (x === food_y && y === food_x) {
    randomPositionOfFood();
    createBodyOfSnake(x, y);
    position.unshift([x, y]);
    score_var++;
    score.innerText = score_var;
  }
}

function gameOver(x, y) {
  if (x > 371 || y > 371 || x < 0 || y < 0) {
    if (score_var > save_score) {
      localStorage.setItem("score", score_var);
    }
    start_background.style.width = "100%";
    btn_start.style.left = "50%";
    isNotStart = true;
    clearInterval(startGame, 10);
  }
}

function moveSnake() {
  x += speed * x_diriction;
  y += speed * y_diriction;
  position.unshift([x, y]);
  for (let i = 0; i < position.length; i++) {
    snake[i].style.top = position[i][1] + "px";
    snake[i].style.left = position[i][0] + "px";
    eatFood(position[i][0], position[i][1], food_x, food_y);
  }
  gameOver(x, y);
  position.pop();
}
