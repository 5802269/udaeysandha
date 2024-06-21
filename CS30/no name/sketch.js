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
  for (let y=50; y<height-50;y+=6){
    for (let x=0; x<width;x++){
      strokeWeight(.01);
      bezier(0, y, 20, y-150, 40, y+150, 80, y);
      bezier(80, y, 120, y-150, 160, y+150, 240, y);
      bezier(240, y, 320, y-150, 400, y+150, 500, y);
      bezier(500, y, 550, y-50, 650, y-50, 900, y-30);
    }
  }
 
}
