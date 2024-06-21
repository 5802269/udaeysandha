#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address 0x27, 16 column and 2 rows



String val;

void setup() {
  pinMode(3, OUTPUT);
  pinMode(2, OUTPUT);
  Serial.begin(9600);
  lcd.init(); //initialize the lcd
  lcd.backlight(); //open the backlight 

}

void loop() {
  val = "";
  
  if (Serial.available()) {
    lcd.clear();
    // If data is available to read,
    val = Serial.readStringUntil('\n');
    val.trim();
    lcd.print(val);
//    val = Serial.readStringUntil('\n');
//    val.trim();
//    lcd.print(val);

    if (val == "forward") {
      digitalWrite(3, HIGH);
      delay(50);

    }
    else if (val == "backward") {
      digitalWrite(2, HIGH);
      delay(50);

    }
    else {
      digitalWrite(3, LOW);
      digitalWrite(2, LOW);
    }
  }
  digitalWrite(3, LOW);
  digitalWrite(2, LOW);
}
