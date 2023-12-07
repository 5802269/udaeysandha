// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let b = p5.board("/dev/cu.usbmodem1421", "arduino");
let led;

function setup() {
  led = b.pin(9, "LED");
}

function keyPressed() {
  if (keyCode === LEFT_ARROW){
    led.on();
  } else if (keyCode === RIGHT_ARROW) {
    led.off();
  } else if (keyCode === UP_ARROW){
    led.blink();
    console.log("Hello, World!"); 
  } else if (keyCode === DOWN_ARROW) {
    led.noBlink();
  }
}

// let sensorVal = 0;

// function preload() {
//   loadBoard();
// }

// function setup() { 
//   const sensor = new five.Sensor('A0');
//   sensor.on('change', () => {
//     sensorVal = sensor.scaleTo(0, 300);
//   });
//   createCanvas(400, 400);
// } 

// function draw() { 
//   background('blue');
//   rect(50, 150, sensorVal, 100);
// }
