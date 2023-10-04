// Multi-Coloured Grid
// Udaey Sandha
// Sept 28, 2023

// Global Variables
let squareSize, colorR, colorG , colorB, numSquares,gdc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  gdc = gcd_two_numbers(height,width);
  numSquares = width/gdc;
  squareSize = constrain(squareSize,5,gdc);
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function mousePressed(){
  if (mouseButton === LEFT) numSquares -=numSquares;
  else if (mouseButton === RIGHT) numSquares +=numSquares;
  numSquares = constrain(numSquares,5,gdc);

  console.log(numSquares+" "+squareSize);
  drawGrid();
}

function drawGrid(){
  squareSize = gdc/numSquares;
  for (let x = 0; x<width;x+=squareSize){
    for (let y =0; y<height;y+=squareSize){
      square(x,y,squareSize);
    }
  }
}

function draw() {
  background(220);
  drawGrid();
  
}
