// Round Racers
// Udaey Sandha
// October 2, 2023
//

let roundRacer=[],NUM_RACERS=3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0 ; i < NUM_RACERS; i++){
    let randColor = color(random(0,255), random(0,255), random(0,255));
    roundRacer.push(new RoundRacer(random(0,height),randColor));
  }
}

function draw() {
  background(220);
  for(let current of roundRacer){
    current.move();
    current.display();
  }
}

class RoundRacer{
  constructor(y,c){
    this.x=0;
    this.y=y;
    this.xSpeed=random(3,15);
    this.c=c;
    this.size=random(0,30);
  }
  move(){
    this.x += this.xSpeed;
    if (this.x>= width) this.x=0;
  }
  display(){
    fill(color(this.c));
    circle(this.x,this.y,this.size);
  }
}