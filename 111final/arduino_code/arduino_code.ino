String val;     // Data received from serial port
int ledPin = LED_BUILTIN;  // Arduino built-in LED
bool ledState = false;

void setup() {
    pinMode(ledPin, OUTPUT);
    pinMode(11, OUTPUT);
    pinMode(12, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    val = "";
    if (Serial.available()) {
        // If data is available to read,
        val = Serial.readStringUntil('\n');
        val.trim();
    }

    if (val == "clicked!") {
      digitalWrite(11, HIGH); 
      digitalWrite(12, LOW); 

    }
    else if (val == "not clicked!"){
      digitalWrite(11, LOW);
      digitalWrite(12, LOW);
    }
}
