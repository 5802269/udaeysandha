// Cars Cars Cars
// Udaey Sandha
// October 17, 2023
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRoad(){
  rectMode(CENTER);
  fill (0);
  rect(width/2,height/2,width,height*0.7);
  stroke("yellow");
  strokeWeight(10);
  for (let i =0;0<width;i+=50) line(i,height/2,i+30,height/2);
}

function draw() {
  background(220);
  drawRoad();
}
