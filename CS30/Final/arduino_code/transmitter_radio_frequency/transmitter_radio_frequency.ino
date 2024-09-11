#include <RF24.h>

// defining pins
#define confirmLed 2
RF24 NRF24L01(7, 8);

// byte addresses for both transmitter and receiver
byte address[][6] = { "pipe1", "pipe2" };

// using a struct to transmit data at once instead of multiple variables for better and more successful information transfer
struct ControlData {
  boolean forward;
  boolean backward;
  boolean left;
  boolean right;
  int duration;
};

void setup() {
  // confirmLed pinmode
  pinMode(confirmLed, OUTPUT);

  // Initialize serial communication to receive commands
  Serial.begin(9600);

  // setting up the rf
  NRF24L01.begin();
  NRF24L01.openWritingPipe(address[0]);
  NRF24L01.openReadingPipe(1, address[1]);
  NRF24L01.setPALevel(RF24_PA_MAX);
  NRF24L01.setDataRate(RF24_250KBPS);
  NRF24L01.setChannel(110);
}

void loop() {
  // calling function
  sendControlSignal();
}

void sendControlSignal() {  // transmitting rf then needed

  //initializing controlData as a struct
  ControlData controlData;

  // Check if there is serial data available to read
  if (Serial.available()) {
    // Read the incoming serial data
    String serialData = Serial.readStringUntil('\n');  // reading the direction
    String timeData = Serial.readStringUntil('\n');  // reading the time

    // timeData to int
    controlData.duration = timeData.toInt();

    // make sure all commands are false
    controlData.forward = false;
    controlData.backward = false;
    controlData.left = false;
    controlData.right = false;

    // determinting which command to transmit by comparing serial data and making it true
    if (serialData == "forward") {
      controlData.forward = true;

    } else if (serialData == "backward") {
      controlData.backward = true;

    } else if (serialData == "left") {
      controlData.left = true;

    } else if (serialData == "right") {
      controlData.right = true;
    }

    // transmitting the data
    NRF24L01.write(&controlData, sizeof(controlData));

    // flash the LED to indicate signal transmission
    digitalWrite(confirmLed, HIGH);
    delay(100);
    digitalWrite(confirmLed, LOW);
  }
}
