const snek = require("node-superfetch");

exports.run = async client => {
  let guildsEval = await client.shard.broadcastEval("this.guilds.size");
  let channelsEval = await client.shard.broadcastEval("this.channels.size");
  let usersEval = await client.shard.broadcastEval("this.users.size");
  let voiceConnect = await client.shard.broadcastEval(
    "this.voiceConnections.size"
  );

  var botGuilds = guildsEval.reduce((prev, val) => prev + val);
  var botChannels = channelsEval.reduce((prev, val) => prev + val);
  var botUsers = usersEval.reduce((prev, val) => prev + val);
  var voice = voiceConnect.reduce((prev, val) => prev + val);

  let version = require("../package.json").version;
  console.log(`${client.user.tag} is Online`);
  client.setInterval(() => {
    client.pings.unshift(Math.floor(client.ping));
  }, 1);
};
