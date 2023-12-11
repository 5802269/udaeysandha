function preload() {
  loadBoard();
}

function setup() {
  const motor = new five.Motor([2, 3]);
  motor.reverse(255);
}

function draw() {
  // draw stuff
}