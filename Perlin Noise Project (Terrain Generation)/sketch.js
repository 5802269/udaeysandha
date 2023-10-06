// Perlin Noise Project (Terrain Generation)
// Udaey Sandha
// October 6, 2023


let timeMoving = 0,rectWidth = 0.5, yValueIndex, yValue, yValueTime = 0, noiseShift = 0.01, yValues = [], minYValue, xValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // drawTerrain();
  // drawFlag();
}

function drawTerrain() {
  yValues=[];
  xValues=[];
  for (let x = 0; x < width; x += rectWidth) {
    noFill();
    stroke(0);
    strokeWeight(2);
    yValue = noise(yValueTime);
    yValue = map(yValue, 0, 1, 0, height);
    yValueTime += noiseShift;
    rectMode(CORNERS);
    rect(x, height, x + rectWidth, yValue);
    yValues.push(yValue);
    xValues.push(x + rectWidth);
    

  }
  yValueTime = timeMoving;
}

function drawFlag() {
  let flagHeight=50;
  minYValue = min(yValues);
  yValueIndex = yValues.indexOf(minYValue);
  let x = xValues[yValueIndex];
  stroke("brown");
  line(x, minYValue, x, minYValue - flagHeight);
  fill("red");
  if (x+flagHeight<width) triangle( x, minYValue - flagHeight,x,minYValue-flagHeight/2,x+flagHeight/2,minYValue-flagHeight*0.75);
  else triangle( x, minYValue - flagHeight,x,minYValue-flagHeight/2,x-flagHeight/2,minYValue-flagHeight*0.75);
}

function averageHeight(){
  let average=(max(yValue)+min(yValue))/2;
  strokeWeight(7);
  line(0,average,width,average);
}

function draw() {
  background(220);
  drawTerrain();
  drawFlag();
  timeMoving+=0.05;
  drawFlag();
  averageHeight();
}
