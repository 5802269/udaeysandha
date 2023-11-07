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
let col,row;  // x and y position of the mouse (grid)

function setup() {
  createCanvas(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);
  renderGrid();
  print(col,row);
}

function mousePressed(){
  flip(col,row);
  if (row>0) flip(col,row-1);
  if (row<NUM_ROWS-1) flip(col,row+1);
  if (col>0)flip(col-1,row);
  if (col<NUM_COLS-1)flip(col+1,row);
}

function flip(x,y){
  if (grid[y][x] === 255) grid[y][x] = 0;
  else grid[y][x] = 255;
}

function getCurrentX(){
  let constrainX = constrain(mouseX,0,width-1);
  return int(constrainX/rectWidth);
}

function getCurrentY(){
  let constrainY = constrain(mouseY,0,height-1);
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