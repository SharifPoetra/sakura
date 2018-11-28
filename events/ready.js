const Botlister = require('botlister');
const snek = require('node-superfetch');
const lister = new Botlister({ apiToken: process.env.BOTLIST, defaultBotId: '500893309514940432' });

exports.run = async (client) => {
  
 // setTimeout(async () => {
 
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')
      let voiceConnect = await client.shard.broadcastEval('this.voiceConnections.size') 
      
     var botGuilds = guildsEval.reduce((prev, val) => prev + val)
     var botChannels = channelsEval.reduce((prev, val) => prev + val)
     var botUsers = usersEval.reduce((prev, val) => prev + val)
     var voice = voiceConnect.reduce ((prev, val) => prev + val) 
     
     // discordbotlist.com POST
        lister.updateBotStatistics({
        guilds: botGuilds,
        users: botUsers, 
       shard_id: client.shard.id, 
       voice_connections : voice
    }).catch(e => console.log("[BOTLIST] failed POST :  "+ e));
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
  client.setInterval(() => {
    client.pings.unshift(Math.floor(client.ping));
  }, 1);
};
