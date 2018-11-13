const { queue } = require('../index.js');

this.run = (client, msg ,args) => {
if(message.author.id !== '475230849239875584') return;
  const serverQueue = queue.get(msg.guild.id);
  if(!serverQueue) return msg.channel.send({ embed: { description: 'Not playing anything right now'}});
  if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to change the current volume`}});
  serverQueue.loop = !serverQueue.loop;
  queue.set(msg.guild.id, serverQueue);
  if(serverQueue.loop) return msg.channel.send({ embed: { description: '🔁 Looping Current Song.'}});
  return msg.channel.send({ embed: { description: 'Loop off'}});
}

exports.conf = {
   aliases: []
}
  
