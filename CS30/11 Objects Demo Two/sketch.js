// Objects Demo Two
// Udaey Sandha
// October 13,2023
// OOP Recap, perlin noise + object - object interactions

// Global Variables
let points=[];
let reach=150;  //Max line length

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let p of points){
    //?? what is the index
    p.display();
    p.move();
    p.connectPoints(points);
  }
}

function mouseClicked(){
  // trigger on a full press / release mouse interaction
  points.push(new MovingPoint(mouseX,mouseY));
}

class MovingPoint {
  // constructor
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.s = 20;
    this.c = color(random(255), random(255), random(255));
    this.xTime = random(10);
    this.yTime = random(10);
    this.timeShift = 0.01;
    this.maxSpeed = 5;
  }

  // class function
  display() {
    fill(this.c);
    noStroke();
    let d=dist(mouseX,mouseY,this.x,this.y);
    if (d<reach){
      this.s = map(d,0,reach,60,20);
    } else this.s = 20;
    circle(this.x, this.y, this.s);
  }

  move(){
    // motion with perlin noise
    let xSpeed = noise(this.xTime);  //0-1
    xSpeed=map(xSpeed,0,1,-this.maxSpeed,this.maxSpeed);
    this.xTime+=this.timeShift;
    this.x += xSpeed;

    let ySpeed = noise(this.yTime);
    ySpeed=map(ySpeed,0,1,-this.maxSpeed,this.maxSpeed);
    this.yTime+=this.timeShift;
    this.y+=ySpeed;

    // wwrap around code
    if (this.x+this.s/2<0) this.x += width+this.s/2;
    if(this.x-this.s/2>width) this.x -= width-this.s/2;

    if (this.y<0) this.y += width;
    if(this.y>width) this.y -= width;
  }

  getX(){return this.x};
  getY(){return this.y};

  connectPoints(pointArray){
    //check is any other ppoints are nearby if so connect with a line
    stroke(this.c);
    for (let p of pointArray){
      if(p!== this){ //make sure p is not myself
        let d = dist(this.x,this.y,p.getX(),p.getY());
        if (d<reach){
          line(this.x,this.y,p.getX(),p.getY());
        }
      }
    }
  }
}