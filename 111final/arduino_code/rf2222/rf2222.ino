#include <RF24.h>

RF24 NRF24L01(7, 8);

byte address[][6] = {"pipe1", "pipe2"};

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
   boolean forward=false, backward=false, left=false, right=false;
    Serial.println(forward);
    NRF24L01.read(&forward, sizeof(forward));
    NRF24L01.read(&backward, sizeof(backward));
    NRF24L01.read(&left, sizeof(left));
    NRF24L01.read(&right, sizeof(right));
    Serial.println(forward);

    // Perform actions based on received control signals
    if (forward) {
      // Perform actions for forward
      digitalWrite(5, HIGH);
      digitalWrite(6, LOW);
      digitalWrite(9, HIGH);
      digitalWrite(10, LOW);
      delay(500);
      digitalWrite(5, LOW);
      digitalWrite(6, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
    } else if (backward) {
      digitalWrite(5, LOW);
      digitalWrite(6, HIGH);
      digitalWrite(9, LOW);
      digitalWrite(10, HIGH);
    } else if (left) {
      // Perform actions for left
      // Add your left actions here
    } else if (right) {
      // Perform actions for right
      // Add your right actions here
    }
  }
}
