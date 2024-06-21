#include <RF24.h>

// defining radio pins
RF24 NRF24L01(7, 8);

// byte addresses for both transmitter and receiver
byte address[][6] = { "pipe1", "pipe2" };

// using a struct to receive data at once instead of multiple variables for better and more successful information transfer
struct ControlData {
  boolean forward;
  boolean backward;
  boolean left;
  boolean right;
  int duration;
};

// globally initializing controlData as a struct
ControlData controlData;

void setup() {
  // motor driver pins
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);

  // setting up the rf
  NRF24L01.begin();
  NRF24L01.openReadingPipe(1, address[0]);  // Open reading pipe from address pipe 2
  NRF24L01.openWritingPipe(address[1]);     // Open writing pipe to address pipe 1
  NRF24L01.setPALevel(RF24_PA_MAX);
  NRF24L01.setDataRate(RF24_250KBPS);
  NRF24L01.setChannel(110);
}

void loop() {
  // listening for available transmitions
  NRF24L01.startListening();

  if (NRF24L01.available()) {
  // check if transmition is available

  // reading the data and storing in controlData struct
    NRF24L01.read(&controlData, sizeof(controlData));

    // preforming commands based on which command received was true
    if (controlData.forward) {
      moveForward();
    } else if (controlData.backward) {
      moveBackward();
    } else if (controlData.left) {
      moveLeft();
    } else if (controlData.right) {
      moveRight();
    }
  }
}

void stop() {
  // called after a command has been started, uses the duration received to delay before stoping the command
  delay(controlData.duration);  //delay 

  // stoping
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
}

void moveForward() {
  // moves the robot forward
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  stop();
}

void moveBackward() {
  // moves the robot backwards
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  digitalWrite(9, HIGH);
  digitalWrite(10, LOW);
  stop();
}

void moveLeft() {
  // turns the robot left
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  stop();
}

void moveRight() {
  // tunrs the robot right
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  digitalWrite(9, HIGH);
  digitalWrite(10, LOW);
  stop();
}