#include <RF24.h>

RF24 NRF24L01(7, 8);

byte address[][6] = { "pipe1", "pipe2" };

struct ControlData {
  boolean forward;
  boolean backward;
  boolean left;
  boolean right;
  int duration;
};
ControlData controlData;

void setup() {
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);

  Serial.begin(9600);

  NRF24L01.begin();
  NRF24L01.openReadingPipe(1, address[0]);  // Open reading pipe from address pipe 2
  NRF24L01.openWritingPipe(address[1]);     // Open writing pipe to address pipe 1
  NRF24L01.setPALevel(RF24_PA_MAX);
  NRF24L01.setDataRate(RF24_250KBPS);
  NRF24L01.setChannel(110);
}

void loop() {
  NRF24L01.startListening();

  if (NRF24L01.available()) {
    //boolean forward = false, backward = false, left = false, right = false;
    //boolean controlSignals[] = {forward, backward, left, right};
    //NRF24L01.read(&controlSignals, sizeof(controlSignals));
    NRF24L01.read(&controlData, sizeof(controlData));
    Serial.println(controlData.duration);

    if (controlData.forward) {
      // Perform actions for forward
      moveForward();
    } else if (controlData.backward) {
      // Perform actions for backward
      moveBackward();
    } else if (controlData.left) {
      moveLeft();
    } else if (controlData.right) {
      moveRight();
    }
    // Perform actions based on received control signals
    // if (controlSignals[0]) {
    //   // Perform actions for forward
    //   moveForward();
    // } else if (controlSignals[1]) {
    //   // Perform actions for backward
    //   moveBackward();
    // } else if (controlSignals[2]) {
    //   moveLeft();
    // } else if (controlSignals[3]) {
    //   moveRight();
    // }
  }
}

void stop() {
  delay(controlData.duration);
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
}

void moveForward() {
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  stop();
}

void moveBackward() {
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  digitalWrite(9, HIGH);
  digitalWrite(10, LOW);
  stop();
}

void moveLeft() {
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  stop();
}

void moveRight() {
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  digitalWrite(9, HIGH);
  digitalWrite(10, LOW);
  stop();
}