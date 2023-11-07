// Generative Art Design
// Udaey Sandha
// October 27, 2023

// Global Variables
let x,
  y,
  xValues=[],
  yValues=[];

function setup() {
  createCanvas(2023, 2023);  // making the canvas 2023 X 2023 pix
  background(0);
  drawCurveLine();  // calling the function
}

function drawCurveLine(){
  //draws a bunch of similar curved lines slightly translated to create art
  
  noFill();
  //stroke( 184, 115, 51,150);  //Gold
  stroke( 0,255,0,150);  //Green

  // USING A FOR LOOP TO RECORD THE 
  //beginShape();  //uncomment to draw original curve
  for(let i = 0; i<25; i++){
    let x = random (width);
    let y = random (height);
    //curveVertex(x,y);  //uncomment to draw original curve
    xValues.push(x);
    yValues.push(y);
  }
  //endShape();  //uncomment to draw original curve

  for (let i = 0; i<1000;i++){
    beginShape();
    for(let j = 0; j<25; j++){
      let x = xValues[j];
      let y = yValues[j];

      if (x-j*j>height) break;  //only use for final image
      curveVertex(x-j,y+i*i);  // final image

      // THE OTHER IMAGES WERE MADE USING THE FOLLOWING CODE

      //curveVertex(x-i*i,y+i*i);  // bottom left cornor as base
      //curveVertex(x-i*i,y+j);  //left side as base
      // curveVertex(x-j*j,y+i*i);  // bottom as base
      //curveVertex(x+j*j,y-i*i);  // top as base
      //curveVertex(x+i*i,y-j*j);  // right side as base
    }
    endShape();
  }
}

function keyPressed(){
  if (key ==="s") save ("CS30 Image.png");
}