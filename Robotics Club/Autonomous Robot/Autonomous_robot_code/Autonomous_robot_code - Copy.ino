int M1_f;
int M1_b;
int M2_f;
int M2_b;

#include "CytronMotorDriver.h"   //motor controller library
#include <NewPing.h>             //ultrasonic sensor library
#include <Servo.h>               //servo library for 2 servos

#define MAX_DISTANCE 80 // Maximum distance for ultrasonic. Maximum sensor distance is rated at 400-500cm.

// Configure the motor driver.
CytronMD motor1(PWM_DIR, 5, 4);  // PWM 1 = Pin 3, DIR 1 = Pin 4.
CytronMD motor2(PWM_DIR, 6, 7); // PWM 2 = Pin 9, DIR 2 = Pin 10.

// Variables
int leftDistance;
int rightDistance;
int leftDistanceO;
int rightDistanceO;
int wallDegrees;

// Parameters for motion measurements
const int drive_distance = 100;   // cm
const int motor_offset = 5;       // Diff. when driving straight
const int wheel_d = 86;           // Wheel diameter (mm)
const float wheel_c = PI * wheel_d; // Wheel circumference (mm)
const int counts_per_rev = 374;   // 11 pulses per revolution * (34:1 gearbox)  = 374
const int mazeWallDistance = 30; //Space Between Walls Diameter (CHANGE LATER !!!!!!!!!!!) 38.1cm Actual Width Per Square <----------------

// Pins

const int enc_l_pin = 2;          // Motor A
const int enc_r_pin = 3;          // Motor B

const int ultraSonicEchoA = 8;    //Ultrasonic One - Echo       2 Ultrasonic Sensors used for navigation in the 
const int ultraSonicTrigA = 9;    //Ultrasonic One - Trigger    maze. Polled at each midpoint to decide next
const int ultraSonicEchoB = 10;   //Ultrasonic Two - Echo       navigation.
const int ultraSonicTrigB = 11;   //Ultrasonic Two - Trigger

const int tactileSensorPin = 3;   //push button used to detect collision with 4inch wall in front of cylinder   

const int servoPivotPin = 9;    //control the pivot servo for rack/pinion grabber
const int servoGripperPin = 11; //control the servo for rack/pinion gripping system

// Globals
volatile unsigned long enc_l = 0;   //two variables used for the motor encoders. Ensure motors moving at corresponding speeds.
volatile unsigned long enc_r = 0;


NewPing sonarRight(ultraSonicTrigA, ultraSonicEchoA, MAX_DISTANCE); // ultrasonic sensor for checking right
NewPing sonarLeft(ultraSonicTrigB, ultraSonicEchoB, MAX_DISTANCE);  // ultrasonic sensor for checking left
                                                                    //sonarRight.ping_cm()  and sonarLeft.ping_cm()  return sensing distance in CM

// Map
int x = 0;
int y = 0;
int squareLength = 38.1;
int location = [0,0];
int locationCm = [0,0];
int mazeMap = [[-1,0],[0,0,[1,0]],[1,0,[3,4]],[2,0,[1,4]],[3,0,[3,4]],[4,0,[1,4]],
               [-1,1],[0,1,[0]],[1,1,[1,4]],[2,1,[1,4]],[3,1,[1,4]],[4,1,[1,4]],
               [-1,2],[0,2,[1,4]],[1,2,[1,4]],[2,2,[1,4]],[3,2,[1,4]],[4,2,[1,4]]];



void setup(){
  // Debug
  Serial.begin(9600);

  // Set up pins
  pinMode(enc_l_pin, INPUT_PULLUP);
  pinMode(enc_r_pin, INPUT_PULLUP);


  // Set up interrupts
  attachInterrupt(digitalPinToInterrupt(enc_l_pin), countLeft, CHANGE);
  attachInterrupt(digitalPinToInterrupt(enc_r_pin), countRight, CHANGE);
}

void loop(){
  //Serial.println(enc_l);

  turnRight(90,100);
  turnCorrection();
}


