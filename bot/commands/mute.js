module.exports = (player, message, room, mute)=>{
    let users = room.getPlayerList();
    if (player.admin) {
        let muted = users.find((p) => p.id == command[1])
        mute(muted.name, 2000)
    }
}