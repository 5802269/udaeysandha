//
// begin license header
//
// This file is part of Pixy CMUcam5 or "Pixy" for short
//
// All Pixy source code is provided under the terms of the
// GNU General Public License v2 (http://www.gnu.org/licenses/gpl-2.0.html).
// Those wishing to use Pixy source code, software and/or
// technologies under different licensing terms should contact us at
// cmucam@cs.cmu.edu. Such licensing terms are available for
// all portions of the Pixy codebase presented here.
//
// end license header
//
// This sketch is a good place to start if you're just getting started with 
// Pixy and Arduino.  This program simply prints the detected object blocks 
// (including color codes) through the serial console.  It uses the Arduino's 
// ICSP SPI port.  For more information go here:
//
// https://docs.pixycam.com/wiki/doku.php?id=wiki:v2:hooking_up_pixy_to_a_microcontroller_-28like_an_arduino-29
//
  
#include <Pixy2.h>
#include <Servo.h>

// This is the main Pixy object 
Pixy2 pixy;

// Servo Objects
#define MIDDLE_SERVO 7 //0→closed   90→open //last gate
#define DIVERTER_SERVO 8 //PURPLE 70→angle non-red balls out   130→open track to conveyer (red)
#define FRONT_SERVO 9 //ORANGE 110→closed position   15→vertical open position  //first gate
#define AGITATOR_SERVO 10

Servo servo_gate_2;
Servo servo_diverter;
Servo servo_gate_1;
Servo servo_agitator;

void setup()
{
  Serial.begin(115200);
  Serial.print("Starting...\n");
  servo_gate_2.attach(MIDDLE_SERVO, 500, 2500);
  servo_diverter.attach(DIVERTER_SERVO, 500, 2500);
  servo_gate_1.attach(FRONT_SERVO, 500, 2500);
  servo_agitator.attach(AGITATOR_SERVO, 500, 2500);
//initialize servo positions
  servo_gate_2.write(0);  //closed
  servo_diverter.write(70); //non-red
  servo_gate_1.write(15); //closed
  servo_agitator.write(30);


  pixy.init();
}

void loop()
{   
  //Let in a single ball
  Serial.println("NEXT BALL");
  servo_gate_1.write(75);
  delay(300);
  servo_gate_1.write(15);
  delay(1000); //time for blocks to be detected

  //grab blocks, the position diverter
  pixy.ccc.getBlocks();
  if (pixy.ccc.numBlocks)
  { 
    Serial.print("Red Detected ");
    servo_diverter.write(130);
  }
  else{
    Serial.println("No Red Detected");
    servo_diverter.write(70);
  }
  delay(600); //some time for the diverter to move

  // Open middle gate and allow ball to roll
  Serial.print("Move and Divert Ball");
  servo_gate_2.write(90);
  delay(1000);
  Serial.println("....closing middle gate.");
  servo_gate_2.write(0);
  delay(500);

  if (servo_agitator.read() == 30) servo_agitator.write(170);
  else servo_agitator.write(30);
    
}
