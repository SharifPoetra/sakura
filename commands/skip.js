const Discord = require('discord.js');
exports.run = async (client, msg, args) => {
	try {
    const serverQueue = client.queue.get(msg.guild.id);
  		if (!msg.member.voice) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You are not in a voice channel!'}});
		if (!serverQueue) return msg.channel.send({ embed: { color: 0xFF0000, description: 'There is nothing playing that I could skip for you.'}});
		if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xFF0000, description: `You must be in **${serverQueue.voiceChannel.name}** to skip the song`}});
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return msg.react('⏩');
		} catch (e) {
 	msg.channel.send(`Oh no an error occurred :( \`${e}\` try again later.`)
 	} 
} 

exports.conf = {
   aliases: ['s']
}

exports.help = {
  name: 'skip' 
} 
