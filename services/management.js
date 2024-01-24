const Player = require("../events/init.js")
const map = require("../commands/map.js")
const fs = require("node:fs")
const dataset = require("csv-database");

async function routes (fastify, options) {
    const BlacklistDataset  = await dataset("./datasets/blacklist.csv", ["name","reason"]);
    const ReplayDataset  = await dataset("./datasets/replays.csv", ["id","url","blue","red","date"]);

    const { room }  = options

    fastify.get('/sendMessage', async (request, reply) => {
      return { message: room.sendAnnouncement(`DUYURU : ${request.query.message} `) }
    })

    fastify.get('/editRadius', async (request, reply) => {
        return { user: room.setPlayerDiscProperties(request.query.userid, {radius: request.query.radius})}
    })

    fastify.get('/editDamping', async (request, reply) => {
        return { user: room.setPlayerDiscProperties(request.query.userid, {damping: request.query.damping})}
    })

    fastify.get('/editSpeed', async (request, reply) => {
        return { user: room.setPlayerDiscProperties(request.query.userid, {xspeed: request.query.speed,yspeed: request.query.speed})}
    })

    fastify.get('/users', async (request, reply) => {
        return { users: room.getPlayerList()}
    })

    fastify.get('/setColor', async (request, reply) => {
        return { team: room.setTeamColors(request.query.team, 0, request.query.color1, [request.query.color2, request.query.color3]) }
    })

    fastify.get('/ban', async (request, reply) => {
        return { user: room.kickPlayer(request.query.userid, request.query.reason, true)}
    })

    fastify.get("/give/admin", async (request, reply) => {
        return { user: room.setPlayerAdmin(request.query.userid,true)}
    })

    fastify.get("/take/admin", async (request, reply) => {
        return { user: room.setPlayerAdmin(request.query.userid,false)}
    })

    fastify.get("/change/team", async (request, reply) => {
        if(request.query.team == "blue"){
            return { user: room.setPlayerTeam(request.query.id, 2)}
        } else if (request.query.team == "red") {
            return { user: room.setPlayerTeam(request.query.id, 1)}
        } else {
            return { user: room.setPlayerTeam(request.query.id, 0)} 
        }
    })

    fastify.get("/change/avatar", async (request, reply) => {
        return { user: room.setPlayerAvatar(request.query.id, request.query.avatar)}
    })

    fastify.get("/get/user/discs", async (request, reply) => {
        return { user: room.getPlayerDiscProperties(request.query.userid)}
    })

    fastify.get("/msg", async (request, reply)=>{
        return { message: room.sendAnnouncement(`Özel mesaj (admin): ${request.query.message}`, Number(request.query.userid))}
    })

    fastify.get("/game/options", async (request, reply) => {
        return {room: room.getDiscProperties(0)}
    })

    fastify.get("/mute/player", async (request, reply) => {
        return {user: Player.mute(request.query.name, Number(request.query.delay))}
    })

    fastify.get("/unmute/player", async (request, reply) => {
        return {user: Player.mute(request.query.name, 1)}
    })

    fastify.get("/change/map", async (request, reply) => {
        return {map : map.change({id:1,name:"bot",admin:true,},`!map ${request.query.map}`, room)}   
    })

    fastify.get("/freeze", async (request, reply) => {
        return {user: Player.freeze(request.query.name)}
    })

    fastify.get("/unfreeze", async (request, reply) => {
        return {user: Player.unfreeze(request.query.name)}
    })

    fastify.get("/user", async (request, reply) => {
        return {user: Player.get(request.query.name)}
    })

    fastify.get("/stop-game", async (request, reply) => {
        return {game: room.stopGame()}
    })

    fastify.get("/start-game", async (request, reply) => {
        return {game: room.startGame()}
    })

    fastify.get("/replays", async (request, reply) => {
        return {data: await ReplayDataset.get()}
    })

    fastify.get("/maps", async (request, reply) => {
        return {maps: map.list()}
    })

    fastify.get("/add-blacklist", async (request, reply) => {
        return {blackList: Player.BlackList(request.query.name, request.query.reason)}
    })

    fastify.get("/blacklists", async (request, reply) => {
        return {data: await BlacklistDataset.get()}
    })
  }
  
  module.exports = routes