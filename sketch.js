var tower,towerimage;
var door, doorImage,doorGroup;
var climber, climbImage,climberGroup;
var ghost, ghostImage;
var spookySound ;

var gameState = "play"

function preload(){
  
  towerimage = loadImage ("tower.png");   
  doorImage = loadImage("door.png");
  climbImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png" );
  spookySound = loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600); 
   spookySound.loop();
  tower = createSprite(300,300 )
  tower.addImage("tower",towerimage )
   tower.velocityY = 2;
  
  doorGroup= new Group();
  climberGroup = new Group();
  
  ghost =createSprite( 200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.5;
  
  
  
}


function draw (){
    background(0);
  
  
  if( gameState === "play") {
    
    
  //move the ghost
  if(keyDown("space")){
     ghost.velocityY = -2;
  }
   ghost.velocityY = ghost.velocityY +0.5; 
    
     
  // to move left n right
  
  if (keyDown ("left_arrow")){
    ghost.x = ghost.x-2;
  }
 if (keyDown ("right_arrow")){
   ghost.x = ghost.x + 2;
    
  }
    
  //reset tower
    if(tower.y > 400){
      tower.y = 300
    }
   spawnDoors();
  
    
   if( climberGroup.isTouching(ghost) ){
    
    ghost.velocityY = 0;
   
    
  }
    
    if(ghost.y >600  )  {
      
       gameState = "End"
    
    }
  

    
    
  }
  
  
 else if (gameState === "End"){
   fill("red");
    stroke ("yellow");
   textSize ( 50);
   
    text( "game Over",200,200);
      ghost.distroy();
    
  }
  
  
  drawSprites(); 
}

function spawnDoors(){
  
  
  
  if(frameCount%240===0){
  door = createSprite(200,50);
  door.addImage("door",doorImage );
  door.velocityY = 3;
    
    door.x = Math.round(random(120,400 ));
  //lifetime
    door.lifetime= 200;
    
  climber = createSprite(door.x,door.y+55)
  climber.addImage(climbImage);
    climber.velocityY= 3;
    climber.lifetime= 200;
    
    
    
    
    
    doorGroup.add( door);
    climberGroup.add( climber);
    
    ghost.depth = door.depth;
   ghost.depth  = ghost.depth+1;
  }
  
}






