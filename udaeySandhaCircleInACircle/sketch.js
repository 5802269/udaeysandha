// Circle In A Cirlce
// Udaey Sandha
// Date
// blah blah blah ....

let circleSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width<height) circleSize=width/2;
  else circleSize=height/2;
  noFill();
}

function draw() {
  background(220);
  circleInACircle(width/2,height/2,5,circleSize);
}

function circleInACircle(x,y,n,s){
  if (circleSize>10){
    circle(x,y,s);
    circle(x-2*x/6,y,s/3);
    circle(x+2*x/6,y,s/3);
    
}

}