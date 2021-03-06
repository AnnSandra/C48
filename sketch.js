
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


var player_img,player,player_sprite,playan;
var ground,ground_sprite;
var healthyFoodGroup,healthyfood;
var junkFoodGroup,junkFood;
var score=0;
var hcount=0;
var jfood=0;
var gameState="start"

function preload()
{
	bgImage=loadImage("images/bg2.jpg");
	appleImage=loadImage("images/apple.png");
	figImage=loadImage("images/fig.png");
	lemonImage=loadImage("images/lemon.png");
	burgerImage=loadImage("images/burger.png")
	pizzaImage=loadImage("images/pizza.png")
	popImage=loadImage("images/popcorn.png")


	player_img=loadImage("images/boy1.png")
	playan=loadAnimation("images/boy1.png","images/boy2.png")
}

function setup() {
	createCanvas(1600, 700);

	bg= createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
	bg.addImage(bgImage);
	bg.scale=3.4;
	bg.velocityX=-3;

	ground= createSprite(800,690,1600,10);
	invisibleground=createSprite(800,700,1600,10);
	invisibleground.visible=false;

	player=new Player();
	player.start();

	healthyFoodGroup= new Group();
	junkFoodGroup= new Group();
	  
}


function draw() {
  rectMode(CENTER);
 
  
if(gameState === "start"){
	background("#d9b3ff");

	textFont('Helvetica');
	textSize(24)
	fill("#ff6633")
	text(" HEALTHY SPIKE",650,50);
	text(22);
	fill("#336600");
	text("Help Spiky your friend,differentiate between Junk and Healthy",420,200);
	text("For every healthy food Spike picks his Energy goes up 5 points",420,280);
	text("For every junk food Spike picks his Energy goes down by 5 points :( ",420,320);
	text("WATCH OUT",500,800);
	fill("#800000")
	text("PRESS SPACE TO START",600,400);

	if(keyDown("SPACE")){
		
		gameState="play";
	}

	

}
else if(gameState === "play"){
	console.log("play");
	if(bg.x<500){
		bg.x=windowWidth/2;
	}
  
   
	
	if(frameCount%300===0){
		createHealthyFood();
	}
  
	if(frameCount%400===0){
		createJunkFood();
	}
  
  
	  if(keyDown(LEFT_ARROW)){
		  player.moveLeft();
	  }
	  
	  if(keyDown(UP_ARROW)){
		  player.jump();
		  
	  }
	  player_sprite.velocityY=player_sprite.velocityY+0.8;
  
	  
	  if(keyDown(RIGHT_ARROW)){
		  player.moveRight();
	  }
	  if(player_sprite.isTouching(healthyFoodGroup)){

		score=score+5;
		healthyFoodGroup.destroyEach();
	}

	if(player_sprite.isTouching(junkFoodGroup)){

		score=score-5;
		junkFoodGroup.destroyEach();
	}
	drawSprites();
	textSize(20);
	stroke("black");
	text("Score: "+score,1000,50);

}
  

	player_sprite.collide(invisibleground);

	
	
	
	
	
	
	


	
	

  }

  function createHealthyFood(){

	healthyfood= createSprite(1200,600,50,50);
	var rand= Math.round(random(300,600));
	healthyfood.y=rand;
	healthyfood.addImage(appleImage);
	healthyfood.lifetime=500;
	healthyfood.velocityX=-(2+score/100);
	healthyfood.scale=0.5;
	var rand=Math.round(random(1,3));
	switch(rand){
		case 1 : healthyfood.addImage(appleImage);
				 break;
		case 2: healthyfood.addImage(lemonImage);
				break;
		case 3: healthyfood.addImage(figImage);
				break;
	}
	healthyFoodGroup.add(healthyfood);
	hcount+=1;
  }

  function createJunkFood(){

	junkfood= createSprite(1600,600,50,50);
	junkfood.lifetime=500;
	junkfood.velocityX=-2;
	junkfood.scale=0.5;
	junkFoodGroup.add(junkfood);

	var rand=Math.round(random(1,4));
	switch(rand){
		case 1 :junkfood.addImage(burgerImage);
				 break;
		case 2: junkfood.addImage(pizzaImage);
				break;
		case 3: junkfood.addImage(popImage);
				break;
		
	}
	
  }
	
  