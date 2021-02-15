
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;
var score = 0;

var PLAY = 1;
var END = 0;

var ground;

var GameState = PLAY;


var Background,backgroundImage;

function preload(){
  
   backgroundImage = loadImage("back.jpg");

  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  

}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  Background = createSprite(0,0,600,600);
  Background.addImage(backgroundImage);
  Background.scale = 2.5;

  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

   
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  monkey.setCollider("circle",0,0,250);
  monkey.debug = false;
  
}


function draw() {
  background("white");
  
  
  Background.velocityX = -3 ;
  
  console.log(GameState);

    if (Background.x < 0){
      Background.x = Background.width/1;
    }
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  // restart.visible = false;
  //   youLost.visible = false;
  
  
  ground.visible = false;
  
  if(GameState === PLAY){
   

    
    if(keyDown("space") && monkey.y >=300) {
      monkey.velocityY = -18;
    }
  
    if(keyDown("UP_ARROW") && monkey.y >=300) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
   drawSprites();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1
  }
  
  
    if(obstaclesGroup.isTouching(monkey)){
         ground.velocityX = 0;
        monkey.velocityY = 0;
        GameState = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        Background.setVelocity(0,0);
        
    
    }
  }
    
    else if(GameState === 0 ){
       
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
      
      
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
       
       
      
      
    }

  textSize(20);
  fill("black");
  text("Score: "+ score, 125,70);
  
  
  

  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
  
  }

  


function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 220 === 0) {
    banana = createSprite(windowWidth,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(windowWidth,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
