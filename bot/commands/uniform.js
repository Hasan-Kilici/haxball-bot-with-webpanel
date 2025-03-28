module.exports = (player,message,room)=>{
    let command = message.split(" ")
    if(player.team !== 0){
        switch(command[1]){
            case "şalgam" :
                room.setTeamColors(player.team, 90, 0xFFFFFF, [0x7800C9, 0x9800FF, 0xC90494]); 
            break;
            case "dağdeviren":
                room.setTeamColors(player.team, 270, 0x000000, [0x0091FF, 0xFFFFFF]); 
            break;
            case "porno":
                room.setTeamColors(player.team, 90, 0xFFFFFF, [0x000000, 0xFF8000]);
            break;
            case "yemekvarmi":
                room.setTeamColors(player.team, 90, 0x000000, [0x00BA32, 0xDFBAFF]);
            default : 
                return false;
            break;
        }
        } if(player.team === 1){
            room.sendAnnouncement(`Kırmızı takım forma değiştirdi, yeni forma: ${command[1]}`, null, 0x00ff00, "bold")
        } else {
            room.sendAnnouncement(`Mavi takım forma değiştirdi, yeni forma: ${command[1]}`, null, 0x00ff00, "bold")
        }
    }
