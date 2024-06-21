// Cubic Disarray Replication
// Udaey Sandha
// October 24, 2023

let squareSize =30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  rectMode(CENTER);
  noFill();
  noLoop();
}

function drawRect(){
  let s= squareSize;
  for (let x = s/2; x<width-s/2;x+=s){
    for (let y =s/2; y<height ; y+=s){
      push();
      translate(x,y);
      let rAmount = map(y,0,height,1,45);
      rotate(radians(random(-rAmount,rAmount)));
      let offset =map (y,0,height,0,15);
      square(random(-offset,offset),random(-offset,offset),s);
      pop();
    }
  }
}

function draw() {
  background(220);
  drawRect();
}
