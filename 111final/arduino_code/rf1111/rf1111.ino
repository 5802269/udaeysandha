#include <RF24.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address 0x27, 16 column and 2 rows

#define confirmLed 2
#define led 3

RF24 NRF24L01(7, 8);

byte address[][6] = {"pipe1", "pipe2"};

void setup() {
  pinMode(confirmLed, OUTPUT);
  pinMode(led, OUTPUT);

  Serial.begin(9600); // Initialize serial communication

  NRF24L01.begin();
  NRF24L01.openWritingPipe(address[0]);
  NRF24L01.openReadingPipe(1, address[1]);
  NRF24L01.setPALevel(RF24_PA_MAX);
  NRF24L01.setDataRate(RF24_250KBPS);
  NRF24L01.setChannel(110);

  lcd.init(); //initialize the lcd
  lcd.backlight(); //open the backlight 
}

void loop() {
  delay(10);
  NRF24L01.stopListening();

  sendControlSignal();

  delay(10);
  NRF24L01.startListening();

  if (NRF24L01.available()) {
    // Handle any incoming radio signals if needed
  }
}

void sendControlSignal() {
  // Check if there is serial data available to read
  if (Serial.available()) {
    lcd.clear();
    // Read the incoming serial data
    String serialData = Serial.readStringUntil('\n');
    lcd.print(serialData);
    boolean forward=false, backward=false, left=false, right=false;
    // Send the appropriate radio signal based on the received serial data
    if (serialData == "forward") {
      lcd.print("yes");
      forward=true;
      NRF24L01.write(&forward, sizeof(forward));
    } else if (serialData == "backward") {
      lcd.print("no");
      backward=true;
      lcd.print(backward);
      NRF24L01.write(&backward, sizeof(backward));
    } else if (serialData == "left") {
      left=true;
      NRF24L01.write(&left, sizeof(left));
    } else if (serialData == "right") {
      right=true;
      NRF24L01.write(&right, sizeof(right));
    }

  }
}

void sendSignal(boolean forward, boolean backward, boolean left, boolean right) {
  // Send a radio signal with control signals
  NRF24L01.write(&forward, sizeof(forward));
  NRF24L01.write(&backward, sizeof(backward));
  NRF24L01.write(&left, sizeof(left));
  NRF24L01.write(&right, sizeof(right));

  // Optional: Flash the LED to indicate signal transmission
  digitalWrite(confirmLed, HIGH);
  delay(100);
  digitalWrite(confirmLed, LOW);
}
