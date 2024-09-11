#include <Servo.h>
#include "Arduino.h"
#include "SoftwareSerial.h"
#include "DFRobotDFPlayerMini.h"

SoftwareSerial mySoftwareSerial(51, 53); // RX, TX
DFRobotDFPlayerMini myDFPlayer;
int destination;
int current;
bool play = false;

Servo myservo2;
Servo myservo4;
Servo myservo6;
Servo myservo8;
Servo myservo44;
Servo myservo49;
Servo myservo47;

int arraySortCh1[7] = { -100, -100, -100, -100, -100, -100, -100};
int arrayRawCh1[7] = { -100, -100, -100, -100, -100, -100, -100};
int arraySortCh2[7] = { -100, -100, -100, -100, -100, -100, -100};
int arrayRawCh2[7] = { -100, -100, -100, -100, -100, -100, -100};
int arraySortCh3[7] = { -100, -100, -100, -100, -100, -100, -100};
int arrayRawCh3[7] = { -100, -100, -100, -100, -100, -100, -100};
int arraySortCh4[7] = { -100, -100, -100, -100, -100, -100, -100};
int arrayRawCh4[7] = { -100, -100, -100, -100, -100, -100, -100};

#define CH1 13
#define CH2 12
#define CH3 9
#define CH4 8
#define CH5 10
#define CH6 11
int ch1Destination;

// Read the number of a given channel and convert to the range provided.
// If the channel is off, return the default value
int readChannel(int channelInput, int minLimit, int maxLimit, int defaultValue) {
  int ch = pulseIn(channelInput, HIGH, 30000);
  if (ch < 100) return defaultValue;
  return map(ch, 1000, 2000, minLimit, maxLimit);
}

// Read the channel and return a boolean value
bool redSwitch(byte channelInput, bool defaultValue) {
  int intDefaultValue = (defaultValue) ? 100 : 0;
  int ch = readChannel(channelInput, 0, 100, intDefaultValue);
  return (ch > 50);
}

void addReading(int a, int* arrayRaw) {
  for (int i = 0; i < 6 ; i++) {
    arrayRaw[i] = arrayRaw[i + 1];
  }
  arrayRaw[6] = a;
}

void sortReading(int* arrayRaw, int* arraySort) {
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

int filterChannel(int channelInput, int minLimit, int maxLimit, int defaultValue, int* arrayRaw, int* arraySort) {
  int ch = pulseIn(channelInput, HIGH, 30000);
  if (ch < 100) return defaultValue;

  addReading(ch, arrayRaw);
  sortReading(arrayRaw, arraySort);

  return map(arraySort[3], 1000, 2000, minLimit, maxLimit);
}

void setup() {
  delay(1000);
  mySoftwareSerial.begin(9600);
  Serial.begin(115200);

  Serial.println();
  Serial.println(F("DFRobot DFPlayer Mini Demo"));
  Serial.println(F("Initializing DFPlayer ... (May take 3~5 seconds)"));

  if (!myDFPlayer.begin(mySoftwareSerial)) {  //Use softwareSerial to communicate with mp3.
    Serial.println(F("Unable to begin:"));
    Serial.println(F("1.Please recheck the connection!"));
    Serial.println(F("2.Please insert the SD card!"));
    while (true);
  }
  Serial.println(F("DFPlayer Mini online."));

  myDFPlayer.volume(30);  //Set volume value. From 0 to 30

  pinMode(CH1, INPUT);
  pinMode(CH2, INPUT);
  pinMode(CH3, INPUT);
  pinMode(CH4, INPUT);
  pinMode(CH5, INPUT);
  pinMode(CH6, INPUT);
  myservo2.attach(52);
  myservo2.write(10);
  myservo4.attach(48);
  myservo6.attach(46);
  myservo8.attach(50);
  myservo8.write(0);
  myservo44.attach(44);
  myservo49.attach(49);
  myservo47.attach(47);
  myservo4.writeMicroseconds(750);
  myservo44.writeMicroseconds(750);
  
}

int ch1Value, ch2Value, ch3Value, ch4Value , ch6Value;
bool ch5Value;

void loop() {
  ch1Value = filterChannel(CH1, -100, 100, 0, arrayRawCh1, arraySortCh1);
  ch2Value = filterChannel(CH2, -100, 100, 0, arrayRawCh2, arraySortCh2);
  ch3Value = filterChannel(CH3, -100, 100, -100, arrayRawCh3, arraySortCh3);
  ch4Value = filterChannel(CH4, -100, 100, -100, arrayRawCh4, arraySortCh4);
  ch5Value = redSwitch(CH5, false);
  ch6Value = redSwitch(CH6, false);

  Serial.print("Ch1: ");
  Serial.print(ch1Value);
  Serial.print(" Ch2: ");
  Serial.print(ch2Value);
  Serial.print(" Ch3: ");
  Serial.print(ch3Value);
  Serial.print(" Ch4: ");
  Serial.print(ch4Value);
  Serial.print(" Ch5: ");
  Serial.print(ch5Value);
  Serial.print(" Ch6: ");
  Serial.println(ch6Value);

if (ch6Value) {
  if (ch5Value == 1) myservo47.write(180), play = true;
  else {
    myservo47.write(120);
    if (play) {
//      myDFPlayer.play(1);
      play = false;
    }  //Play the first mp3
  }
  } else {
    if (ch5Value == 1) myservo6.write(180), play = true;
  else {
    myservo6.write(120);
    if (play) {
//      myDFPlayer.play(1);
      play = false;
    }  //Play the first mp3
  }
  }
  
//  if (ch5Value == 1) myservo6.write(180), play = true;
//  else {
//    myservo6.write(120);
//    if (play) {
//      Serial.print ("yes");
//      myDFPlayer.play(1);
//      Serial.print ("yes");
//      play = false;
//    }  //Play the first mp3
//  }


  if (ch4Value != 0 && ch4Value >= -102) myservo8.write(int(map(ch4Value, -100, 100, 0, 50))), Serial.println((int(map(ch4Value, -100, 100, 0, 50))));

  if (ch6Value) {
    myservo49.write(100);
    if (ch2Value < -50) {
      myservo44.writeMicroseconds(0);
    } else if (ch2Value > 50) {
      myservo44.writeMicroseconds(1500);
    } else {
      myservo44.writeMicroseconds(750);
    }
  } else {
    myservo49.write(10);
    if (ch2Value < -50) {
      myservo4.writeMicroseconds(0);
    } else if (ch2Value > 50) {
      myservo4.writeMicroseconds(1500);
    } else {
      myservo4.writeMicroseconds(750);
    }
  }


  if (ch3Value > 90) ch1Destination = -45;
  else if (ch3Value < 10 && ch3Value > -10) ch1Destination = -75;
  else if (ch3Value >= -102)ch1Destination = -100;

  ch1Destination += map(ch1Value, -100, 100, -10, 10);
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
}
