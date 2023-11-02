// Ninety Parallel Sinusoids With Linearly Increasing Period
// Udaey Sandha
// November 1, 2023
// generative creative art piece
//----------------------------------------------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);  //greyish baackground
  drawShape();  //calling the fuction
}
//----------------------------------------------------------------------------------------------------------------

function drawShape() {
  push();  // adding 
  rotate(radians(180));  //rotating the canvas
  translate(-width, -height * 0.80);  //translating the canvas so its mirrored along the middle vertically
  for (let y = 50; y < 540 + 50; y += 6) {  //loop for drawing 90  lines
    for (let x = 0; x < width; x += .15) {  // loop for making points in each line using sin
      point((x * x / 35), y + 50 * sin(x * 0.1));
    }
  }
}
//----------------------------------------------------------------------------------------------------------------
//End