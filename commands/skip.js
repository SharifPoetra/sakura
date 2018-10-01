const Discord = require('discord.js');
const { queue } = require('../index.js');
exports.run = async (client, msg, args) => {
    const serverQueue = queue.get(msg.guild.id);
  		if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You are not in a voice channel!'}});
   // if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to skip the song`}});
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There is nothing playing that I could skip for you.'}});
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return msg.react('⏭️');
  
} 

exports.conf = {
   aliases: ['s']
}

exports.help = {
  name: 'skip' 
} 