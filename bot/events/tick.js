const dodgeball = require("../games/dodgeball.js")
let thisMap;

module.exports = {
    changeMap : (map)=>{
        thisMap = map;
    },
    init : (room, playerList)=>{
        let users = room.getPlayerList()
        for(let i = 0;i < users.length;i++){
            let user = playerList[users[i].name]
            if(user.frozen){
                room.setPlayerDiscProperties(user.id,{x:user.frozenX,y:user.frozenY,xspeed:0,yspeed:0});
            }
        }

        switch(thisMap){
            case "dodgeball":
                dodgeball(room)
            break;
            case "hırsız polis":

            break;
        }
    }
}