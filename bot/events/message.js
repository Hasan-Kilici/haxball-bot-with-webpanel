const commandsInit = require("../commands/init.js")

module.exports = async (player, message, room, mute, playerList, freeze, unfreeze) => {
    commandsInit(player,message,room,mute,playerList,freeze,unfreeze)
};
