const fs = require('fs');
const tick = require("../events/tick.js")

let power = fs.readFileSync("./maps/power.hbs");
let parkour = fs.readFileSync("./maps/parqur.hbs");
let dodgeball = fs.readFileSync("./maps/dodgeball.hbs");
let penalty = fs.readFileSync("./maps/penalto2.hbs");
let sniper = fs.readFileSync("./maps/sniper.hbs");
let sumopower = fs.readFileSync("./maps/sumopower.hbs");
let voleybol = fs.readFileSync("./maps/voleybol.hbs");
let powerBig = fs.readFileSync("./maps/big-power.hbs");
let powerHuge = fs.readFileSync("./maps/power-huge.hbs");

let map;

module.exports = { 
    change: async (player, message, room)=>{
        let command = message.split(" ")
            if (await player.admin) {
                room.stopGame();
                switch (command[1]) {
                    case "power":
                        room.setScoreLimit(5);
                        room.setTimeLimit(0);
                        let users = room.getPlayerList()
                        if(users.length > 6 && users.length < 8){
                            room.setCustomStadium(powerBig);
                        } else if (users.length > 8 ) {
                            room.setCustomStadium(powerHuge);
                        } else {
                            room.setCustomStadium(power);
                        }
                        break;
                    case "parkour":
                        room.setScoreLimit(1);
                        room.setTimeLimit(0);
                        room.setCustomStadium(parkour);
                        break;
                    case "dodgeball":
                        room.setScoreLimit(0);
                        room.setTimeLimit(0);
                        room.setCustomStadium(dodgeball);
                        break;
                    case "penalty":
                        room.setScoreLimit(5);
                        room.setTimeLimit(0);
                        room.setCustomStadium(penalty);
                        break;
                    case "sniper":
                        room.setScoreLimit(3);
                        room.setTimeLimit(1);
                        room.setCustomStadium(sniper);
                        break;
                    case "sumopower":
                        room.setScoreLimit(10);
                        room.setTimeLimit(0);
                        room.setCustomStadium(sumopower);
                        break;
                    case "voleybol":
                        room.setScoreLimit(12);
                        room.setTimeLimit(0);
                        room.setCustomStadium(voleybol);
                        break;
                    default:
                        return false;
                }
                map = command[1];
                room.sendAnnouncement(`Harita değiştirildi, yeni map : ${command[1]}`, null, 0x00ff00, "bold")
                room.startGame();
                tick.changeMap(command[1])
        } else {
            room.kickPlayer(player.id, "OYUNCU KICKLEME MESAJI", false);
            room.sendAnnouncement(`${player.name} ADLI OYUNCU ADMIN DEĞİLKEN HARITAYI DEĞİŞTİRMEYE ÇALIŞTI`);
        }
    },
    get : ()=>{
        return map
    }
}
