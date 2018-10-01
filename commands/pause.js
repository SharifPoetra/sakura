  const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
  const serverQueue = require('../index.js').queue.get(msg.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send({ embed: { description: '⏸ Paused the music for you!'}});
		}
   // if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to pause the song`}});	
		return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
} 

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'pause' 
} 