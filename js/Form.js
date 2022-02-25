class Form{
    constructor(){
     this.title = createElement()
     this.title.html("Operation Pluto")
     this.playButton = createButton("Start Racing")
     this.playerName = createInput("Enter your name")
     this.greeting = createElement("h1")
     this.message1 = createElement("h1")
     this.message1.html("Welcome to the international space race 2.0, you have been selected to fight in operation pluto for your team. The main objective is to get to Pluto before your opponent. Best of luck.")
    }
    setElementPosition(){
this.title.position(windowWidth/2.5,windowHeight/4)
this.playButton.position(windowWidth/2+300,100)
this.playerName.position(windowWidth/2+300,200)
this.greeting.position(windowWidth/2.5,windowHeight/4)
this.message1.position(100,windowHeight/4 + 200)
}

    setElementStyle(){
this.title.class("title")
this.message1.class("message")
    }

    display(){
      this.setElementPosition()
      this.setElementStyle() 
      
    this.playButton.mousePressed(()=>{
   
    var message2 = `
    Hello ${this.playerName.value()}
      </br>wait for another player to join...`;
      this.greeting.html(message2)
      playerCount += 1;
      player.name = this.playerName.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);

      player.getDistance() 

    })

    }

    hide(){
      this.playButton.hide()
      this.playerName.hide()
      this.title.hide()
      this.message1.hide()
      this.greeting.hide()
    }

}