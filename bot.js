console.log("[STARTUP] Starting Hookbot...")

const discord = require('discord.js')
const bot = new discord.Client()
const disc = require('discord-hookclient')
const mongoose = require('mongoose')
console.log("[STARTUP] Connecting to MongoDB...")
setTimeout(() => {
  mongoose.connect(`mongodb+srv://FHGDev:${process.env.mongo_pw}@hookbot-j78em.azure.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    console.log(`[STARTUP] Successfully connected to MongoDB.`)
  })
  .catch(err => {
    console.error(`[STARTUP] Couldn't connect to MongoDB.\n Error Message: ${err}`)
  })
}, 2500)

bot.commands = new Map()
bot.prefix = "h_"
bot.guildconf = require('./models/guildConf')

require('fs').readdir('./commands/', (err,files) => {
  if (err) return console.error(err);
  
  files.filter(f => f.split(".").pop() === "js").forEach((f,i) => {
    var name = require(`./commands/${f}`).help.name
    var file = require(`./commands/${f}`)
    
    bot.commands.set(name, file);
  })
})

bot.on('ready', () => {
  console.log(`[STARTUP] ${bot.user.username} is ready!`)
  bot.guilds.forEach((g,i) => {
    console.log(`[GUILD LISTINGS] Name: ${g.name} ID: [${i}] Members: ${g.memberCount}`)
  })
  
  bot.user.setActivity(`for h_help | ${bot.guilds.size} servers`, {type: "WATCHING"})
})

bot.on('message', message => {
  
})

bot.login(process.env.token)
