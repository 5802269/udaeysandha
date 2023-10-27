// Generative Art Design
// Udaey Sandha
// October 27, 2023


let yValue,xValue, time = 0;
const  Y_NOISE_SHIFT = 1,X_NOISE_SHIFT = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let previousX=xValue;
  let previousY=yValue;
  yValue = noise(time);  // using perlin noise for semi random heights
  yValue = map(yValue, 0, 1, 0, height);  // mapping according to the page height
  time += Y_NOISE_SHIFT;  // noise shift

  xValue = noise(time);  // using perlin noise for semi random heights
  xValue = map(xValue, 0, 1, 0, width);  // mapping according to the page height
  time += X_NOISE_SHIFT;  // noise shift
  strokeWeight(100);
  stroke(255);
  point (xValue,yValue);
  stroke(0);
  strokeWeight(10);
  line (previousX,previousY,xValue,yValue);
  stroke(random(255),random(255),random(255));
  strokeWeight(10);
  line (width-previousX,height-previousY,xValue,yValue);
}
