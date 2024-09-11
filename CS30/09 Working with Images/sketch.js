// Working with Images
// Udaey Sandha
// October 10, 2023
// Working with images in variables and arrays

//Global Variables

let lionL, lionR;  //store Image object in each
let facingLeft = true;
let pinImages = [];
let pinIndex = 0;

function preload() {
  //happens before setup(). Waits for loading to finish
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for (let i = 0; i < 9; i++) {
    pinImages.push(loadImage("assets/pin-0" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // load picture here. NONOONONONN
  //more code
}

function draw() {
  background(220);
  //drawLion();
  drawPin();

}

function drawLion() {
  //draw the lion in direction mouse moves
  if (movedX < 0) facingLeft = true;
  else if (movedX > 0) facingLeft = false;

  if (facingLeft) image(lionL, mouseX, mouseY, lionL.width * 0.6, lionL.height * 0.6);
  else image(lionR, mouseX, mouseY)
}

function drawPin() {
  //animate our pinwheel Images
  image(pinImages[pinIndex], width / 2, height / 2, pinImages[pinIndex].width, pinImages[pinIndex].height);
  if (frameCount % 2 === 0) {
    pinIndex++;
  }

  if (pinIndex === 9) pinIndex = 0;
}