// UltraSonic Sensor Echo Ping
int pingUltraS() {
  long duration, cm;
  //Serial.println(sonarRight.ping_cm());

  rightDistance = sonarRight.ping_cm();
  leftDistance = sonarLeft.ping_cm();
}









int turnCorrection() {
  //Store Inital Distances
  //pingUltraS();
  //int leftDistanceO = leftDistance;
  //int rightDistanceO = rightDistance;

  //Drive Straight Slighly
  //pingUltraS();
  //driveStraight(1,100);

  //Store Difference in Distance
  pingUltraS();
  //int leftDistanceDiff = leftDistance - leftDistanceO;
  //int rightDistanceDiff = rightDistance - rightDistanceO;

  //Calculate and Store Degrees to Wall
  Serial.println(leftDistance);
  //wallDegrees = pow(cos(mazeWallDistance/(leftDistance+rightDistance)),-1);
  wallDegrees = sqrt((1000-(mazeWallDistance/(leftDistance+rightDistance))*1000)*7);
  Serial.print("wallDegrees: ");
  Serial.println(wallDegrees);

  //Debug
  Serial.print("() Turn Correction -> ");
  Serial.print(leftDistance);
  Serial.print("cmL ");
  Serial.print(rightDistance);
  Serial.print("cmR ");

  //If Not Straight, Call Function Again
  if(leftDistance < 1 && leftDistance > -1 && rightDistance < 1 && rightDistance > -1){
    Serial.println("-> Turn Correction Complete ()");
  }else if(wallDegrees > 0){
    turnRight(wallDegrees,100);
    turnCorrection();
  }else if(wallDegrees < 0){
    turnLeft(wallDegrees,100);
    turnCorrection();
  }
}





void driveStraight(float dist, int power) {   //dist in CM,  power (0-255)
  // This function allows the robot to move forward or backwards for a set distance. The function
  // has loop that repeats until the distance is reached, so no additional delays() need to be 
  // added.

  // Distance argument - how far to travel in CM
  // Power Argument - speed at which to travel. Positive values( up to 255) for forwards, Negative (down to -255) for reverse
  
  unsigned long num_ticks_l;
  unsigned long num_ticks_r;

  // Set initial motor power
  int power_l = power;
  int power_r = power;

  // Used to determine which way to turn to adjust
  unsigned long diff_l;
  unsigned long diff_r;

  // Reset encoder counts
  enc_l = 0;
  enc_r = 0;

  // Remember previous encoder counts
  unsigned long enc_l_prev = enc_l;
  unsigned long enc_r_prev = enc_r;

  // Calculate target number of ticks
  float num_rev = (dist * 10) / wheel_c;  // Calculate number of revolutions necessary
  unsigned long target_count = num_rev * counts_per_rev;  //Convert to number of ticks to count

  // Debug
  Serial.print("Driving for ");
  Serial.print(dist);
  Serial.print(" cm (");
  Serial.print(target_count);
  Serial.print(" ticks) at ");
  Serial.print(power);
  Serial.println(" motor power");

  while ( (enc_l < target_count) && (enc_r < target_count) ) {

    // Sample number of encoder ticks
    num_ticks_l = enc_l;
    num_ticks_r = enc_r;

    // Print out current number of ticks
    Serial.print(num_ticks_l);
    Serial.print("\t");
    Serial.println(num_ticks_r);

    // Drive
    motor1.setSpeed(power_l);   // Motor 1 runs forward at 50% speed.
    motor2.setSpeed(power_r);  // Motor 2 runs backward at 50% speed.

    // Number of ticks counted since last time
    diff_l = num_ticks_l - enc_l_prev;
    diff_r = num_ticks_r - enc_r_prev;

    // Store current tick counter for next time
    enc_l_prev = num_ticks_l;
    enc_r_prev = num_ticks_r;

    // If left is faster, slow it down and speed up right
    if ( diff_l > diff_r ) {
      power_l -= motor_offset;
      power_r += motor_offset;
    }

    // If right is faster, slow it down and speed up left
    if ( diff_l < diff_r ) {
      power_l += motor_offset;
      power_r -= motor_offset;
    }

    // Brief pause to let motors respond
    delay(20);
  }

  // Brake
  motor1.setSpeed(0);   //turn both motors off when done
  motor2.setSpeed(0);

}





