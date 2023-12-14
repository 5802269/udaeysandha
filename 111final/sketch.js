let serial;

function setup(){
  createCanvas(320,240);
  serial = new p5.SerialPort();
  serial.open("USB\VID_2341&PID_0043\55736313937351C04001");
}

function draw(){
  background("#3399EE");
  fill(255);
  text(mouseY,width/2,height/2);
}

function mouseDragged(){
  serial.write(mouseY);
}