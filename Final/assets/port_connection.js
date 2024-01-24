// code for connecting to the arduino stolen form the web-serial.js library
let port, reader, writer;

async function setup() {
	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
}