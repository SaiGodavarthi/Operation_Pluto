class Game{
    constructor(){
this.resetButton = createButton("reset")
this.playerMoving = false
this.leader1 = createElement("h2")
this.leader2 = createElement("h2")
this.leaderBoard = createElement("h1")
    }

    start(){
    form = new Form()
    form.display()
    player = new Player();
    playerCount = player.getCount();

rocket1 = createSprite(width/2-50,height-100)
rocket1.addImage(rocket1_img)
rocket1.scale = 0.4

rocket2 = createSprite(width/2+100,height-100)
rocket2.addImage(rocket2_img)
rocket2.scale = 0.4

rockets = [rocket1,rocket2]

asteriodGroup = new Group()
this.addSprites(asteriodGroup, 8, asteriod_img, 0.1);
asteriodGroup2 = new Group()
this.addSprites(asteriodGroup2, 8, asteriod_img2, 0.5);

    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }

      play(){

        this.handleElements()
        this.handleResetButton()

        Player.getPlayerinfo()
        player.getPlayersRank()

        if(allPlayers !== undefined){
          image(bg2,0,-height*5,width,height*6)
        this.showLeaderBoard()
        var index = 0;
        for (var plr in allPlayers) {
          index = index + 1;
        

        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        rockets[index - 1].position.x = x;
        rockets[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handleObstacleCollision(index)

          // Changing camera position in y direction
          camera.position.y = rockets[index - 1].position.y;
          //if(player.life<=0){
            //this.playerMoving = false
         // }
        }
      }
      if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }
        
        if(player.positionY >= 4000){
          gameState = 2 
          player.rank += 1
          Player.updatePlayersRank(player.rank)
          player.update()
          this.showRank()
        
        }
      
         this.handlePlayerControls()
         drawSprites();
        }
      }

      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
          });
          window.location.reload();
        });
      }

      handleElements(){
        form.hide()
        this.resetButton.position(windowWidth/2,windowHeight/2)
        this.leaderBoard.position(100,100)
        this.leaderBoard.html("LeaderBoard")

        this.leader1.position(100,150)

        this.leader2.position(100,200)
        
      }


      handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
    
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          this.leftKeyActive = true;
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
          this.leftKeyActive = false;
          player.positionX += 5;
          player.update();
        }
      
    }

    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
      console.log("Add sprites")
      for (var i = 0; i < numberOfSprites; i++) {
        var x, y;
  
        //C41 //SA
        if (positions.length > 0) {
          x = positions[i].x;
          y = positions[i].y;
          spriteImage = positions[i].image;
        } else {
          x = random(width / 2 + 150, width / 2 - 150);
          y = random(-height * 4.5, height - 400);
        }
        var sprite = createSprite(x, y);
        sprite.addImage("sprite", spriteImage);
  
        sprite.scale = scale;
        spriteGroup.add(sprite);
      }
    }

    handleObstacleCollision(index) {
      if (rockets[index - 1].collide(asteriodGroup || asteriodGroup2)) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }
        
        this.playerMoving = false
        gameState = 2
        player.rank = 0
        this.gameOver()
        player.update()
      }
    }
gameOver(){
    swal({
      title: `Game Over`,
      text: "gameover",
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

showLeaderBoard(){
  var leader1, leader2
  var players = Object.values(allPlayers)
  if (
    (players[0].rank === 0 && players[1].rank === 0) ||
    players[0].rank === 1
  ) {
    console.log("error")
    // &emsp;    This tag is used for displaying four spaces.
    leader1 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" 

    leader2 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" 
  }

  if (players[1].rank === 1) {
    leader1 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" 

    leader2 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" 
  }

  this.leader1.html(leader1);
  this.leader2.html(leader2);
}

showRank() {
  swal({
    title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
    text: "You reached the finish line successfully",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}

end(){
  //this.gameOver()
}

}

