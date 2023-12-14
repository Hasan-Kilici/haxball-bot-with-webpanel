const fs = require("node:fs")
let roomInfo
const goalEvent = require("../events/goal.js")
const join = require("../events/join.js")
const messageEvent = require("../events/message.js")
const webhook = require("../webhook/discord.js")
const tick = require("../events/tick.js")
let playerList = {}

function freeze(name){
    let users = roomInfo.getPlayerList()
    let freeze = users.find((p) => p.id == playerList[name].id)
    playerList[name].frozen = true;
    playerList[name].frozenX = freeze.position.x;
    playerList[name].frozenY = freeze.position.y;
}

function unfreeze(name){
    playerList[name].frozen = false;
}

function mute(name, delay){
    if (playerList[name]) {
        playerList[name].muted = true;
        setTimeout(()=>{
            playerList[name].muted = false;
        },delay)
    } else {
        console.log(`Oyuncu bulunamadı: ${name}`);
    }
}

module.exports = {
    init: async (room)=>{
        roomInfo = room
        let power = await fs.readFileSync("./maps/power.hbs")
        let lastPlayersTouched

        room.setCustomStadium(power);
        room.setScoreLimit(5);
        room.setTimeLimit(0);
        room.setTeamsLock(true)

        room.setTeamColors(2, 0, 0x000000, [0x2B00FF, 0xF1FFF0]);
        room.setTeamColors(1, 0, 0x000000, [0xD10000, 0xF1FFF0]);

        room.onRoomLink = (link)=>{
            console.log(link);
        };

        room.onPlayerJoin = (player) => {
            join(player,room)
            if(!playerList[player.name]){
                playerList[player.name] = {name: player.name, messageDates: [], muted: false, spamInMute: 0, admin:false, id:player.id, frozenX : null, frozenY: null, beFaste: false};
            }
            webhook.JoinLeaveLog(`${player.name} Sunucuya giriş yaptı Kullanıcı ID'si ${player.id}`)
        }

        room.onPlayerLeave = (player) =>{
            room.sendAnnouncement(`Görüşürüz ${player.name} `)
            webhook.JoinLeaveLog(`${player.name} Sunucudan ayrıldı Kullanıcı ID'si ${player.id}`)
        }

        room.onPlayerChat = (player, message) => {
            messageEvent(player,message,room, mute, playerList, freeze, unfreeze)
            webhook.MessageLog(`${player.name} : ${message}`)
            return false
        }

        room.onTeamGoal = (goal)=>{
            goalEvent(goal,room,lastPlayersTouched)
        }

        room.onGameTick = ()=>{
            tick.init(room,playerList)
        }

        room.onPlayerBallKick = (player)=>{
            lastPlayersTouched = {
                id:   player.id,
                name: player.name,
                team: player.team,
                admin: player.admin,
            }
        }

        room.onTeamVictory = (team)=>{
            room.sendAnnouncement("Maç bitti")
            setTimeout(()=>{
                room.startGame()
            },5000)
        }

        room.onStadiumChange = (stadium, player) => {
            tick.changeMap(stadium)
        }
    },
    mute : (name, delay)=>{
        mute(name, delay)
    },
    freeze: (name) => {
        freeze(name)
    }, 
    unfreeze: (name) => {
        unfreeze(name)
    }
}