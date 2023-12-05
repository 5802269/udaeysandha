// Circle In A Cirlce
// Udaey Sandha
// Date
// blah blah blah ....

let circleSize,depth=5,circleNum=2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width<height) circleSize=width*0.9;
  else circleSize=height*0.9;
  noFill();
  angleMode(DEGREES);
}

function draw() {
  background(220);
  circleInACircle(width/2,height/2,circleNum,circleSize);
}

function mouseWheel(event){
  print(event.delta);
  if (event.delta <0) depth += 1;
  if (event.delta >0){
    depth -= 1;
    if(depth < 5) {
      depth = 5;
    }
  }
  print (depth);
}

function keyPressed(){
  if (keyCode === UP_ARROW) {
    circleNum += 1;
  } else if (keyCode === DOWN_ARROW) {
    circleNum -= 1;
    if (circleNum < 2) circleNum=2;
  }
}

function circleInACircle(x,y,n,s){
  let R = s/2;
  let a = 360/(2*n);
  let r = sin(a)*R/(1+sin(a));
  if (s>depth){
    for(let i = 0;i<n; i++){
      let ang = a*i;
      circleInACircle(x+(R-r)*cos(2*ang),y+(R-r)*sin(2*ang),n,2*r);
    }
    circle(x,y,s);
    circleInACircle(x,y,n,2*(R-2*r));
  }

}