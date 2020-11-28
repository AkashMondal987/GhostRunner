var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg,tower;
var doorImg, door, doorsGroup;
var ghostImg , ghost;
var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;
var spooky;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();
  ghostImg = loadImage("ghost-standing.png");
  invisibleBlockGroup = new Group();
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
   
  spookySound.loop();
}

function draw(){
  background(0);
  
  if (gameState===PLAY){
      if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  ghost.velocitY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = END;
  }
   spawnDoors();
    
   drawSprites();
}

if (gameState === END) {
  stroke("yellow");
  fill("yellow");
  textSize(40);
  text("Game Over",250,250);
}
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage("door", doorImg);
    climber = createSprite(200,10);
    climber.addImage("climber", climberImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    climber.x = door.x;
    climber.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    doorsGroup.add(door);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
}
}