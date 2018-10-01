exports.run = async (client, msg, args) => {
	const serverQueue = require('../index.js').queue.get(msg.guild.id);
	if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You are not in a voice channel!'}});
	//if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to stop the song`}});
	if (!serverQueue) return msg.channel.send({ embed: { description: 'There is nothing playing that I could stop for you.'}});
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('Stop command has been used!');
	return msg.channel.send({ embed: { color: 0xef090, description: 'Stopped music and leaving voice channel!'}});
}

exports.conf = {
   aliases: ['leave', 'disconnect']
}

exports.help = {
  name: 'stop' 
} 