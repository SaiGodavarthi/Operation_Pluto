class Player {
    constructor(){
        this.index = null;
        this.positionX = 0
        this.positionY = 0
        this.rank = 0
    }

    addPlayer() {
        var playerIndex = "players/player" + this.index;
    
        if (this.index === 1) {
          this.positionX = width / 2 - 100;
        } else {
          this.positionX = width / 2 + 100;
        }
    
        database.ref(playerIndex).set({
          name: this.name,
          positionX:this.positionX,
          positionY:this.positionY,
          rank:this.rank
        });
      }

    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
          playerCount = data.val();
        });
      }

      updateCount(count) {
        database.ref("/").update({
          playerCount: count
        });
      }

     static getPlayerinfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
          allPlayers = data.val();
        });
      }

      
        update() {
          var playerIndex = "players/player" + this.index;
          database.ref(playerIndex).update({
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
          });
        }
      
getDistance(){
  var playerDistance = database.ref("players/player"+this.index)
  playerDistance.on("value", data => {
    data = data.val()
    this.positionX = data.positionX
    this.positionY = data.positionY
  })
}

static updatePlayersRank(rank){
database.ref("/").update({
playersAtEnd: rank
})

}

getPlayersRank(){
  database.ref("playersAtEnd").on("value", data => {
    this.rank = data.val()
  })
}

}