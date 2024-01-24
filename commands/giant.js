module.exports = (player, message, room)=>{
    if(player.admin){
        let users = room.getPlayerList()
        for(let i = 0;i < users.length;i++){
            room.setPlayerDiscProperties(users[i].id, {radius: 50})
        }
    }
}