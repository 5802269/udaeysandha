let gridSize;
let grid;
let colors = [];
let bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateColors();
  calculateGridSize();
  createGrid();
}

function draw() {
  background(bgColor);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      fill(colors[i][j]);
      rect(j * (width / gridSize), i * (height / gridSize), width / gridSize, height / gridSize);
    }
  }
}

function calculateGridSize() {
  gridSize = floor(random(5, 15)); // Adjust this range for more or fewer squares
}

function createGrid() {
  grid = new Array(gridSize);
  colors = new Array(gridSize);
  for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize);
    colors[i] = new Array(gridSize);
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = random(2); // 0 or 1 for square color
      colors[i][j] = color(random(255), random(255), random(255));
    }
  }
}

function generateColors() {
  bgColor = color(random(255), random(255), random(255));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      colors[i][j] = color(random(255), random(255), random(255));
    }
  }
}

function mouseClicked() {
  calculateGridSize();
  createGrid();
}

function keyPressed() {
  generateColors();
}
