// Multi-Coloured Grid
// Udaey Sandha
// Sept 28, 2023

// Global Variables
let gridSize, colors;
//----------------------------------------------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  gridSize = floor(random(5, 15)); //random grideSize at start
  generateColors();
}
//----------------------------------------------------------------------------------------------------------------
function mousePressed() {
  if (mouseButton === LEFT) {
    //left makes gridesize small
    gridSize++;
    generateColors();
  } else if (mouseButton === RIGHT) {
    //right makes gridesize bigger
    print(gridSize);
    gridSize = max(1, gridSize - 1); //max gridsize
    generateColors();
  }
}
//----------------------------------------------------------------------------------------------------------------
function keyPressed() {
  //changing the colors when key pressed
  generateColors();
}
//----------------------------------------------------------------------------------------------------------------
function generateColors() {
  //generating semi random colors and puting them in a array
  let iColor, jColor;
  colors = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      (iColor = map(i, 0, gridSize, 0, 255)),
        (jColor = map(j, 0, gridSize, 0, 255)),
        colors.push(
          color(
            Math.abs(iColor - 255),
            Math.abs(jColor - random(0, 255)),
            jColor
          )
        );
    }
  }
}
//----------------------------------------------------------------------------------------------------------------
function drawGrid() {
  //drawing the grid
  let index = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let gridWidth = width / gridSize;
      let gridHeight = height / gridSize;
      let x = j * gridWidth;
      let y = i * gridHeight;
      fill(colors[index]); // accessing the array to get the colors
      rect(x, y, gridWidth, gridHeight); //drawing the grid
      index++;
    }
  }
}
//----------------------------------------------------------------------------------------------------------------
function draw() {
  drawGrid();
}
//----------------------------------------------------------------------------------------------------------------
//End
