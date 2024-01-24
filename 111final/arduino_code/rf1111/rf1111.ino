#include <RF24.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);  // I2C address 0x27, 16 columns and 2 rows

#define confirmLed 2
#define led 3

RF24 NRF24L01(7, 8);

byte address[][6] = { "pipe1", "pipe2" };

struct ControlData {
  boolean forward;
  boolean backward;
  boolean left;
  boolean right;
  int duration;
};

void setup() {
  pinMode(confirmLed, OUTPUT);
  pinMode(led, OUTPUT);

  Serial.begin(9600);  // Initialize serial communication

  NRF24L01.begin();
  NRF24L01.openWritingPipe(address[0]);
  NRF24L01.openReadingPipe(1, address[1]);
  NRF24L01.setPALevel(RF24_PA_MAX);
  NRF24L01.setDataRate(RF24_250KBPS);
  NRF24L01.setChannel(110);

  lcd.init();       // Initialize the LCD
  lcd.backlight();  // Open the backlight
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
  ControlData controlData;
  if (Serial.available()) {
    lcd.clear();
    // Read the incoming serial data
    String serialData = Serial.readStringUntil('\n');
    lcd.print(serialData);
    String timeData = Serial.readStringUntil('\n');
    controlData.duration = timeData.toInt();
    lcd.print(controlData.duration);

    controlData.forward = false;
    controlData.backward = false;
    controlData.left = false;
    controlData.right = false;

    // Send the appropriate radio signal based on the received serial data
    if (serialData == "forward") {
      lcd.print("yes");
      controlData.forward = true;

    } else if (serialData == "backward") {
      lcd.print("no");
      controlData.backward = true;

    } else if (serialData == "left") {
      controlData.left = true;

    } else if (serialData == "right") {
      controlData.right = true;
    }

    //boolean controlSignals[] = { forward, backward, left, right };
    //NRF24L01.write(&controlSignals, sizeof(controlSignals));
    NRF24L01.write(&controlData, sizeof(controlData));
    // Optional: Flash the LED to indicate signal transmission
    digitalWrite(confirmLed, HIGH);
    delay(100);
    digitalWrite(confirmLed, LOW);
  }
}
