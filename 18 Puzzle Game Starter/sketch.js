// Puzzle Game Starter
// Udaey Sandha
// Nov 6, 2023
// A first foray into working with 2D arrays.

let grid=[[],[],[],[]];

const NUM_ROWS = 4, NUM_COLS = 5;
let rectWidth = 350, rectHeight = 350;
let col,row;  // x and y position of the mouse (grid)
let win, cross = false;

function setup() {
  createCanvas(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
  randomize(grid);
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);
  renderGrid();
  //print(col,row);
  youWin();
  //print (win);
  overlay();
}

function randomize(grid){
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      grid[y][x] = 255*floor(random(2));
    }
  }
}

function mousePressed(){
  if (keyIsPressed && keyCode === SHIFT) flip(col,row);
  else if (cross){
    flip(col,row);
    //if (row>0) flip(col,row-1);
    if (row<NUM_ROWS-1) flip(col,row+1);
    //if (col>0)flip(col-1,row);
    if (col<NUM_COLS-1)flip(col+1,row);
    if (col<NUM_COLS-1 && row<NUM_ROWS-1)flip(col+1,row+1);
  } else {
    flip(col,row);
    if (row>0) flip(col,row-1);
    if (row<NUM_ROWS-1) flip(col,row+1);
    if (col>0)flip(col-1,row);
    if (col<NUM_COLS-1)flip(col+1,row);
  }
}

function keyPressed(){
  if (key === " ") cross = !cross;
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

function youWin(){
  win = false;
  // for (let y = 0; y < NUM_ROWS; y++) {
  //   if (grid[y].indexOf(255) === -1 || grid[y].indexOf(0) === -1) win = true;
  //   else {
  //     win = false;
  //     { break; }
  //   }
  // }
let black = false;
let white = false;
  for (let y = 0; y < NUM_ROWS; y++) {
    if (grid[y].indexOf(255) === -1 && !white) {
      //win = true;
      black=true;
    }
    else if (grid[y].indexOf(0) === -1){
      //win = true;
      
      white = true;
      
    } 
    else {
      black = false;
      white= false;
      break;
    }
  }
 if (black && !white) win = true;
 if (!black && white) win = true;


  stroke(100);
  fill(150);
  textSize(100);
  rectMode(CENTER);
  if (win) text("You Win !", rectWidth * NUM_COLS/2,rectHeight * NUM_ROWS/2, rectWidth,rectHeight);
}

function renderGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      let fillValue = grid[y][x];
      fill (fillValue);
      stroke(150);
      strokeWeight(4);
      rectMode(CORNER);
      rect(x*rectWidth, y*rectHeight,rectWidth,rectHeight);
    }
  }
}
// function overlay(){
//   fill (0,200,0,100);
//   rectMode(CORNER);
//   if (keyIsPressed && keyCode === SHIFT) rect(col*rectWidth, row*rectHeight,rectWidth,rectHeight);
//   else {
//     rect(col*rectWidth, row*rectHeight,rectWidth,rectHeight);
//     if (row>0) rect(col*rectWidth, (row-1)*rectHeight,rectWidth,rectHeight);
//     if (row<NUM_ROWS-1) rect(col*rectWidth, (row+1)*rectHeight,rectWidth,rectHeight);
//     if (col>0)rect((col-1)*rectWidth, row*rectHeight,rectWidth,rectHeight);
//     if (col<NUM_COLS-1)rect((col+1)*rectWidth, row*rectHeight,rectWidth,rectHeight);
//   }
// }

function overlay() {
  fill(0, 200, 0, 100);
  rectMode(CORNER);

  if (keyIsPressed && keyCode === SHIFT) rect(col*rectWidth, row*rectHeight,rectWidth,rectHeight);
  else if(cross){
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (row<NUM_ROWS-1) rect(col*rectWidth, (row+1)*rectHeight,rectWidth,rectHeight);
    //if (col>0)flip(col-1,row);
    if (col<NUM_COLS-1)rect((col+1)*rectWidth, row*rectHeight,rectWidth,rectHeight);
    if (col<NUM_COLS-1 && row<NUM_ROWS-1)rect((col+1)*rectWidth, (row+1)*rectHeight,rectWidth,rectHeight);
  }
  else{
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);

    for (let i = -1; i <= 1; i += 2) {
      rect((col + i) * rectWidth, row * rectHeight, rectWidth, rectHeight);
      rect(col * rectWidth, (row + i) * rectHeight, rectWidth, rectHeight);
    }
  }
}