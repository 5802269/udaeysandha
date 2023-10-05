// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rectWidth=0.5,yValueIndex,yValue,yValueTime=0,noiseShift=0.01,yValues=[],minYValue,xValues=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  drawTerrain();
}

function drawTerrain(){
  for (let x=0; x<width;x+=rectWidth){
    strokeWeight(2);
    yValue=noise(yValueTime);
    yValue=map(yValue,0,1,0,height);
    yValueTime+=noiseShift;
    rectMode(CORNERS);
    rect(x,height,x+rectWidth,yValue);
    yValues.push(yValue);
    xValues.push(x+rectWidth);
    
  }
}

function drawFlag(){
  minYValue=min(yValues);
  yValueIndex=yValues.indexOf(minYValue);
  let x= xValues[yValueIndex];
  line(x,minYValue,x,minYValue-100);
}

function draw() {
  drawFlag();
  
}