void turnRight(float angle, int power) {
  turn(angle, power);
}

void turnLeft(float angle, int power) {
  turn(angle * -1, power);
}

void turn(float angle, int power) {
  // This function will allow the robot to turn LEFT or RIGHT for a specific angle at a certain speed
  // angle given in degrees (negative angle for left turn, positive angle for right turn)
  // power given as a value between 0-255

  unsigned long num_ticks_l;
  unsigned long num_ticks_r;
  int power_l, power_r;

  // Set initial motor power
  if (angle > 0) {  //right turn
    power_l = power ;
    power_r = power * -1;
  }
  else {
    power_l = power * -1;
    power_r = power ;
  }

  // Used to determine which way to turn to adjust
  unsigned long diff_l;
  unsigned long diff_r;

  // Reset encoder counts
  enc_l = 0;
  enc_r = 0;

  // Remember previous encoder counts
  unsigned long enc_l_prev = enc_l;
  unsigned long enc_r_prev = enc_r;

  // Calculate target number of ticks
  float num_rev;

  if (angle > 0) num_rev = map(angle, 0, 360, 0, (150) / wheel_c * 360) / 100.0; //set the correct number of revolutions desired for this turn.
  else num_rev = map(angle * -1, 0, 360, 0, (150) / wheel_c * 360) / 100.0; //set the correct number of revolutions desired for this turn.
  unsigned long target_count = num_rev * counts_per_rev;

  // Debug
  Serial.print("Turning ");
  if (angle > 0) Serial.print("RIGHT ");
  else Serial.print("LEFT ");

  // Drive until one of the encoders reaches desired count
  while ( (enc_l < target_count) && (enc_r < target_count) ) {

    Serial.print("() Target:");
    Serial.print(target_count);
    Serial.println(" ()");

    // Sample number of encoder ticks
    num_ticks_l = enc_l;
    num_ticks_r = enc_r;

    // Print out current number of ticks
    Serial.print(num_ticks_l);
    Serial.print("\t");
    Serial.println(num_ticks_r);

    // Drive
    motor1.setSpeed(power_l);   // Motor 1 runs forward or backwards (depending on direction of turn)
    motor2.setSpeed(power_r);  // Motor 2 runs forward or backwards (depending on direction of turn)

    // Number of ticks counted since last time
    diff_l = num_ticks_l - enc_l_prev;
    diff_r = num_ticks_r - enc_r_prev;

    // Store current tick counter for next time
    enc_l_prev = num_ticks_l;
    enc_r_prev = num_ticks_r;

    // The following section works to balance the motor speeds based on the ticks measured from the
    // encoder. Adjustments different depending on if this is a LEFT or RIGHT turn.
    if (angle > 0) { //RIGHT Turn
      // If left is faster, slow it down and speed up right
      if ( diff_l > diff_r ) {
        power_l -= motor_offset;
        power_r -= motor_offset; //(makes negative power more negative)
      }

      // If right is faster, slow it down and speed up left
      if ( diff_l < diff_r ) {
        power_l += motor_offset;
        power_r += motor_offset;  //(brings negative speed closer to 0)
      }
    }
    else { //LEFT Turn   left-NEG  right-POS
      // If left is faster, slow it down and speed up right
      if ( diff_l > diff_r ) {
        power_l += motor_offset;  //(brings negative speed closer to 0)
        power_r += motor_offset;
      }

      // If right is faster, slow it down and speed up left
      if ( diff_l < diff_r ) {
        power_l -= motor_offset;
        power_r -= motor_offset;  //(makes negative power more negative)
      }
    }
    // Brief pause to let motors respond
    delay(20);
  }

  // Brake
  motor1.setSpeed(0);   // Motor 1 runs forward at 50% speed.
  motor2.setSpeed(0);  // Motor 2 runs backward at 50% speed.

}


void countLeft() {
  enc_l++;
}

void countRight() {
  enc_r++;
}
