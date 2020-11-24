var trex, trex_running, trex_collided;
var ground, ground_image, inv_ground;
var cloud_group, cloud_img;
var obstacle_group, obs1, obs2, obs3, obs4, obs5, obs6;
var n=0, count=0;
var restart_img, game_over_img, restart, game_over;
var gamestate="play";

function preload()
{
  trex_running= loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided= loadImage("trex_collided.png");
  ground_image= loadImage("ground2.png");
  cloud_img= loadImage("cloud.png");
  obs1= loadImage("obstacle1.png");
  obs2= loadImage("obstacle2.png");
  obs3= loadImage("obstacle3.png");
  obs4= loadImage("obstacle4.png");
  obs5= loadImage("obstacle5.png");
  obs6= loadImage("obstacle6.png");
  restart_img= loadImage("restart.png");
  game_over_img= loadImage("gameOver.png");
}
function setup() {
  createCanvas(600, 200);
  trex= createSprite(50,180,20,20);
  trex.scale=0.5;
  trex.addAnimation("running",trex_running);
  
  ground= createSprite(300,180,1200,10);
  ground.addImage("ground_1",ground_image);
  
  inv_ground= createSprite(300,190,600,10);
  inv_ground.visible=false;
  
  cloud_group= new Group();
  obstacle_group= new Group();
  
  restart= createSprite(300,150,20,20);
  restart.addImage("restart1", restart_img);
  restart.scale=0.7;
  restart.visible=false;
  
  game_over= createSprite(300,100,20,20);
  game_over.addImage("game_over1", game_over_img);
  game_over.visible=false;

}

function draw() {
  background(220);
  trex.collide(inv_ground);
  if(gamestate=="play")
  {
    spawnBackground();
    spawnObstacle();
    count=count+Math.round(getFrameRate()/65);
    text("Score: "+count,50,100);
    ground.velocityX=-5;
    if(ground.x<0)
      {
        ground.x=ground.width/2;
      }
    if(keyDown("space") && trex.y >= 150)
       {
        trex.velocityY = -12;
       }
    trex.velocityY=trex.velocityY+0.6;
    if(obstacle_group.isTouching(trex))
      {
        gamestate="end";
      }
  }
  else if(gamestate=="end")
    {
      obstacle_group.setVelocityXEach(0);
      cloud_group.setVelocityXEach(0);
      ground.velocityX=0;
      trex.velocityY=0;
      trex.addImage("collided", trex_collided);
      obstacle_group.setLifetimeEach(-1);
      cloud_group.setLifetimeEach(-1);
      game_over.visible=true;
      restart.visible=true;
      if(mousePressedOver(restart))
        {
          reset();
        }
    }
    drawSprites();
}

function spawnObstacle()
{
  if(frameCount%100==0)
  {  
    var obstacle= createSprite(580,170,10,10);
    obstacle.velocityX=-4;
    obstacle.scale=0.5;
    obstacle.lifetime=190;
    obstacle_group.add(obstacle);
    var rand= Math.round(random(1,6));
    switch(rand)
    {
      case 1: obstacle.addImage("obstacle1",obs1);
        break;
      case 2: obstacle.addImage("obstacle2", obs2);
        break;
      case 3: obstacle.addImage("obstacle3", obs3);
        break;
      case 4: obstacle.addImage("obstacle4", obs4);
        break;
      case 5: obstacle.addImage("obstacle5", obs5);
        break;
      case 6: obstacle.addImage("obstacle6", obs6);
        break;
      default: break;
    }
  }
}

function spawnBackground()
{
  if(n==0 || n%4==0)
  {
    if(frameCount>(n*100) && frameCount<=(n+2)*100)
    {
      background("white");
      if(frameCount%80==0)
        {
          var cloud=createSprite(540,random(20,80),20,20);
          cloud.velocityX=-3;
          cloud.lifetime=200;
          cloud.addImage("cloud1", cloud_img);
          cloud_group.add(cloud);
          cloud.depth=trex.depth;
          trex.depth=trex.depth+1;
        }
      if(frameCount==(n+2)*100)
        {
          n=n+2;
        }
    }
  }
  if(n%2==0 && n%4!=0)
    {
      if(frameCount>(n*100) && frameCount<=(n+2)*100)
    {
      background("black");
      if(frameCount==(n+2)*100)
        {
          n=n+2;
        }
    }
    }
}

function reset()
{
  gamestate="play";
  count=0;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  game_over.visible=false;
  restart.visible=false;
  trex.addAnimation("trex_run", trex_running);
}