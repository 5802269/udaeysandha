// Inheritance Demo
// Udaey Sandha
// Nov 29, 2023

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    objects.push(new AnimatedObjects(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    objects.push(new CircleObj(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    objects.push(new LineObj());
  }
}

function draw() {
  background(220);
  for (let o of objects) {
    o.move();
    o.display();
  }
}

// "parent" or "super" class
class AnimatedObjects {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
  }

  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }

  display() {
    strokeWeight(4);
    point(this.x, this.y);
  }
}

// Child Class #1 - Circle
class CircleObj extends AnimatedObjects {
  constructor(x, y) {
    super(x, y); //call the parent class's constructor
    this.size = random(20, 40);
  }
  display() { //method override
    strokeWeight(2);
    circle(this.x, this.y, this.size);
  }
}

// Child Class #2 - Line
class LineObj extends AnimatedObjects {
  constructor() {
    super(random(width),random(height)); //call the parent class's constructor
  }

  move(){
    super.move();
    this.x += 5;
    if (this.x>width) this.x=0;
  }

  display() { //method override
    if (mouseIsPressed) strokeWeight(10);
    else strokeWeight(2);
    line(this.x, this.y,this.x+15,this.y);
  }
}