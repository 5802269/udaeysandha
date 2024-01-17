// Final Challenge Practice

let gorillaIdle = [];
let gorillaSwipe = [];
let gorillaX, gorillaY;
let idleIndex = 0; let swipeIndex = 0;

let spiralImages = [];
let spirals = []; //hold "Spiral" objects

function preload() {
  // load circle  images "circle animation00.png" →15
  for(let i = 0; i < 16; i++){
    if(i<10){ //single digit
      spiralImages.push(loadImage("assets/Circle/Circle Animation0"+i+".png"));
    }
    else{ //double digit
      spiralImages.push(loadImage("assets/Circle/Circle Animation"+i+".png"));
    }
  }



  //gorilla  idle1.png →6 swipe1.png →6
  for (let i = 1; i < 7; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  gorillaX = width / 2; gorillaY = height / 2;
}

function draw() {
  background(220);
  if (keyIsPressed && key === " ") { //SWIPE
    image(gorillaSwipe[swipeIndex], gorillaX, gorillaY, 200, 200);
    if(frameCount % 5 === 0){
      swipeIndex++;
      if(swipeIndex>5) swipeIndex = 0;
    }
  }
  else { //IDLE
    image(gorillaIdle[idleIndex], gorillaX, gorillaY);
    if (frameCount % 10 === 0) {
      idleIndex++; //0, 1, 2, 3, 4, 5, 6
      if (idleIndex > 5) idleIndex = 0;
    }
  }
  // gorillaY += 1;
  for(let i = 0 ; i < spirals.length; i++){
    let s = spirals[i];  //current spiral
    s.display();
    if(s.active===false){
      spirals.splice(i,1);
      i--;
    }
  }
}

function mousePressed(){
  spirals.push(new Spiral(mouseX,mouseY));
}

class Spiral{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.frame = 0; //current frame 0-15
    this.active = true;
  }
  display(){
    if(this.frame > 15){
      this.active = false;
    }
    else{
      image(spiralImages[this.frame], this.pos.x, this.pos.y);
      if(frameCount % 3===0){
        this.frame++;
      }
    }
  }
}