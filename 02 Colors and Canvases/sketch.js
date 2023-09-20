// Colors and Canvases
// Udaey
// Sept 13, 2023
//Playing around with colors and layers

//Global Variable
let ballX, xSpeed=5, ballSize=30, overlay, colorA, colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay=createGraphics(width,height);
  ballX=width/2;
  colorA = color(200,100,0);
  colorB = color("yellow");
}

function mouseRectangle(){
  if (mouseIsPressed){
    overlay.rect(mouseX, mouseY, 50, 25);
  }
  if (keyIsPressed){
    if(key==="a") overlay.fill(colorA);
    if(key==="b") overlay.fill(colorB);
  }
  image(overlay, 0, 0);
}
function draw() {
  background(220);
  drawAndMoveBall();
  mouseRectangle();
}
function drawAndMoveBall(){
  ballX = ballX + xSpeed;
  if (ballX+ballSize/2 >= width || ballX-ballSize/2 <= 0) {
    xSpeed *=-1;
  }
  fill(0);
  circle(ballX, height/2, ballSize);

}