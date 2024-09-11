// Mouse Distance
// Udaey Sandha
// Sept 20, 2023
// arrays, maths, function, scroll wheel, colors

//Global Variables
let colorArray = [];  //red, green, blue, brown
let colorIndex = 0;   // 0     1     2     3

function createColors(){  //simplest: no input
  colorArray.push(color("red"));
  colorArray.push(color(200,100,255));
  colorArray.push(color("midnightblue"));
}

function mouseDistance(x1,x2,y1,y2){
  let a = Math.abs(x1-x2);
  let b = Math.abs(y1-y2);
  let c = Math.sqrt(a*a+b*b);
  return c;
}

function drawNodes(){
  // draw two "nodes" (circles) at centre and mouse and connect with a single edge
  fill(colorArray[colorIndex]);
  stroke(colorArray[colorIndex]);
  circle(width/2,height/2,20);
  circle(mouseX,mouseY,20);
  line(width/2,height/2,mouseX,mouseY);
  let d = mouseDistance(mouseX,mouseY,width/2,height/2);
  textSize(30);
  textAlign(CENTER);
  text (round(d,1), width/2,height*0.6);
}

function mouseWheel(event){
  print(event.delta);
  if (event.delta <0){
    colorIndex += 1;
    if(colorIndex > colorArray.length-1) {
      colorIndex = 0;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createColors();
}

function draw() {
  background(220);
  drawNodes();
}
