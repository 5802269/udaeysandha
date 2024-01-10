//#include //comes with Arduino

#include "RF24.h"//can be found through the IDE: Sketch/Include Library/Manage Libraries/ Search for RF24 and locate RF24 by TMRh20/ more info / Install

//set up the button and LEDs

#define button 4

#define confirmLed 2

#define led 3

RF24 NRF24L01 (7, 8);//create object called NRF24L01. specifying the CE and CSN pins to be used on the Arduino

byte address[] [6] = {"pipe1", "pipe2"};//set addresses of the 2 pipes for read and write

boolean buttonState = false;//used for both transmission and receive

void setup() {

pinMode(5, OUTPUT);
pinMode(6, OUTPUT);

//setup the Arduino pins

pinMode(button, INPUT_PULLUP);

pinMode(confirmLed, OUTPUT);//yellow LED

pinMode(led, OUTPUT);//red LED

NRF24L01.begin(); //open the pipes to read and write from board 1

//NRF24L01.openWritingPipe(address[0]);//open writing pipe to address pipe 1
//
//NRF24L01.openReadingPipe(1, address[1]);//open reading pipe from address pipe 2

//this is the only difference in the two sketches required

//the two lines below are for board two, notice how the reading and writing pipes are reversed

NRF24L01.openReadingPipe(1, address[0]);//open reading pipe from address pipe 1

NRF24L01.openWritingPipe(address[1]);//open writing pipe to address pipe 2

NRF24L01.setPALevel(RF24_PA_MAX);//set RF power output to minimum, RF24_PA_MIN (change to RF24_PA_MAX if required)

NRF24L01.setDataRate(RF24_250KBPS);//set data rate to 250kbps

//If the frequency of 110 below is a problem with other wi-fi for you increment by 1 until it is ok

//Don't forget that both sets of code must have the same frequency

NRF24L01.setChannel(110);//set frequency to channel 110.

}

void loop() {

//Transmit button change TO the other Arduino

//delay(10);
//
//NRF24L01.stopListening();
//
//buttonState = digitalRead(button);//test for button press on THIS board
//
//if (buttonState == LOW)//button is pulled up so test for LOW
//
//{
//
//NRF24L01.write(&buttonState, sizeof(buttonState));//send LOW state to other Arduino board
//
////flash the yellow LED to show progress
//
//digitalWrite(confirmLed, HIGH);
//
//delay(100);
//
//digitalWrite(confirmLed, LOW);
//
//}
//
//buttonState = HIGH;//reset the button state variable
//
//
//
////Receive button change FROM the other Arduino
//
//delay(10);

NRF24L01.startListening();

if (NRF24L01.available())//do we have transmission from other Arduino board

{

NRF24L01.read(&buttonState, sizeof(buttonState));//update the variable with new state

NRF24L01.stopListening();

}

if (buttonState == HIGH)//test the other Arduino's button state

{

digitalWrite(led, LOW);



}

else

{

//flashLed();//indicate that the button was pressed on the other board
digitalWrite(5, HIGH);
digitalWrite(6, LOW);
delay(500);
digitalWrite(5, LOW);
digitalWrite(6, LOW);

}

buttonState = HIGH;//reset the button state variable

}

//flash the red LED five times

void flashLed()

{

for (int i = 0; i < 5; i++)

{

digitalWrite(led, HIGH);

delay(200);

digitalWrite(led, LOW);

delay(200);

}

}
