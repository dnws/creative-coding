let sectors = 5;
let angle = 0;
let layerSize = 50;
let currentLayer;
let maxLayers;
let extendedMaxLayers;
let maxAngle;
let paused = false;
let colours = ["#437c90","#255957","#eeebd3","#a98743","#f7c548","#f97068"];
let bg = "#941B35";

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxLayers = floor((min(windowWidth, windowHeight) * 0.95) / 2 / layerSize);
  extendedMaxLayers = floor((max(windowWidth, windowHeight) * 0.95) / 2 / layerSize);
  currentLayer = maxLayers;
  maxAngle = TWO_PI/sectors;
  background(32);
  frameRate(120);
  paused = false;
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2);
  if (abs(currentLayer) > extendedMaxLayers){
    currentLayer = maxLayers;
    angle = 0
    colours = [32]
    return;
    
  }
  if (angle >= maxAngle) {
    currentLayer -= 2;
    sectors = random([2, 3, 5, 8, 13]);
    angle = 0;
    maxAngle = TWO_PI/sectors*random(30,99)/100+angle;
    return;
  }
  for (let sec = 0; sec < sectors; sec++) {
    cline(angle*random(0,3) + sec * TWO_PI / sectors , getRadius());
  }
  angle += PI / 360*maxLayers/abs(currentLayer);
}

function cline(angle, radius) {
  push();
  stroke(random(colours));
  langle = angle * pow(-1, currentLayer)
  pYend = sin(langle) * radius;
  pXend = cos(langle) * radius;
  pYbegin = sin(langle) * (radius - layerSize);
  pXbegin = cos(langle) * (radius - layerSize);

  line(pXbegin, pYbegin, pXend, pYend);
  pop();
}

function getRadius(){
  return currentLayer*layerSize;
}

function keyPressed(){
  if (keyCode == 32){
    if(paused){
      loop();
    }else{
      noLoop();
    }
    paused = !paused;
  }
}

function windowResized() {
  location.reload();
}
