// Perlin Noise Project (Terrain Generation)
// Udaey Sandha
// October 6, 2023

let yFlag,
  xFlag,
  average,
  timeMoving = 0,
  yValue,
  yValueTime = 0;

const RECT_WIDTH = 0.5,
  NOISE_SHIFT = 0.01,
  FLAG_HEIGHT = 50,
  MOVE_BY = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
<<<<<<< Updated upstream
=======
  //drawTerrain();
  //drawFlag();
>>>>>>> Stashed changes
}

function generateTerrain() {
  yFlag = height;
  xFlag = 0;
  average = 0;
  let i = 0;
  for (let x = 0; x < width; x += RECT_WIDTH) {
    noFill();
    stroke(0);
    strokeWeight(2);
    yValue = noise(yValueTime);
    yValue = map(yValue, 0, 1, 0, height);
    yValueTime += NOISE_SHIFT;
    rectMode(CORNERS);
    rect(x, height, x + RECT_WIDTH, yValue);
    if (yFlag >= yValue) (yFlag = yValue), (xFlag = x + RECT_WIDTH);
    average += yValue;
    i++;
  }
  average = average / i;
  yValueTime = timeMoving;
}

function drawFlag(x, y) {
  stroke("brown");
  line(x, y, x, y - FLAG_HEIGHT);
  fill("red");
  if (x + FLAG_HEIGHT < width) triangle(x, y - FLAG_HEIGHT, x, y - FLAG_HEIGHT / 2, x + FLAG_HEIGHT / 2, y - FLAG_HEIGHT * 0.75);
  else triangle(x, y - FLAG_HEIGHT, x, y - FLAG_HEIGHT / 2, x - FLAG_HEIGHT / 2, y - FLAG_HEIGHT * 0.75);
}

function averageHeight() {
  strokeWeight(7);
  line(0, average, width, average);
}

function draw() {
  background(220);
  generateTerrain();
  timeMoving += MOVE_BY;
  drawFlag(xFlag, yFlag);
  averageHeight();
}