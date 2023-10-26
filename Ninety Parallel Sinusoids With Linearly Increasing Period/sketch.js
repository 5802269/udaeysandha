// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  drawShape();
}

function drawShape() {
  noFill();
  push();
  rotate(radians(180));
  translate(-width,-height);
  for (let y=50; y<height-50;y+=10){
    for (let x=0; x<width;x+=.15){
      point((x*x/35),y+50*sin(x * 0.1));

    }
  }

}