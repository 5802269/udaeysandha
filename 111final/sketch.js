// let port, reader, writer;

// async function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	background("black");

// 	noLoop();
// 	({ port, reader, writer } = await getPort());
// 	loop();
// }

// async function draw() {	if (port) {
// 	try {
// 		if (mouseIsPressed) {
// 			background("RED");
// 			await writer.write("clicked!\n");
// 		}
// 		else {
// 			background("BLACK");
// 			await writer.write("not clicked!\n");
// 		}
// 	} catch (e) { console.error(e) }
// }
// }

let blocks = [];
function setup(){
  createCanvas(400,400);
  blocks.push(new Block("setup", 50, 50));  // Create a block named "setup"
  blocks.push(new Block("digitalWrite", 150, 150));
  blocks.push(new Block("delay", 250, 250));

}

function draw() {
	background(150);  // Set a light gray background
  
	for (let block of blocks) {
	  block.draw();  // Draw each block from the list
	}
  }
  
class Block {
  constructor(name, x, y) {
    // Properties of a block:
    this.name = name;  // Name of the block (like "setup" or "digitalWrite")
    this.x = x;        // Position on the canvas (where it's drawn)
    this.y = y;
	this.width = 100;  // Width of the block
	this.height = 50;  // Height of the block
}

  // Instructions for drawing the block:
  draw() {
    fill(255);  // Fill the block with white color
    stroke(0);  // Outline the block with black color
    rect(this.x, this.y, this.width, this.height);  // Draw the rectangle shape
    textSize(16);  // Set text size
    text(this.name, this.x + 10, this.y + 30);  // Write the block's name inside
  }
}