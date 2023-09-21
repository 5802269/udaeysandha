// // Primitive Paint
// // Udaey Sandha
// // Sept 15, 2023
// let shapeSize=50,shape,overlay;
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   overlay=createGraphics(width,height);
// }
// function draw() {
//   background(210);
//   mouseDraw();
// }
// function mouseDraw() {
//   if (keyIsPressed){
//     if (key === "a" ) shape = rect(mouseX,mouseY,shapeSize*1.618,shapeSize);
//     else if (key === "s" ) shape = ellipse(mouseX,mouseY,shapeSize,shapeSize);
//     else if (key === "d" ) shape = square(mouseX,mouseY,shapeSize);
//   }
//   if (mouseIsPressed) overlay.shape;
//   image(overlay,0,0);
// }
// // function shape1() {
// //   return rect(mouseX,mouseY,shapeSize*1.618,shapeSize);
// // }
// // function shape2() {
// //   return ellipse(mouseX,mouseY,shapeSize,shapeSize);
// // }
// // function shape3() {
// //   return square(mouseX,mouseY,shapeSize);
// //}

let shapeSize=20, overlay, shape="shape1",ballSize=0,shapeColor;
let growing = true,maxSize=400;
let previewCanvas,colorIndex=0;

function cleanSlate(){ 
  overlay.background(220);
  previewCanvas.clear
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay=createGraphics(width,height);
  previewCanvas=createGraphics(width,height);
  textFont("inconsolata",20);
  textAlign(RIGHT,BOTTOM)
  shapeColor=[color("aqua"), color("black"), color("blue"), color("fuchsia"), color("gray"), color("green"), color("lime"), color("maroon"), color("navy"), color("olive"), color("purple"), color("red"), color("silver"), color("teal"), color("white"), color("yellow")]
}

function mouseWheel(event){
  print(event.delta);
  shapeSize += (event.delta/8)*-1;
  shapeSize = constrain(shapeSize, 25, maxSize);
  }

function mouseShape(){
  previewCanvas.background(220)
  
  if (keyIsPressed){
    if (key === "a" ) shape = "shape1";
    if (key === "s" ) shape = "shape2";
    if (key === "d" ) shape = "shape3";
  }

  if (mouseIsPressed){
    if (mouseButton === LEFT) {
      if (shape === "shape1") overlay.rect(mouseX-(shapeSize*1.618)/2,mouseY-shapeSize/2,shapeSize*1.618,shapeSize);
      if (shape === "shape2") overlay.ellipse(mouseX,mouseY,shapeSize,shapeSize);
      if (shape === "shape3") overlay.triangle(mouseX-(shapeSize/2),mouseY+(shapeSize/2),mouseX+(shapeSize/2),mouseY+(shapeSize/2), mouseX,mouseY-(shapeSize/2));
    }
    if (mouseButton === CENTER) {
      colorIndex++;
      if (colorIndex>shapeColor.length-1) colorIndex = 0;
    }
  }
  if (shape === "shape1") previewCanvas.rect(mouseX-(shapeSize*1.618)/2,mouseY-shapeSize/2,shapeSize*1.618,shapeSize);
  if (shape === "shape2") previewCanvas.ellipse(mouseX,mouseY,shapeSize,shapeSize);
  if (shape === "shape3") previewCanvas.triangle(mouseX-(shapeSize/2),mouseY+(shapeSize/2),mouseX+(shapeSize/2),mouseY+(shapeSize/2), mouseX,mouseY-(shapeSize/2));

  // shapeColor=(color("red"));
  overlay.fill(shapeColor[colorIndex])
  previewCanvas.fill(shapeColor[colorIndex])
  image(previewCanvas,0,0)
  image(overlay, 0, 0);
}
function inOutBall(){
  if (growing) {
    ballSize += 2;
  } else {
    ballSize -= 2;
  }
  if (ballSize>maxSize || ballSize < 0) {
    growing = !growing;
  }
  noStroke();
  fill(0,0,255,100);
  circle(width/2,height/2,ballSize);
  circle(width/2,height/2,Math.abs(ballSize-maxSize));
}

function draw() {
  if (keyIsPressed && key === " ") {
    cleanSlate();
  }
  background(220);
  mouseShape();
  ("blue")
  text("Udaey Sandha ",width,height);
  inOutBall();

}
