const Botlister = require('botlister');
const snek = require('node-superfetch');
const lister = new Botlister({ apiToken: process.env.BOTLIST, defaultBotId: '474723927688609797' });

exports.run = async (client) => {
  
  setTimeout(async () => {
 
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')

     var botGuilds = guildsEval.reduce((prev, val) => prev + val)
     var botChannels = channelsEval.reduce((prev, val) => prev + val)
     var botUsers = usersEval.reduce((prev, val) => prev + val)

     // discordbotlist.com POST
        lister.updateBotStatistics({
        guilds: botGuilds,
        users: botUsers, 
       shard_id: client.shard.id, 
       voice_connections : require('../index.js').queue.size
    }).then(() => console.log('Updated statistics on discordbotlist.com')).catch(console.error);
  // bots.discord.pw POST 
   /* snek
      .post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
      .send(`{"server_count": ${botGuilds}`)
      .type('application/json')
      .set('Authorization', process.env.BOTS_PW)
      .set('Accept', 'application/json')
      .end(err => {
      if (err) return console.error(err);
    });
    */
  let version = require('../package.json').version
    console.log(`${client.user.tag} is Online`)
    client.user.setActivity("STREAMING");
    setInterval(() => {
       let status = [`Shard ${client.shard.id}/${client.shard.count}`, `s!help | v${version}`, `in ${botChannels.toLocaleString()} channels, on ${botGuilds.toLocaleString()} guilds`,`in ${botGuilds.toLocaleString()} guilds, with ${botUsers.toLocaleString()} users`,  `with ${botUsers.toLocaleString()} users in ${botChannels.toLocaleString()} channels`, `s!changelog to see the latest update | v${version}`, `s!f to pay respects | v${version}`]
       let random = Math.floor(Math.random() * status.length)
       client.user.setPresence({ game: { name: `${status[random]}`, url: 'https://twitch.tv/sharif742'}});
       }, 20000);
  }, 15000);
  client.setInterval(() => {
    client.pings.unshift(Math.floor(client.ping));
  }, 1);
};