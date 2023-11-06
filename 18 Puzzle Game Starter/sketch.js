// Puzzle Game Starter
// Udaey Sandha
// Nov 6, 2023
// A first foray into working with 2D arrays.

let grid = [
  [0, 255, 0, 255, 255],
  [255, 255, 0, 255, 255],
  [255, 255, 255, 0, 255],
  [0, 0, 0, 255, 0]
];

const NUM_ROWS = 4, NUM_COLS = 5;
let rectWidth = 500, rectHeight = 500;

function setup() {
  createCanvas(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
}

function draw() {
  background(220);
  renderGrid();
  print(int(mouseX/rectWidth));
}

function getCurrentX(){
  let constrainX = constrain(mouseX,0,width);
  return int(constrainX/rectWidth);
}

function getCurrentY(){
  let constrainY = constrain(mouseY,0,height);
  return int(constrainY/rectHeight);
}

function renderGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      let fillValue = grid[y][x];
      fill (fillValue);
      rect(x*rectWidth, y*rectHeight,rectWidth,rectHeight);
    }
  }
}