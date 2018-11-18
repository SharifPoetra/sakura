exports.run = async (client, msg, args) => {
	const serverQueue = require('../index.js').queue.get(msg.guild.id);
	if (!msg.member.voice) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You are not in a voice channel!'}});
	if (!serverQueue) return msg.channel.send({ embed: { color: 0xFF0000, description: 'There is nothing playing that I could stop for you.'}});
	if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xFF0000, description: `You must be in **${serverQueue.voiceChannel.name}** to stop the song`}});
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('Stop command has been used!');
	return msg.channel.send({ embed: { color: 0xFF0000, description: 'Stopped music and leaving voice channel.'}});
}

exports.conf = {
   aliases: ['leave', 'disconnect']
}

exports.help = {
  name: 'stop' 
} 
