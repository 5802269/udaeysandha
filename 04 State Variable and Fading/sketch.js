// State Variable and Fading
// Udaey Sandha
// Sept 22, 2023
// A look at state variables and a fading effects
let mouseSide,fillValue = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  updateMouseState();
}

function renderSquares(){
  //draw rectangles on the screen
  if (mouseSide==="left") fill(0);
  else fill(255);
  rect(0,0,width/2,height);  //left rect
  
  if (mouseSide==="right") fillValue=0;
  else {
    fillValue += 3;
  }
  fillValue = constrain(fillValue,0,255);
  fill(fillValue);
  
  rect(width/2,0,width/2,height);  //rigth rect
}

function updateMouseState(){
  if (mouseX>=width/2) mouseSide="right";
  else mouseSide="left";
  print (mouseSide);
}

function draw() {
  background(220);
  updateMouseState();
  renderSquares();
}
