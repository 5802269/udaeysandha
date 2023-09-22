// Primitive Paint
// Udaey Sandha
// Sept 15, 2023

// declaring stuff
let shapeSize = 25;
let overlay;
let shape = "shape1";
let ballSize = 0;
let shapeColor;
let growing = true;
let maxSize = 400;
let previewCanvas;
let colorIndex = 0;
let ballX,ballY,ySpeed=8, xSpeed=5;

// creating 2 extra canvases one for preview and one for drawings
function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);
  previewCanvas = createGraphics(width, height);
  ballX=width/2;
  ballY=height/2;
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());}
  textFont("inconsolata", 20);
  textAlign(RIGHT, BOTTOM);
  shapeColor = [
    color("aqua"),
    color("black"),
    color("blue"),
    color("fuchsia"),
    color("gray"),
    color("green"),
    color("lime"),
    color("maroon"),
    color("navy"),
    color("olive"),
    color("purple"),
    color("red"),
    color("silver"),
    color("teal"),
    color("white"),
    color("yellow"),
  ];
}
function cleanSlate() {
  overlay.background(220);
}
function mouseWheel(event) {
  print(event.delta);
  shapeSize += (event.delta / 8) * -1;
  shapeSize = constrain(shapeSize, 20, maxSize);
}

function mouseShape() {
  previewCanvas = createGraphics(width, height);
  previewCanvas.fill(shapeColor[colorIndex]);

  if (keyIsPressed) {
    if (key === "a") shape = "shape1";
    if (key === "s") shape = "shape2";
    if (key === "d") shape = "shape3";
  }

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      if (shape === "shape1")
        overlay.rect(
          mouseX - (shapeSize * 1.618) / 2,
          mouseY - shapeSize / 2,
          shapeSize * 1.618,
          shapeSize
        );
      if (shape === "shape2")
        overlay.ellipse(mouseX, mouseY, shapeSize, shapeSize);
      if (shape === "shape3")
        overlay.triangle(
          mouseX - shapeSize / 2,
          mouseY + shapeSize / 2,
          mouseX + shapeSize / 2,
          mouseY + shapeSize / 2,
          mouseX,
          mouseY - shapeSize / 2
        );
    }
    if (mouseButton === RIGHT) {
      colorIndex++;
      if (colorIndex > shapeColor.length - 1) colorIndex = 0;
    }
  }
  if (shape === "shape1")
    previewCanvas.rect(
      mouseX - (shapeSize * 1.618) / 2,
      mouseY - shapeSize / 2,
      shapeSize * 1.618,
      shapeSize
    );
  if (shape === "shape2")
    previewCanvas.ellipse(mouseX, mouseY, shapeSize, shapeSize);
  if (shape === "shape3")
    previewCanvas.triangle(
      mouseX - shapeSize / 2,
      mouseY + shapeSize / 2,
      mouseX + shapeSize / 2,
      mouseY + shapeSize / 2,
      mouseX,
      mouseY - shapeSize / 2
    );


  overlay.fill(shapeColor[colorIndex]);
  previewCanvas.fill(shapeColor[colorIndex]);
  image(overlay, 0, 0);
  image(previewCanvas, 0, 0);

}
function inOutBall() {
  if (growing) {
    ballSize += 2;
  } else {
    ballSize -= 2;
  }
  if (ballSize > maxSize || ballSize < 0) {
    growing = !growing;
  }
  ballX = ballX + xSpeed;
  ballY = ballY + ySpeed;
  if (ballSize>ballSize-maxSize){
    
  }
  if (ballX+ballSize/2 >= width || ballX-ballSize/2 <= 0) {
    xSpeed *=-1;
  }
  if (ballY+ballSize/2 >= height || ballY-ballSize/2 <= 0) {
    ySpeed *=-1;
  }
  noStroke();
  fill(0, 0, 255, 100);
  circle(ballX, ballY, ballSize);
  circle(ballX, ballY, Math.abs(ballSize - maxSize));
}

function draw() {
  background(220);
  mouseShape();
  inOutBall();
  fill("blue");
  text("Udaey Sandha ", width, height);
  if (keyIsPressed && key === " ") {
    cleanSlate();
  }
}