// Cars Cars Cars
// Udaey Sandha
// October 17, 2023
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class
//----------------------------------------------------------------------------------------------------------------

// Global Variables
let trafficLight,
  frameCounter = 0;

// Arrays to hold vehicles traveling in different directions
let eastbound = [],
  westbound = [];
//----------------------------------------------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  initVehicles();  // Initialize the vehicles and traffic light
  trafficLight = new TrafficLight();
}
//----------------------------------------------------------------------------------------------------------------

function initVehicles() {
  // Creating vehicles and add them to the appropriate arrays
  for (let i = 0; i < 20; i++) {
    // Vehicles going right
    eastbound.push(
      new Vehicle(
        Math.floor(random(width)),
        Math.floor(random(height * 0.25 + 13, height / 2 - 20)),
        Math.floor(random(0, 2)),
        1
      )
    );
    // Vehicles going left
    westbound.push(
      new Vehicle(
        Math.floor(random(width)),
        Math.floor(random(height / 2 + 20, height * 0.75 - 13)),
        Math.floor(random(0, 2)),
        0
      )
    );
  }
}
//----------------------------------------------------------------------------------------------------------------

function drawRoad() {
  // defining road stuff
  const ROAD_HEIGHT = height * 0.5,
    SPACE_BETWEEN_YELLOW_LINES = 55,
    YELLOW_LINE_LENGTH = 30;

  // Drawing the road
  fill(0);
  noStroke();
  rect(width / 2, height / 2, width, ROAD_HEIGHT);

  // Draw yellow lines in the middle of road
  stroke("yellow");
  strokeWeight(3);
  for (let i = 0; i < width; i += SPACE_BETWEEN_YELLOW_LINES) line(i, height / 2, i + YELLOW_LINE_LENGTH, height / 2);
}
//----------------------------------------------------------------------------------------------------------------

function drawCar(x, y, c) {
  // Draw a car with given position and color
  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(x - 15, y, 10, 26);
  rect(x + 15, y, 10, 26);
  fill(c);
  rect(x, y, 50, 20);
}
//----------------------------------------------------------------------------------------------------------------

function drawTruck(x, y, c, direction) {
  // Draw a truck with given positon and color
  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(x - 15, y, 10, 36);
  rect(x + 15, y, 10, 36);
  fill(c);
  rect(x, y, 50, 30);
  if (direction === 0) line(x - 12, y + 15, x - 12, y - 15); // left facing truck
  else if (direction === 1) line(x + 12, y + 15, x + 12, y - 15); // right facing truck
}
//----------------------------------------------------------------------------------------------------------------

function drawTrafficLight(c) {
  // Drawing a traffic light
  fill(120);
  rect(width / 2, height * 0.122, 160, 80);

  // Drawing the green light
  if (trafficLight.colorIndex === 0) {
    fill(c);
    circle(width / 2 - 35, height * 0.122, 60);
    fill(0);
    circle(width / 2 + 35, height * 0.122, 60);
  }
  // Drawing the red light
  if (trafficLight.colorIndex === 1) {
    fill(0);
    circle(width / 2 - 35, height * 0.122, 60);
    fill(c);
    circle(width / 2 + 35, height * 0.122, 60);
  }
}
//----------------------------------------------------------------------------------------------------------------

function keyPressed() {
  // Changing the traffic light color and reseting the framecounter
  if (key === " ") trafficLight.change(), (frameCounter = 0);
}
//----------------------------------------------------------------------------------------------------------------

function mousePressed() {
  if (mouseButton === LEFT) {
    // If left mouse and shift is pressed add a vehicle to west bound
    if (keyIsPressed && keyCode === SHIFT)
      westbound.push(
        new Vehicle(
          Math.floor(random(width)),
          Math.floor(random(height / 2 + 20, height * 0.75 - 13)),
          Math.floor(random(0, 2)),
          0
        )
      );
    // If only left mouse is pressed add a veicle to east bound
    else
      eastbound.push(
        new Vehicle(
          Math.floor(random(width)),
          Math.floor(random(height * 0.25 + 13, height / 2 - 20)),
          Math.floor(random(0, 2)),
          1
        )
      );
  }
}
//----------------------------------------------------------------------------------------------------------------

function draw() {
  background(220);
  drawRoad();

  // Updating and displaying the vehicles
  for (let e of eastbound) e.action();
  for (let w of westbound) w.action();

  // Display traffic light
  trafficLight.display();

  // Changing color to back to green
  if (frameCounter >= 120 && trafficLight.colorIndex === 1) {
    trafficLight.colorIndex = 0;
  }
  frameCounter++;
}
//----------------------------------------------------------------------------------------------------------------

class Vehicle {
  constructor(x, y, type, direction) {
    this.type = type; //0- car,  1- truck/van
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.direction = direction; //0- left, 1- right
    this.xSpeed = Math.floor(random(15));
    if (this.direction === 0) this.xSpeed *= -1;  // Reversing speed for leftbound vehicles
  }
  //----------------------------------------------------------------------------------------------------------------

  display() {
    // Displaying a car or a truck
    if (this.type === 0) drawCar(this.x, this.y, this.color);
    else if (this.type === 1) drawTruck(this.x, this.y, this.color, this.direction);
  }
  //----------------------------------------------------------------------------------------------------------------

  move() {
    // Update position according to speed
    this.x += this.xSpeed;

    // Wraping the vehicle around when it goes off screen
    if (this.x - 25 > width) this.x = -25;
    if (this.x + 25 < 0) this.x = width + 25;
  }
  //----------------------------------------------------------------------------------------------------------------

  speedUp() {
    // Increasing the speed depending on direction
    if (this.direction === 0 && this.xSpeed > -15) this.xSpeed--;
    if (this.direction === 1 && this.xSpeed < 15) this.xSpeed++;
  }
  //----------------------------------------------------------------------------------------------------------------

  speedDown() {
    // Decreasing teh speed depending on direction
    if (this.direction === 0 && this.xSpeed !== 0) this.xSpeed++;
    if (this.direction === 1 && this.xSpeed !== 0) this.xSpeed--;
  }
  //----------------------------------------------------------------------------------------------------------------

  changeColor() {
    // Changing teh vehicle color to random
    this.color = color(random(255), random(255), random(255));
  }
  //----------------------------------------------------------------------------------------------------------------

  stop() {
    // Stoping the vehicle by changing speed to 0
    this.xSpeed = 0;
  }
  //----------------------------------------------------------------------------------------------------------------

  action() {
    // Updates the position
    this.move();

    // 1% chance of speeding up, speeding down or changing color
    if (Math.floor(random(100)) === 1) this.speedUp();
    if (Math.floor(random(100)) === 1) this.speedDown();
    if (Math.floor(random(100)) === 1) this.changeColor();

    // Displaying the vehicle
    this.display();

    // Stoping the vehicles if light is red
    if (trafficLight.colorIndex === 1) this.stop();
  }
}
//----------------------------------------------------------------------------------------------------------------

class TrafficLight {
  constructor() {
    // defining colors
    this.color = [color("green"), color("red")];
    this.colorIndex = 0;
  }
  //----------------------------------------------------------------------------------------------------------------

  change() {
    // Chaningthe color
    this.colorIndex = (this.colorIndex + 1) % this.color.length;
    print(this.color);
  }
  //----------------------------------------------------------------------------------------------------------------

  display() {
    // Displaying the vehicle
    drawTrafficLight(this.color[this.colorIndex]);
  }
}
//----------------------------------------------------------------------------------------------------------------
//End