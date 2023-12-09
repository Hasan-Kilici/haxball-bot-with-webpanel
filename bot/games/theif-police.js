module.exports = (room)=>{
    let players = room.getPlayerList();

    let redTeamPlayers = players.filter((p) => p.team === 1);
    let blueTeamPlayers = players.filter((p) => p.team === 2);

    let redTeamAllOutside = redTeamPlayers.every((p) => p.position.y > 214 || p.position.y < -214 || p.position.x < -465);
    let blueTeamAllOutside = blueTeamPlayers.every((p) => p.position.y > 214 || p.position.y < -214 || p.position.x > 465);

    if (redTeamAllOutside || blueTeamAllOutside) {
        room.stopGame();
        room.startGame();
    }
}