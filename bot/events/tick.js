const dodgeball = require("../games/dodgeball.js")
let thisMap;

module.exports = {
    changeMap : (map)=>{
        thisMap = map;
    },
    init : (room)=>{
        switch(thisMap){
            case "dodgeball":
                dodgeball(room)
            break;
        }
    }
}