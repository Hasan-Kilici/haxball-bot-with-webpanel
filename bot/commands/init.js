const map = require("../commands/map.js")
const admin = require("../commands/admin.js")
const changeUniform = require("../commands/uniform.js")
const giant = require("../commands/giant.js")
const muted = require("../commands/mute.js")

module.exports = (player, message, room, mute, playerList)=>{
    if(!playerList[player.name].muted){
        if(!message.startsWith("!")){
            room.sendAnnouncement(`[#${player.id}]\t${player.name} : ${message}`, null, 0xddff00, 'bold', 1);
        } else {
            let command = message.split(" ");
            if (command.includes("!map")) {
                map.change(player, message, room)
            } else if (command.includes("!admin")){
                admin(player, message, room)
            } else if (command.includes("!forma")){
                changeUniform(player,message,room)
            } else if (command.includes("!mod")){
                switch(command[1]){
                    case "ys":

                    break;
                    case "normal":

                    break;
                }
            } else if (command.includes("!giant")){
                giant(player,message,room)
            } else if (command.includes("!mute")){
                muted(player,message,room,mute)
            }
            
        }
    }
}