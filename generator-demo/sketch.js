let port, reader, writer;

async function setup() {

	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
}