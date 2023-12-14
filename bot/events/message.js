const commandsInıt = require("../commands/init.js")

module.exports = async (player, message, room, mute, playerList, freeze, unfreeze) => {
    commandsInıt(player,message,room,mute,playerList,freeze,unfreeze)
};
