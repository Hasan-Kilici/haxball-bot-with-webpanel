module.exports = (player,room)=>{
    room.setPlayerDiscProperties(player.id, {
      radius: 20,
    });
    let players = room.getPlayerList();
    let playerName = player.name;

    const sameNamePlayers = players.filter(p => p.name === playerName);
  
    if (sameNamePlayers.length > 1) {
      sameNamePlayers.forEach(p => {
        if (p.id !== player.id) {
          room.kickPlayer(player.id, "BU ISIMDE BIRISI VAR", false);
        }
      });
    }
  
    room.sendAnnouncement(`Hoş geldin ${playerName}`);
      let redTeamPlayers = players.filter(p => p.team === 1);
      let blueTeamPlayers = players.filter(p => p.team === 2);
    
      if (players.length === 0) {
        room.setPlayerTeam(player.id, 1);
      } else if (players.length === 1) {
        if (redTeamPlayers.length === 1) {
          room.setPlayerTeam(player.id, 2);
        } else {
          room.setPlayerTeam(player.id, 1);
        }
      } else {
        if (redTeamPlayers.length > blueTeamPlayers.length) {
          room.setPlayerTeam(player.id, 2);
        } else if (blueTeamPlayers.length > redTeamPlayers.length) {
          room.setPlayerTeam(player.id, 1);
        } else {
          room.setPlayerTeam(player.id, 1);
        }
      }
    room.startGame();
}