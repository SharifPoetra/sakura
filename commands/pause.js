  const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
  const serverQueue = require('../index.js').queue.get(msg.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send({ embed: { color: 0xFF0000, description: '⏸ Paused the music for you!'}});
		}
		return msg.channel.send({ embed: { color: 0xFF0000, description: 'There is nothing playing.'}});
} 

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'pause' 
} 
