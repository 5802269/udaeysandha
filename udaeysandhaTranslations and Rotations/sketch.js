// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CIRCLE_SIZE=700;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawClock();
}

function drawClock(){
  const TIME = new Date();
  let hour = TIME.getHours();
  let min = TIME.getMinutes();
  if (hour > 12) hour-=12;
  print(hour,min);
  strokeWeight(5);
  circle(width/2,height/2,CIRCLE_SIZE);
  push();
  translate(width/2,height/2);
  
  let time = 15;
  for(let i = 1; i<=60;i++){
    rotate(radians(6));
    if (i%5 === 0){
      strokeWeight(7);
      line(CIRCLE_SIZE/2-CIRCLE_SIZE/20,0,CIRCLE_SIZE/2-CIRCLE_SIZE/50,0);

    } else{
      
      strokeWeight(2);
      line(CIRCLE_SIZE/2-CIRCLE_SIZE/20,0,CIRCLE_SIZE/2-CIRCLE_SIZE/50,0);
    }
    if (time===-hour){
      line(0,0,100,0);
    }
    time--;
  }
}
