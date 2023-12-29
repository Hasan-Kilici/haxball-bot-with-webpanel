const fs = require("node:fs")
let roomInfo
const goalEvent = require("../events/goal.js")
const join = require("../events/join.js")
const messageEvent = require("../events/message.js")
const webhook = require("../webhook/discord.js")
const tick = require("../events/tick.js")
const resolve = require("../utils/resolve.js");
const Snowflake = require("../utils/snowflake.js");
const map = require("../commands/map.js");
const dataset = require("csv-database");

let replay = [];

let playerList = {};

let redGoal = 0;
let blueGoal = 0;

function freeze(name){
    let users = roomInfo.getPlayerList()
    let freeze = users.find((p) => p.id == playerList[name].id)
    playerList[name].frozen = true;
    playerList[name].frozenX = freeze.position.x;
    playerList[name].frozenY = freeze.position.y;
}

async function addBlackList(name, reason){
    const BlacklistDataset  = await dataset("./datasets/blacklist.csv", ["name","reason"]);
    BlacklistDataset.add([{name: name, reason: reason}]);
}

async function getBlackList(){
    const BlacklistDataset  = await dataset("./datasets/blacklist.csv", ["name","reason"]);
    let blackList = await BlacklistDataset.get();

    return blackList;
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
        const BlacklistDataset  = await dataset("./datasets/blacklist.csv", ["name","reason"]);
        const ReplayDataset  = await dataset("./datasets/replays.csv", ["id","url","blue","red","date"]);
        roomInfo = room
        let power = await fs.readFileSync("./maps/power.hbs")
        let lastPlayersTouched

        room.setCustomStadium(power);
        room.setScoreLimit(5);
        room.setTimeLimit(0);
        room.setTeamsLock(true)

        room.setTeamColors(2, 0, 0x000000, [0x2B00FF, 0xF1FFF0]);
        room.setTeamColors(1, 0, 0x000000, [0xD10000, 0xF1FFF0]);

        room.onRoomLink = async (link)=>{
            console.log(link);
        };

        room.onPlayerJoin = async (player) => {  
            let time = new Date();
            let blackList = await BlacklistDataset.get({name: player.name});
            join(player,room)
            if(!playerList[player.name]){
                playerList[player.name] = {
                    name: player.name, 
                    messageDates: [], 
                    muted: false, 
                    spamInMute: 0, 
                    admin:false, 
                    id:player.id, 
                    frozenX : null, 
                    frozenY: null, 
                    beFaste: false,
                    ip: resolve.ip(player.conn),
                    registeredDate: time.getTime(),
                    leaveDate: null,
                    stats: {
                        powerGoal: 0,
                        futsalGoal: 0,
                    }
                };
            } if (blackList[0]){
                room.kickPlayer(player.id, blackList[0].reason , true)
            }
            webhook.JoinLeaveLog(`${player.name} Sunucuya giriş yaptı Kullanıcı ID'si ${player.id}`)
        }

        room.onPlayerLeave = (player) =>{
            let time = new Date()
            room.sendAnnouncement(`Görüşürüz ${player.name} `)
            webhook.JoinLeaveLog(`${player.name} Sunucudan ayrıldı Kullanıcı ID'si ${player.id}`)
            playerList[player.name].leaveDate = time.getTime();
        }

        room.onPlayerChat = (player, message) => {
            messageEvent(player,message,room, mute, playerList, freeze, unfreeze)
            webhook.MessageLog(`${player.name} : ${message}`)
            return false
        }

        room.onTeamGoal = (goal)=>{
            if(goal === 1){
                redGoal++
            } else {
                blueGoal++
            }
            console.log(blueGoal, redGoal)

            goalEvent(goal,room,lastPlayersTouched)

            switch(map.get()){
                case "futsal":
                    playerList[lastPlayersTouched.name].stats.futsalGoal++
                break;
                case "power":
                    playerList[lastPlayersTouched.name].stats.powerGoal++
                break;
            }
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
        }

        room.onGameStart = (player)=>{
            room.startRecording()
        }

        room.onGameStop = (player)=>{
            const snowflake = new Snowflake()
            const formData = new FormData();
            let date = new Date();
            let id = snowflake.generateID();
            formData.append('replay[name]', `Replay-${id}`);
            formData.append('replay[private]', 'false');
            formData.append('replay[fileContent]', room.stopRecording().toString());
            
            fetch("https://replay.thehax.pl/api/upload", {
                "headers": {
                    "API-Tenant": "ut_ee76a5a693a17758a8cf56734fde5038", 
                    "API-Key": "ukt_36fa40ea4e4103f919e2ca9945a951ba" 
                },
                "method": "POST",
                "body": formData
            }).then((response) => {
                response.json().then((result) => {
                    if (result.success) {
                        webhook.SendReplay(result.url);
                        ReplayDataset.add({id:id,url:result.url,red:redGoal,blue:blueGoal,date: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`})
                        redGoal = 0;
                        blueGoal = 0;
                    }
                });
            })
            room.startGame()
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
    },
    get: (name) => {
        return playerList[name];
    },
    BlackList: (value,reason)=>{
        addBlackList(value,reason)
    },
}