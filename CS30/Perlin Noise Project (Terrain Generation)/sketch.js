// Perlin Noise Project (Terrain Generation)
// Udaey Sandha
// October 6, 2023

// Global Variables
let yFlag,
  xFlag,
  average,
  timeMoving = 0,
  yValue,
  yValueTime = 0;
//----------------------------------------------------------------------------------------------------------------
const RECT_WIDTH = 0.5,
  NOISE_SHIFT = 0.01,
  FLAG_HEIGHT = 50,
  MOVE_BY = 0.05;
//----------------------------------------------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
}
//----------------------------------------------------------------------------------------------------------------
function generateTerrain() {  //generates terrain and figgures out x and y values for flag position and y value for average line
  yFlag = height;
  xFlag = 0;
  average = 0;
  let i = 0;  // calculates the number of times loop is run
  for (let x = 0; x < width; x += RECT_WIDTH) {
    noFill();
    stroke(0);
    strokeWeight(2);
    yValue = noise(yValueTime);  // using perlin noise for semi random heights
    yValue = map(yValue, 0, 1, 0, height);  // mapping according to the page height
    yValueTime += NOISE_SHIFT;  // noise shift
    rectMode(CORNERS);
    rect(x, height, x + RECT_WIDTH, yValue);  //drawing the terrrains using rectangles
    if (yFlag >= yValue) (yFlag = yValue), (xFlag = x + RECT_WIDTH);  // figuring out x and y for flag
    average += yValue;
    i++;
  }
  average = average / i;  //average height
  yValueTime = timeMoving;  // making sure the terrain is moving
}
//----------------------------------------------------------------------------------------------------------------
function drawFlag(x, y) {  // function to draw a flag at x and y arrguments
  stroke("brown");
  line(x, y, x, y - FLAG_HEIGHT);
  fill("red");
  if (x + FLAG_HEIGHT < width) triangle(x, y - FLAG_HEIGHT, x, y - FLAG_HEIGHT / 2, x + FLAG_HEIGHT / 2, y - FLAG_HEIGHT * 0.75);  //switching which way the flag faces so it doesnt go off screen // facing right
  else triangle(x, y - FLAG_HEIGHT, x, y - FLAG_HEIGHT / 2, x - FLAG_HEIGHT / 2, y - FLAG_HEIGHT * 0.75);  //facing left
}
//----------------------------------------------------------------------------------------------------------------
function averageHeight() {  // drawing a lline at the average height
  strokeWeight(7);
  line(0, average, width, average);
}
//----------------------------------------------------------------------------------------------------------------
function draw() {
  background(220);
  generateTerrain();
  timeMoving += MOVE_BY;  // makes the terrain move
  drawFlag(xFlag, yFlag);
  averageHeight();
}
//----------------------------------------------------------------------------------------------------------------
//End