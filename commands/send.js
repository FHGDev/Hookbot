const dhooks = require('discord-hookclient')

module.exports.run = (bot, message, args) => {
  var hasdata = null;
  var hook;

  bot.guildconf.findOne({guildId: message.guild.id}, (err, data) => {
    if (!data) {
      hasdata = false;
      const newData = new bot.guildconf({
        guildId: message.guild.id,
        webhook_id: "",
        webhook_token: ""
      })
      newData.save().catch(err => console.error(`Error saving to the database. Error Message: ${err}`))
    } else {
      hasdata = true;
      
      hook = new dhooks.WebhookClient(data.webhook_id, data.webhook_token)
    }
  })
  
  const content = args.join(" ");
  const username = args.slice(content.length).join(" ");
  
  const opts = {
    content: content
  }
  
  const em = new embed()
  .setTitle("Hookbot Send Utility")
  .setDescription("I sent your message to your webhook. It should arrive shortly!")
  .setTimestamp()
  .setColor("RANDOM")
  
  hook.send(opts)
  message.channel.send({embed: em})
}


module.exports.help = {
  name: "send"
}
