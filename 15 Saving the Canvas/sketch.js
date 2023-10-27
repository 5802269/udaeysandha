// Saving the Canvas
// Udaey sandha
// October 27, 2023
// Saving Canvas as PNG, Canvas Size


function setup() {
  // resolution is fairly high
  createCanvas(3000, 1500);
  background(150);
  art();
}

function art(){
  noFill();
  stroke(255);
  rectMode(CENTER);
  strokeWeight(7);
  for (let d = 300; d <1400; d+=50){
    square (width/2,height/2,d);
  }
}

function keyPressed(){
  if (key ==="s") save ("CS30 Image.png");
}