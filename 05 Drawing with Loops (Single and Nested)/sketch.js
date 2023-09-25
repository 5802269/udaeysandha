// Drawing with Single and Nested Loops
// Udaey Sandha
// Sept 25, 2023
// Generating a single image with loopps

//Global Variables
let numSegments=50;
let segmentHeight;  //height/numSegments.
const GRID_SPACING = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  segmentHeight = height/numSegments;
}

function a(){
  for (let i=0; i<height; i++) {
    fill(255/height*i);
    noStroke();
    rect(0,i,width,height);
  }
}

function gradient(){
  // use a loop to create a gradient background
  noStroke();
  for (let i = 0; i < numSegments;i++) { 
    let y = i * segmentHeight;
    let fillValue = map(y,0,height,0,255);
    fill(fillValue,255-fillValue,20);
    rect(0,y,width,segmentHeight);
  }
}

function drawGrid(){
  //draw some elements using nested loops
  for (let x=0; x<width; x+=GRID_SPACING) {
    for (let y=0;y<height;y+=GRID_SPACING) {
      if(dist(x,y,mouseX,mouseY)< 50) fill(255,0,0);
      else fill(0);
     
      circle(x,y,10);
    }
  }
}

function draw() {
  background(220);
  a();
  gradient();
  drawGrid();
}
