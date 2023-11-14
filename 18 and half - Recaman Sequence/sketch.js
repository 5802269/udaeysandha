// Recaman Sequence
// Udaey Sandha
// Nov 14, 2023

//let cX = 0;
let sequence = []; // Array to hold the recaman numbers
let stepAmount = 1; // How much the next step will be by
let currentValue = 0; // most recent number in the sequence
let largest = 0, scaleAmount = 0; // dynamic scaling
let arcList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill();
}

function addToSequence() {
  // generate the next number in the Recaman Sequence
  let backwards = currentValue - stepAmount;
  if (backwards > 0 && !sequence.includes(backwards)) {
    // do some drawing stuff here....
    arcList.push(new rArc(currentValue,backwards,sequence.length%2));
    sequence.push(backwards);
    currentValue = backwards;
    stepAmount++;
  } else {
    // next number is forward instead
    let forwards = currentValue + stepAmount;
    // do some drawing stuff here....
    arcList.push(new rArc(currentValue,forwards,sequence.length%2));
    sequence.push(forwards);
    currentValue = forwards;
    stepAmount++;
    if (currentValue > largest) largest = currentValue;
  }
}

function draw() {
  background(0);
  translate(0,height/2);
  addToSequence();
  scaleAmount = lerp(scaleAmount,width/largest,0.05);
  scale(scaleAmount);
  // temporary code :
  // cX = lerp(cX,mouseX,0.1);
  // circle(cX,height/2,80);
  renderArcs();
}

function renderArcs(){
  for(let r of arcList){
    r.display();
  }
}

class rArc {
  constructor(start, end, direction) {
    this.start = start;
    this.end = end;
    this.direction = direction;  // 0 - forward : upper arc
  }                              // 1 - backwards : loer arc
  display(){
    let diameter = abs(this.start - this.end);
    let x = (this.start + this.end) /2;
    strokeWeight(0.5);
    if (this.direction === 0) arc(x,0,diameter,diameter,PI,0);
    else arc(x,0,diameter,diameter,0,PI);
  }
}