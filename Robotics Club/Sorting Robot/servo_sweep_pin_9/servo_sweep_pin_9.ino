// C++ code
//
#include <Servo.h>

Servo servo_9;

void setup()
{
  servo_9.attach(9, 500, 2500);
}

void loop()
{
  servo_9.write(10);
  delay(1000); // Wait for 1000 millisecond(s)
  servo_9.write(170);
  delay(1000); // Wait for 1000 millisecond(s)
}
