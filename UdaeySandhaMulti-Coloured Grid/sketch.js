// Multi-Coloured Grid
// Udaey Sandha
// Sept 28, 2023

// Global Variables
let gridSize, colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  gridSize = floor(random(5, 15));
  generateColors();
}



function mousePressed(){
  if (mouseButton === LEFT) {
    gridSize++;
    generateColors();
  } else if (mouseButton === RIGHT) {
    gridSize = max(1, gridSize - 1); // Ensure gridSize is always at least 1
    generateColors();
  }
}

function keyPressed() {
  generateColors();
}

function generateColors() {
  let iColor,jColor;
  colors = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      iColor=map(i,0,gridSize,0,255),
      jColor=map(j,0,gridSize,0,255),
      colors.push(color(Math.abs(iColor*-random(1,1.5)),Math.abs(jColor*-random(1,1.5)),jColor));
    }
  }
}

function drawGrid(){
  let index = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let gridWidth = width / gridSize;
      let gridHeight = height / gridSize;
      let x = j * gridWidth;
      let y = i * gridHeight;
      fill(colors[index]);
      rect(x, y, gridWidth, gridHeight);
      index++;
}}}

function draw() {
  drawGrid();
  
}
