// Repositioning Rectangles
// Udaey Sandha
// Sept 27, 2023
// Simple GUI creation / Geometry practice

// Global Variables
let x,y,rWidth,rHeight,rLeft,rRight,rTop,rBottom,mouseOver=false;
let pickedUp = false;
let xOffSet,yOffSet;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x=width/2, y=height/2;
  rWidth=200, rHeight=100;
}

function updateEdgePosition(){
  rLeft=x-rWidth/2;
  rRight=x+rWidth/2;
  rTop=y-rHeight/2;
  rBottom=y+rHeight/2;
}

function drawRectangle(){
  updateEdgePosition();
  if (mouseX>rLeft && mouseX<rRight && mouseY>rTop && mouseY<rBottom) mouseOver=true, fill(170,190,50); 
  else mouseOver=false, fill(35,70,125);
  rect(x,y,rWidth,rHeight);
  if (pickedUp){
    x = mouseX+xOffSet;
    y = mouseY+yOffSet;
  }
}

function mousePressed(){
  if (mouseOver) {
    pickedUp=true;
    xOffSet=x-mouseX;
    yOffSet=y-mouseY;
  }
}

function mouseReleased(){
  pickedUp=false;
}

function draw() {
  background(220);
  drawRectangle();
}
