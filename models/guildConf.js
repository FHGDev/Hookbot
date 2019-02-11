const mongoose = require('mongoose')

const schema = mongoose.Schema({
  guildId: String,
  webhook_id: String,
  webhook_token: String
})

module.exports = mongoose.model("guildConf", schema)
