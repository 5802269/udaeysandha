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
  angleMode(DEGREES);
}

function draw() {
  background(220);
  circleInACircle(width/2,height/2,3,circleSize);
}

function circleInACircle(x,y,n,s){
  if (s>10){
    circle(x,y,s);
    let R = s/2;
    let a = 360/(2*n);
    let r = sin(a)*R/(1+sin(a));
    circle(x+R-r,y,2*r);
    print(x+(R-r)*cos(2*a));
    circle(x+(R-r)*cos(2*a),y+(R-r)*sin(2*a),2*r);
    
}

}