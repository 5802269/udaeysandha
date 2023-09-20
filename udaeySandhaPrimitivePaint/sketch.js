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

let shapeSize=50, overlay, shape="shape1";

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay=createGraphics(width,height);
}

function mouseShape(){
  if (keyIsPressed){
    if (key === "a" ) shape = "shape1";
    if (key === "s" ) shape = "shape2";
    if (key === "d" ) shape = "shape3";
  }
  if (mouseIsPressed){
    if (shape === "shape1") overlay.rect(mouseX,mouseY,shapeSize*1.618,shapeSize);
    if (shape === "shape2") overlay.ellipse(mouseX,mouseY,shapeSize,shapeSize);
    if (shape === "shape3") overlay.triangle(mouseX-(shapeSize/2),mouseY+(shapeSize/2),mouseX+(shapeSize/2),mouseY+(shapeSize/2), mouseX,mouseY-(shapeSize/2));
  }
  overlay.fill(random(0,255),random(0,255),random(0,255));
  image(overlay, 0, 0);
  
}
function draw() {
  background(220);
  mouseShape();
  textFont("inconsolata");
  text("Udaey Sandha",width-90,height-10);
}
