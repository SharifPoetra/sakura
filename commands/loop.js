const { queue } = require('../index.js');

this.run = (client, msg ,args) => {
  const serverQueue = queue.get(msg.guild.id);
  if(!serverQueue) return msg.channel.send({ embed: { description: 'Not playing anything right now'}});
  serverQueue.loop = !serverQueue.loop;
  queue.set(msg.guild.id, serverQueue);
  if(serverQueue.loop) return msg.channel.send({ embed: { description: '🔁 Looping Current Song.'}});
  return msg.channel.send({ embed: { description: 'Loop off'}});
}

exports.conf = {
   aliases: []
}