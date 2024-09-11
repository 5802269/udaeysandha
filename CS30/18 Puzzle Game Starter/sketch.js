// Puzzle Game Starter
// Udaey Sandha
// Nov 6, 2023
// A first foray into working with 2D arrays.

// Global variabes
let grid = [[], [], [], []];  // defining an array to store color for each rect

const NUM_ROWS = 4, NUM_COLS = 5;  // number of rows and cols
let rectWidth = 150, rectHeight = 150;  // rect size
let col, row;  // x and y position of the mouse (grid)
let win, cross = false;  // win → won or not , cross → cross pattern 

function setup() {
  createCanvas(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
  randomize(grid);  // fill the grid with random colors
}

function draw() {
  col = getCurrentX();  // current col
  row = getCurrentY();  //current row

  background(220);

  renderGrid();  // drawing the grid
  youWin();  // did you win?
  overlay();  // overlay to indicate which rectangles will be impacted on a click.
}

function randomize(grid) {
  // filling grid with random colors black or white
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      grid[y][x] = 255 * floor(random(2));
    }
  }
}

function mousePressed() {
  // fliping the color if mouse is pressed
  if (keyIsPressed && keyCode === SHIFT) flip(col, row);  // if shift is pressed only the main rect changes color
  else if (cross) { // if cross is true, the color flip happens in a box
    flip(col, row);
    if (row < NUM_ROWS - 1) flip(col, row + 1);
    if (col < NUM_COLS - 1) flip(col + 1, row);
    if (col < NUM_COLS - 1 && row < NUM_ROWS - 1) flip(col + 1, row + 1);
  } else {
    flip(col, row);  // if cross is false, the color flip happens in a cross
    if (row > 0) flip(col, row - 1);
    if (row < NUM_ROWS - 1) flip(col, row + 1);
    if (col > 0) flip(col - 1, row);
    if (col < NUM_COLS - 1) flip(col + 1, row);
  }
}

function keyPressed() {
  // changes the shape from cross to box or visa versa
  if (key === " ") cross = !cross;
}

function flip(x, y) {
  // changing the color of the rect   black → white
  //                                  white → black
  if (grid[y][x] === 255) grid[y][x] = 0;
  else grid[y][x] = 255;
}

function getCurrentX() {
  // gets the current col
  let constrainX = constrain(mouseX, 0, width - 1);
  return int(constrainX / rectWidth);
}

function getCurrentY() {
  // gets the current row
  let constrainY = constrain(mouseY, 0, height - 1);
  return int(constrainY / rectHeight);
}

function youWin() {
  // determins if you won
  win = false;
  let black = false;
  let white = false;

  for (let y = 0; y < NUM_ROWS; y++) {
    if (grid[y].indexOf(255) === -1 && !white) {
      black = true;
    }
    else if (grid[y].indexOf(0) === -1) {
      white = true;
    }
    else {
      black = false;
      white = false;
      break;
    }
  }
  if (black && !white) win = true;
  if (!black && white) win = true;

  //  printing win statement
  stroke(100);
  fill(150);
  textSize(rectWidth / 4);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  if (win) text("You Win!", width / 2, height / 2);
}

function renderGrid() {
  // draws the grid
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      let fillValue = grid[y][x];
      fill(fillValue);
      stroke(150);
      strokeWeight(4);
      rectMode(CORNER);
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}

function overlay() {
  // indicates which rectangles will be impacted on a click.
  fill(0, 200, 0, 100);
  rectMode(CORNER);

  if (keyIsPressed && keyCode === SHIFT) rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
  else if (cross) {
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (row < NUM_ROWS - 1) rect(col * rectWidth, (row + 1) * rectHeight, rectWidth, rectHeight);
    if (col < NUM_COLS - 1) rect((col + 1) * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (col < NUM_COLS - 1 && row < NUM_ROWS - 1) rect((col + 1) * rectWidth, (row + 1) * rectHeight, rectWidth, rectHeight);
  }
  else {
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);

    for (let i = -1; i <= 1; i += 2) {
      rect((col + i) * rectWidth, row * rectHeight, rectWidth, rectHeight);
      rect(col * rectWidth, (row + i) * rectHeight, rectWidth, rectHeight);
    }
  }
}