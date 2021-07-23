var path,spaceShip,pathImg,spaceShipImg;
var star,starImg,meteor,meteorImg;
var starCollection = 0;
var spaceShipG,meteorG,starG;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
pathImg=loadImage("tower.png");
spaceShipImg=loadImage("ship.png");
starImg=loadImage("star.png");
meteorImg=loadImage("meteor.png");
endImg=loadAnimation("gameOver.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 path=createSprite(width/2,200);
 path.addImage(pathImg);
 path.velocityy=4;

 spaceShip=createSprite(width/2,height-20,20,20);
 spaceShip.scale=0.08;
 spaceShip.addImage(spaceShipImg);

 startG=new Group();
 meteorG=new Group();

}

function draw() {

    if(gameState===PLAY){
        background(0);
        spaceShip.x = World.mouseX;

        edges=createEdgeSprites();
        spaceShip.collide(edges);

        if(path.y>height){
            path.y = height/2;
        }
        
        createStar();
        createMeteor();

        if (starG.isTouching(spaceShip)) {
            starG.destroyEach();
            starCollection=starCollection + 1;
        }else{
            if (meteorG.isTouching(spaceShip)){
                gameState=END;

                spaceShip.addAnimation(endImg);
                spaceShip.x=width/2;
                spaceShip.y=height/2;
                spaceShip.scale=0.6;

                starG.destroyEach();
                meteorG.destroyEach();

                starG.setVelocityYEach(0);
                meteorG.setVelocityYEach(0);
            }
        }

        drawSprites();
        textSize(20);
        fill(255);
        text("Star: "+ starCollection,width-150,30);
    }
}

function createStar(){
    if(World.frameCount%200==0){
        var star=createSprite(Math.round(random(50, width-50),40,10,10));
        star.addImage(starImg);
        star.scale.velocityY=5;
        star.lifetime=200;
        starG.add(star);
    }
}

function createMeteor(){
    if(World.frameCount%530==0){
        var meteor=createSprite(Math.round(random(50,width-50),40,10,10));
        meteor.addImage(meteorImg);
        meteor.scale=0.1;
        meteor.velocityY=4;
        meteor.lifetime=200;
        meteorG.add(meteor);
    }
}