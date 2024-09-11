
#include <Servo.h>
#include "Arduino.h"
#include "SoftwareSerial.h"
#include "DFRobotDFPlayerMini.h"

SoftwareSerial mySoftwareSerial(12,13); // RX, TX
DFRobotDFPlayerMini myDFPlayer;

Servo myservo2;
Servo myservo4;
Servo myservo6;
Servo myservo8;

int arraySort[7] = { -100, -100, -100, -100, -100, -100, -100};
int arrayRaw[7] = { -100, -100, -100, -100, -100, -100, -100};
int destination;
int current;

#define CH1 5
#define CH2 6
#define CH3 9
#define CH4 11
#define CH5 10
int ch1Destination;

// Read the number of a given channel and convert to the range provided.
// If the channel is off, return the default value
int readChannel(int channelInput, int minLimit, int maxLimit, int defaultValue) {
  int ch = pulseIn(channelInput, HIGH, 30000);
  if (ch < 100) return defaultValue;
  return map(ch, 1000, 2000, minLimit, maxLimit);
}

// Red the channel and return a boolean value
bool redSwitch(byte channelInput, bool defaultValue) {
  int intDefaultValue = (defaultValue) ? 100 : 0;
  int ch = readChannel(channelInput, 0, 100, intDefaultValue);
  return (ch > 50);
}


void setup() {
  delay(1000);
  Serial.begin(115200);
  mySoftwareSerial.begin(9600);
  pinMode(CH1, INPUT);
  pinMode(CH2, INPUT);
  pinMode(CH3, INPUT);
  pinMode(CH4, INPUT);
  pinMode(CH5, INPUT);
  myservo2.attach(2);
  myservo2.write(10);
  myservo4.attach(7);
  myservo6.attach(8);
  myservo8.attach(12);
}

int ch1Value, ch2Value, ch3Value, ch4Value;
bool ch5Value;

void addReading(int a) {
  for (int i = 0; i < 6 ; i++) {
    arrayRaw[i] = arrayRaw[i + 1];
  }
  arrayRaw[6] = a;
}

void sortReading() {
  for (int i = 0; i < 6 ; i++) {
    arraySort[i] = arrayRaw[i];
  }
  int swap = 1;

  while (swap == 1) {
    swap = 0;
    for (int i = 0; i < 6 ; i++) {
      if (arraySort[i] > arraySort[i + 1]) {
        int t = arraySort[i];
        arraySort[i] = arraySort[i + 1];
        arraySort[i + 1] = t;
        swap = 1;
      }
    }
  }
}

void loop() {
  ch1Value = readChannel(CH1, -100, 100, 0);
  addReading(ch1Value);
  sortReading();
  ch1Value = arraySort[3];
  ch2Value = readChannel(CH2, -100, 100, 0);
  ch3Value = readChannel(CH3, -100, 100, -100);
  ch4Value = readChannel(CH4, -100, 100, 0);
  ch5Value = redSwitch(CH5, false);

  Serial.print("Ch1: ");
  Serial.print(ch1Value);
  Serial.print(" Ch2: ");
  Serial.print(ch2Value);
  Serial.print(" Ch3: ");
  Serial.print(ch3Value);
  Serial.print(" Ch4: ");
  Serial.print(ch4Value);
  Serial.print(" Ch5: ");
  Serial.println(ch5Value);

  if (ch5Value==1) myservo6.write(180);
  else myservo6.write(120);

  myservo8.write(int(map(ch4Value, -100, 100, 0, 50)));

  {
    if (ch2Value < -50) {
      myservo4.writeMicroseconds(0);
    } else if (ch2Value > 50) {
      myservo4.writeMicroseconds(1500);
    } else{
      myservo4.writeMicroseconds(750);
    }
  }

if (ch3Value>90) ch1Destination = -40;
else if (ch3Value<10 && ch3Value>-10) ch1Destination = -62;
else ch1Destination = -100;

ch1Destination+=map(ch1Value,-100,100,-5,5);
  destination = ((map(ch1Destination, -100, 100, 10, 170)));
    if (abs(destination - current) > 2) {
    if (destination > current) {
      current += 2;
      myservo2.write(current);
    } else if (destination < current) {
      current -= 2;
      myservo2.write(current);
    }
    }




  
//  destination = ((map(ch1Value, -100, 100, 10, 170)));
//  if (abs(destination - current) > 1) {
//    if (destination > current) {
////      if (abs(destination-current)>30)current+=8;
////      else 
//      current += 2;
//      
//      myservo2.write(current);
//    } else if (destination < current) {
//      current -= 2;
//      myservo2.write(current);
//    }
//  }



}
