const Haxball = require("haxball.js");
const fastify = require('fastify')({
  pluginTimeout: 0, 
});

fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      origin: true
    };
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }
    callback(null, corsOptions)
  }
})

const fs = require('node:fs');
const bot = require("./events/init.js");
const management = require("./services/management.js");
require('dotenv').config();

Haxball.then(async (HBInit) => {
  const room = HBInit({
    roomName: "mersin yarrağımı yersin - anonim kişi",
    maxPlayers: 16,
    public: true,
    noPlayer: true,
    token: process.env.TOKEN,
  });

  fastify.register(management, {room});

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });

  bot.init(room);
});