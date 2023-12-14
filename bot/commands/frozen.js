module.exports = {
    freeze : (player, message, room, freeze)=>{
        let users = room.getPlayerList();
        if (player.admin) {
            let freeze = users.find((p) => p.id == command[1])
            freeze(freeze.name, 2000)
        }
    },
    unfreeze : (player, message, room, unfreeze)=>{
        let users = room.getPlayerList();
        if (player.admin) {
            let unfreeze = users.find((p) => p.id == command[1])
            unfreeze(unfreeze.name, 2000)
        }
    }
}