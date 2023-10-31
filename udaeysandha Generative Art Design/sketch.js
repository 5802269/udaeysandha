// Generative Art Design
// Udaey Sandha
// October 27, 2023



function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCurveLine();
}

function drawCurveLine(){
  noFill();
  for (let i = 0; i<random(25,50); i++){
    strokeWeight(random(10));
    stroke(random(255));
    beginShape();
    // let x= random(width);
    // let y =random(height);
    // curveVertex(x,y);
    curveVertex(width/2,height/2);
    for(let i = 0; i<random(100); i++){
      curveVertex(random(width),random(height));
    }
    // curveVertex(x,y);
    curveVertex(width/2,height/2);
    endShape();
}
}