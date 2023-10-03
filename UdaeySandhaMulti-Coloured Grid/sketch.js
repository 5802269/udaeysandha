// Multi-Coloured Grid
// Udaey Sandha
// Sept 28, 2023

// Global Variables
let squareSize = 40, colorR, colorG , colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawGrid(){
  for (let x = 0; x<width;x+=squareSize){
    for (let y =0; y<height;y+=squareSize){
      square(x,y,squareSize);
    }
  }
}

function mousePressed(){
 
}
/// 

function draw() {
  background(220);
  drawGrid();
}
