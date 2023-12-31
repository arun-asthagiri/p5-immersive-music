/* // TO UPLOAD YOUR OWN IMAGES:
0. click on arrow on top left of screen to look at directory of files
1. click on the arrow next to images folder and delete the whole folder 
2. press the arrow next to 'Sketch Files' and create a new folder named 'images'
3. click on the arrow next to your empty images folder and upload files
VERY IMPORTANT: Make sure your file names are in this format: moon_#.jpg
   and you can change the value for #
   Also -- make sure your imgae numbers go up consecutively (don't skip any numbers)
4. Based on what you uploaded, update the number of images and the number of your first image with the two variables below
*/
let numimgs = 5; 
let first_image_number = 1;

let INTENSITY = 0.5;
let accumINTENSITY = 0;
let SHOWIMG = false;
// let PRESET = 0;
const note = {currentNote: 0};

//Code starts here (play around with it if you want lol): 
var turtles = []; let size = 24; let numTurtles = 5; let t = 0; 
let imgs = [], currentImgIndex = 0; 
function preload(){
  for (let i = first_image_number; i <= first_image_number+numimgs-1; i++){
    imgs.push(loadImage(`./images/${i}.jpg`));
    print("loaded", i);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  for (let i = 0; i < numTurtles; i++){
    turtles[i] = new Turtle(random(width-10),random(height-10),random(TWO_PI));
  }
  mic = new p5.AudioIn();
  mic.start();
}
let period = 200;
let slowestPeriod = 250;
let fastestPeriod = 5;
INTENSITY_SENSITIVITY = 0.1
let showThreshhold = 0.5;
let showIndex = 0;

function draw() {
  background(255,0);
  intesity = mouseX + mouseY;
  // t+=1;
  // if (t == 100) {
  //   mic = new p5.AudioIn();
  //   mic.start();
  // }
  drawCracks();
  // turtleShape(INTENSITY);
  // translate(0,height);
  // rotate(-PI/2);
  displayIMG(period); // range of 300 to 0
  // translate(0,0);
  // noiseShape();
  // if (t> 110){
  
  INTENSITY = mic.getLevel();
  // }
  
  accumINTENSITY += INTENSITY/50;
  showIndex += INTENSITY/50;
  // print(accumINTENSITY);
  // if (frameCount%60 == 0){
    if (accumINTENSITY > INTENSITY_SENSITIVITY && SHOWIMG) {
      if (period > fastestPeriod+11){
        period -= 10;
      }
      accumINTENSITY = 0;
    }
  if (showIndex > showThreshhold) {
    SHOWIMG = true;
  }
  
  // }
}

function Turtle(xloc,yloc,angle){
  this.reset = function(xloc,yloc,angle){
    this.xloc = xloc;
    this.yloc = yloc;
    this.pxloc = xloc; 
    this.pyloc = yloc;
    this.angle = angle;
  }
  this.reset(xloc,yloc,angle);
}

Turtle.prototype.move = function(dist){
  this.pxloc = this.xloc;
  this.pyloc = this.yloc;
  this.xloc += noise(frameCount)*dist*cos(this.angle);
  this.yloc -= noise(frameCount)*dist*sin(this.angle);
  if (this.xloc >= width || this.xloc <= 0 || this.yloc <= 0 || this.yloc >= height) {
    this.angle += PI;
    this.xloc = this.pxloc;
    this.yloc = this.pyloc;
    // this.reset(width*noise(this.xloc),height*noise(this.yloc),random(TWO_PI));
  }
  this.display();
}
Turtle.prototype.turn = function(turn_angle){
  this.angle += turn_angle;
}
Turtle.prototype.display = function(){
  // ellipse(this.xloc,this.yloc,50,50);
  stroke(0,90);
  strokeWeight(map(INTENSITY,0,1, 20, 100));
  line(this.xloc,this.yloc,this.pxloc,this.pyloc);
}
// Turtle.prototype.reset = function(){
//   // ellipse(this.xloc,this.yloc,50,50);
//   line(this.xloc,this.yloc,this.pxloc,this.pyloc);
// }


function drawCracks(){
  // if (PRESET == 0){
    for (let i = 0; i < numTurtles; i++){
      turtles[i].turn(random(-PI/12,PI/12));
      turtles[i].move(random(map(INTENSITY,0,1,0,100))*2);
    }
  // }
}

function turtleShape(length){
  // if (PRESET ==1){
    for (let i = 0; i < length; i++){
      drawCracks();
    }
  // }
}

function noiseShape(){
  if (PRESET == 2){
    if (SHOWIMG){
      stroke(255, 15);
    } else {
      stroke(0, 15);
    }
    strokeWeight(1);
    fill(255,1);
    translate(width/2, height/2);
    beginShape();
    for (var i = 0; i < 200; i++) {
      var ang = map(i, 0, 200, 0, TWO_PI);
      var rad = map(INTENSITY,0,1,100,400) * noise(i * 0.01, t * map(INTENSITY,0,1,0,4)*0.005);
      var x = rad * cos(ang);
      var y = rad * sin(ang);
      curveVertex(x, y);
    }
    endShape(CLOSE);
    translate(0, 0);
  }
}

function displayIMG(period){
  if (SHOWIMG){
    // stroke(255,90);
    // strokeWeight(5);
    if (frameCount%(round(period)) == 0){
      if (currentImgIndex > numimgs - 1) {
        currentImgIndex = 0;
      }
      tint(255, map(period, 200, 10, 0, 255));
      image(imgs[currentImgIndex],0,0,width,height);
      
      currentImgIndex++;
    }
  }
}


function midiIn(){
  // if (note.currentNote > 30){
  //   updateImage();
  // }
  INTENSITY = map(note.currentNote, 0, 127, 0, 1);
  //ellipse(random(note.currentNote*3),random(note.currentNote*3),note.currentNote,note.currentNote);
}

function keyPressed(){
  // if (keyCode === LEFT_ARROW) {
  //   stroke(0,90);
  //   strokeWeight(5);
  //   for (let i = 0; i< numTurtles; i++){
  //     turtles[i].reset(width-10,height-10,random(TWO_PI));
  //   }
  //   PRESET = (PRESET + 1)%3;
  // } 
  // if (keyCode === RIGHT_ARROW) {
  //   INTENSITY = 0.5;
  //   if (SHOWIMG){
  //     background(255);
  //     SHOWIMG = false;
  //   } else {
  //     SHOWIMG = true;
  //   }
  // } 
  // if (keyCode === UP_ARROW) {
  //   INTENSITY *=1.2;
  // }
  // if (keyCode === DOWN_ARROW) {
  //   INTENSITY /= 1.2;
  // }
}
function mousePressed() {
  userStartAudio();
}
