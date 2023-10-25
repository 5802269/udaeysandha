// Colors Demo
// Udaey Sandha
// October 25, 2023

let rectWidth = 50, rectHeight = 10;
let colors = ["#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawRGB(width*0.1);
  drawHSB(width*0.4);
  drawCustom(width*0.7);
}

function drawRGB(x){
  colorMode(RGB);
  for (let y = 0; y<height;y+=rectHeight){
    fill(random(255),random(255),random(255));
    rect(x,y,rectWidth,rectHeight);
  }
 
}

function drawHSB(x){
  colorMode(HSB);
  for (let y = 0; y<height;y+=rectHeight){
    fill(y/2.6%360,360,360);
    rect(x,y,rectWidth,rectHeight);
  }
}

function drawCustom(x){
  colorMode(RGB);
  let index = 0;
  for (let y = 0; y<height;y+=rectHeight){
    // option 1: cycle through palette
    fill(colors[index%colors.length]);
    
    // option 2: Random palette selection
    fill(colors[Math.floor(random(colors.length))])
    rect(x,y,rectWidth,rectHeight);
    index++;
  }
}