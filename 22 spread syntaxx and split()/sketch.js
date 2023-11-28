// Loading from Files
// Udaey Sandha
// Nov 28, 2023
// load strings(), split() ... spread syntax

let textFile;
let grid, img, rows, cols, colorMap;

function preload() {
  textFile = loadStrings("assets/info.txt");
  img = loadStrings("assets/image.txt");
  img = loadStrings("assets/colorImage.txt");
}

function setup() {
  cols = img[0].length;
  rows = img.length;
  createCanvas(windowWidth, windowHeight);
  processText();

  grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([...img[i]]);
  }

  colorMap = new Map([
    ["b", "black"],
    ["w", "white"],
    ["r","sienna"],
    ["l","peru"],
    ["p",color(150,150,255)],
  ])
}

function draw() {
  renderGrid();
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function renderGrid() {
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let currentKey = grid[y][x];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight,cellWidth,cellHeight);
    }
  }
}

function processText() {
  print("SPLIT INTO WORDS");
  let splitWords = textFile[0].split(" ");
  print(splitWords);
  print("SPLIT INTO CHARS");
  let splitChars = textFile[1].split(" ");
  print(splitChars);

  print("SPREAD INTO CHARS");
  let spreadChars = [...textFile[2]];
  print(spreadChars);
}
