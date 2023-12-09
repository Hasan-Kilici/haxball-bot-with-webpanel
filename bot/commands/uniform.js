module.exports = (player,message,room)=>{
    let command = message.split(" ")
    if(player.team !== 0){
        if(command[1] == "şalgam"){
            room.setTeamColors(player.team, 90, 0xFFFFFF, [0x7800C9, 0x9800FF, 0xC90494]); 
        } else if (command[1] == "dağdeviren"){
            room.setTeamColors(player.team, 270, 0x000000, [0x0091FF, 0xFFFFFF]); 
        } else if (command[1] == "porno"){
            room.setTeamColors(player.team, 90, 0xFFFFFF, [0x000000, 0xFF8000]);
        } else if (command[1] == "kürdistan"){
            room.setTeamColors(player.team, 90, 0xFFE600, [0x00BA32, 0xFFFFFF, 0xC90000]);
        } else if(command[1] == "yemekvarmi"){
            room.setTeamColors(player.team, 90, 0x000000, [0x00BA32, 0xDFBAFF]);
        } else {
            return false
        }
        if(player.team === 1){
            room.sendAnnouncement(`Kırmızı takım forma değiştirdi, yeni forma: ${command[1]}`, null, 0x00ff00, "bold")
        } else{
            room.sendAnnouncement(`Mavi takım forma değiştirdi, yeni forma: ${command[1]}`, null, 0x00ff00, "bold")
        }
    }
}