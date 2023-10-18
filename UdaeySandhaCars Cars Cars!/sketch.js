// Cars Cars Cars
// Udaey Sandha
// October 17, 2023
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class

let eastbound = [];
let westbound = [],v;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initVehicles();
}

function initVehicles() {
  for (let i=0;i<20;i++){
    eastbound.push(new Vehicle(Math.floor(random(width)),Math.floor(random(height*0.25,height/2)),Math.floor(random(0,2)),1));
    westbound.push(new Vehicle(Math.floor(random(width)),Math.floor(random(height/2,height*0.75)),Math.floor(random(0,2)),0));
  }
  v=new Vehicle(width/2,height/2,1,1);
}

function drawRoad(){
  let roadHeight=height*0.50;
  rectMode(CENTER);
  fill (0);
  noStroke();
  rect(width/2,height/2,width,roadHeight);
  stroke("yellow");
  strokeWeight(3);
  for (let i =0;i<width;i+=55) line(i,height/2,i+30,height/2);
}

function drawCar(x,y,c){
  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(x-15,y,10,26);
  rect(x+15,y,10,26);
  fill (c);
  rect(x,y,50,20);
}

function drawTruck(x,y,c,direction){
  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(x-15,y,10,36);
  rect(x+15,y,10,36);
  fill (c);
  rect(x,y,50,30);
  if (direction===0) line(x-12,y+15,x-12,y-15)  // left
  else if (direction===1) line(x+12,y+15,x+12,y-15)  // right
}

function draw() {
  background(220);
  drawRoad();
  for (let e of eastbound) e.action();
  for (let w of westbound) w.action();
//   v.display();
//   v.move();
//   v.speedUp();
}

class Vehicle{
  constructor(x,y,type,direction){
    this.type=type;  //0- car,  1- truck/van
    this.color=color(random(255),random(255),random(255));
    this.x=x;
    this.y=y;
    this.direction=direction;  //0- left, 1- right
    this.xSpeed=7;
    if (this.direction===0) this.xSpeed*=-1;
  }

  display(){
    if (this.type===0) drawCar(this.x,this.y,this.color);
    else if (this.type===1) drawTruck(this.x,this.y,this.color,this.direction)
  }

  move(){
    this.x += this.xSpeed;
    if (this.x-25>width) this.x=-25;
    if (this.x+25<0) this.x=width+25;
  }
  

  speedUp(){
    if (this.direction===0 && this.xSpeed>-15) this.xSpeed--;
    if (this.direction===1 && this.xSpeed<15) this.xSpeed++;
  }

  speedDown(){
    if (this.direction===0 && this.xSpeed!==0) this.xSpeed++;
    if (this.direction===1 && this.xSpeed!==0) this.xSpeed--;
  }

  changeColor(){
    this.color=color(random(255),random(255),random(255));
  }

  action(){
    this.move();
    if (Math.floor(random(100))===1) this.speedUp();
    if (Math.floor(random(100))===1) this.speedDown();
    if (Math.floor(random(100))===1) this.changeColor();
    this.display();
  }
}