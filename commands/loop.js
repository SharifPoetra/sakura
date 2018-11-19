exports.run = (client, msg ,args) => {
  const serverQueue = client.queue.get(msg.guild.id);
  if (!msg.member.voice.channel) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You are not in a voice channel!'}});
  if(!serverQueue) return msg.channel.send({ embed: { description: 'Not playing anything right now'}});
  if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue`}});
  serverQueue.loop = !serverQueue.loop;
  queue.set(msg.guild.id, serverQueue);
  if(serverQueue.loop) return msg.channel.send({ embed: { color: 0x008000, description: '**✅ | Loop current queue**'}});
  return msg.channel.send({ embed: { color: 0xFF0000, description: '**✅ | Unloop current queue**'}});
}

exports.conf = {
   aliases: []
}
