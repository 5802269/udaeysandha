// Vector Basics
// Udaey Sandha
// Nov 1, 2023
// Using Vectors for motion (pos, vel ,)

// Global Variables
let movers=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  movers.push(new Movers(mouseX,mouseY));
}

function draw() {
  movers.push(new Movers(mouseX,mouseY));
  background(220);
  for (let i=0;i<movers.length; i++) {
    let m = movers[i];
    m.move();
    m.display();
  }
}

class Movers{
  constructor(x,y){
    this.pos = createVector(x,y);  // this.pos.x this.pos.y
    this.c = color(50,50,random(150,255),150);  // with transparency
    this.vel = createVector(random(-6,6),random(-4,-10));
    this.gravity = createVector(0,0.1);
    this.alive = true;
    this.lifetime = random(60,120);
  }

  move(){
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.lifetime--;
    if(this.lifetime<0) this.alive = false;
  }

  display(){
    fill(this.c);
    noStroke();
    push();
    translate(this.x,this.y);
    circle(this.pos.x,this.pos.y,60);
    pop();
  }
}