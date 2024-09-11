// Intro to Objects and Classes
// Udaey Sandha
// October 2, 2023
//Random Walker class + multiple objects

// Global Variables
let w=[];
const NUM_WALKERS=10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0 ; i < NUM_WALKERS; i++){
    let randColor = color(random(0,255), random(0,255), random(0,255));
    w.push(new Walker(width/2,height/2,randColor));
  }
}

function draw() {
  // background(220);
  for(let current of w){
    current.move();
    current.display();
  }
}


class Walker{
  // class constructor and properties
  constructor(x,y,c){
    this.x = x;
    this.y = y;
    this.c = c;
    this.size = 10;
    this.speed = 10;
  }

  // class methods
  move(){ //equally likely chance to ↑ ↓ → ←
    // 0-up ,1-down, 2-left, 3-right
    let moveChoice = Math.floor(random(0,4));
    if (moveChoice===0) this.y -= this.speed;  //LEFT
    else if (moveChoice===1) this.y += this.speed;  //RIGHT
    else if (moveChoice===2) this.x -= this.speed;  //UP
    else this.x += this.speed;  //DOWN
  }
  display(){ //render our walker on the screen at x,y
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.size);
  }
}