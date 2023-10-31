// Generative Art Design
// Udaey Sandha
// October 27, 2023

let x;
let y;
let xValues=[];
let yValues=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCurveLine();
  x= random(width);
  y =random(height);

}

function drawCurveLine(){
  noFill();
  stroke(0,0,0,150);
  //   for (let i = 0; i<random(25,50); i++){
  //     strokeWeight(random(10));
  //     stroke(random(255));
  //     beginShape();
  //     // let x= random(width);
  //     // let y =random(height);
  //     // curveVertex(x,y);
  //     curveVertex(width/2,height/2);
  //     for(let i = 0; i<random(100); i++){
  //       curveVertex(random(width),random(height));
  //     }
  //     // curveVertex(x,y);
  //     curveVertex(width/2,height/2);
  //     endShape();
  // }

  beginShape();
  for(let i = 0; i<25; i++){
    let x = random (width);
    let y = random (height);
    curveVertex(x,y);
    xValues.push(x);
    yValues.push(y);
  }
  endShape();

  for (let i = 0; i<100000;i++){
    beginShape();
    for(let j = 0; j<25; j++){
      let x = xValues[j];
      let y = yValues[j];
      curveVertex(x-y*i,y+x*i);
    }
    endShape();
  }


}

function keyPressed(){
  if (key ==="s") save ("CS30 Image.png");
}