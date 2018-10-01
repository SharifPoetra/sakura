 exports.run = async (client, msg, args) => {
   
   const serverQueue = require('../index.js').queue.get(msg.guild.id);

if (!msg.member.voiceChannel) return msg.channel.send({ embed: { color: 0xfc0505, description: 'You are not in a voice channel!'}});
   // if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to shuffle the queue`}});	
    if(!serverQueue) return msg.channel.send({ embed: { color: 0xfc0505, description: 'Not playing anything right now'}});
    if(serverQueue.songs.length  < 3) return msg.channel.send({ embed: { color: 0xfc0505, description: 'Add some songs first!'}});
    const np = serverQueue.songs.shift();
    const shuffled = require('../util.js').shuffle(serverQueue.songs);
    shuffled.unshift(np);
    serverQueue.songs = shuffled;
    msg.channel.send({ embed: { color: 0x2efc05, description: 'Shuffled queue song succes!'}});

	}
 
 exports.conf = {
   aliases: []
}
 
 exports.help = {
   name: 'shuffle' 
 } 