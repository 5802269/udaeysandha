// Primitive Paint
// Udaey Sandha
// Sept 15, 2023

// Global variables
let shapeSize = 25,
  overlay,
  previewCanvas,
  shape,
  ballSize = 0,
  growing = true,
  maxSize = 400,
  colorIndex = 0,
  ballX,
  ballY,
  ySpeed = 3,
  xSpeed = 4,
  tempBallSize,
  shapeColorOptions;
//----------------------------------------------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);
  previewCanvas = createGraphics(width, height);
  ballX = width / 2;
  ballY = height / 2;
  // prevents the right click menu from appearing
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  textFont("inconsolata", 30);
  textAlign(RIGHT, BOTTOM);
  // Array of shapes
  let shapes = ["shape1", "shape2", "shape3"];
  // Randomly selecting a default shape
  shape = random(shapes);
  // Array of colors
  shapeColorOptions = [
    color(0, 255, 255),
    color(0, 0, 0),
    color(0, 0, 255),
    color(255, 0, 255),
    color(128, 128, 128),
    color(0, 128, 0),
    color(0, 255, 0),
    color(128, 0, 0),
    color(0, 0, 128),
    color(128, 128, 0),
    color(128, 0, 128),
    color(255, 0, 0),
    color(192, 192, 192),
    color(0, 128, 128),
    color(255, 255, 255),
    color(255, 255, 0),
  ];
  // Randomly selecting a defaut color
  colorIndex = floor(random(shapeColorOptions.length));
}
//----------------------------------------------------------------------------------------------------------------
function cleanSlate() {
  // Cleans the background
  overlay.background(220);
}
//----------------------------------------------------------------------------------------------------------------
function mouseWheel(event) {
  // Changes the shape size according to the mouse wheel scroll
  shapeSize += (event.delta / 8) * -1;
  shapeSize = constrain(shapeSize, 20, maxSize);
}
//----------------------------------------------------------------------------------------------------------------
// the main draw loop - calls other functions, write name at the bottom, calls clean slate when " " pressed
function draw() {
  background(220);
  mouseShape();
  inOutBall();
  fill(getCurrentColor());
  text("Udaey Sandha ", width, height);
  if (keyIsPressed && key === " ") {
    cleanSlate();
  }
}
//----------------------------------------------------------------------------------------------------------------
function mouseShape() {
  // clearing the preview canvas
  previewCanvas.clear();
  previewCanvas.fill(getCurrentColor());

  if (keyIsPressed) {
    // changing the shape according to keys pressed
    if (key === "a") shape = "shape1";
    if (key === "s") shape = "shape2";
    if (key === "d") shape = "shape3";
  }

  // drawing the shape if mouse left is pressed and changing color if mouse right is pressed
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      drawShape();
    }
    if (mouseButton === RIGHT) {
      changeColor();
    }
  }

  // previewing the shape at mouse
  previewCurrentShape(mouseX, mouseY);

  overlay.fill(getCurrentColor());
  image(overlay, 0, 0);
  image(previewCanvas, 0, 0);
}
//----------------------------------------------------------------------------------------------------------------
// getting color according to index
function getCurrentColor() {
  return color(shapeColorOptions[colorIndex]);
}
//----------------------------------------------------------------------------------------------------------------
// drawing the shape
function drawShape() {
  if (shape === "shape1") {
    overlay.rect(
      mouseX - (shapeSize * 1.618) / 2,
      mouseY - shapeSize / 2,
      shapeSize * 1.618,
      shapeSize
    );
  } else if (shape === "shape2") {
    overlay.ellipse(mouseX, mouseY, shapeSize, shapeSize);
  } else if (shape === "shape3") {
    overlay.triangle(
      mouseX - shapeSize / 2,
      mouseY + shapeSize / 2,
      mouseX + shapeSize / 2,
      mouseY + shapeSize / 2,
      mouseX,
      mouseY - shapeSize / 2
    );
  }
}
//----------------------------------------------------------------------------------------------------------------
function changeColor() {
  // changing the color
  colorIndex = (colorIndex + 1) % shapeColorOptions.length;
}
//----------------------------------------------------------------------------------------------------------------
function previewCurrentShape(x, y) {
  // previewing the shape
  if (shape === "shape1") {
    previewCanvas.rect(
      x - (shapeSize * 1.618) / 2,
      y - shapeSize / 2,
      shapeSize * 1.618,
      shapeSize
    );
  } else if (shape === "shape2") {
    previewCanvas.ellipse(x, y, shapeSize, shapeSize);
  } else if (shape === "shape3") {
    previewCanvas.triangle(
      x - shapeSize / 2,
      y + shapeSize / 2,
      x + shapeSize / 2,
      y + shapeSize / 2,
      x,
      y - shapeSize / 2
    );
  }
}
//----------------------------------------------------------------------------------------------------------------
function inOutBall() {
  // drawing a growing and shrinking ball
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

  let ball2Size = Math.abs(ballSize - maxSize);

  if (ballSize > ball2Size) {
    tempBallSize = ball2Size;
  } else {
    tempBallSize = ballSize;
  }

  // Check for collisions with the canvas edges and changing directions
  if (ballX + tempBallSize / 2 >= width) {
    ballX = width - tempBallSize / 2;
    xSpeed *= -1;
  }
  if (ballX - tempBallSize / 2 <= 0) {
    ballX = tempBallSize / 2;
    xSpeed *= -1;
  }
  if (ballY + tempBallSize / 2 >= height) {
    ballY = height - tempBallSize / 2;
    ySpeed *= -1;
  }
  if (ballY - tempBallSize / 2 <= 0) {
    ballY = tempBallSize / 2;
    ySpeed *= -1;
  }
  noStroke();
  fill(
    red(getCurrentColor()),
    green(getCurrentColor()),
    blue(getCurrentColor()),
    100
  );
  circle(ballX, ballY, ballSize);
  circle(ballX, ballY, ball2Size);
}
//----------------------------------------------------------------------------------------------------------------
//End
