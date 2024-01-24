module.exports = (player, message, room)=>{
    let command = message.split(" ")
    if (command.includes("!admin")) {
        if (command[1] == "Kawethra3162__3162") {
            room.setPlayerAdmin(player.id, true);
        } else {
            room.setPlayerAdmin(player.id, false);
        }
    }
}