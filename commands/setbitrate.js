exports.run = async(client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
	var value = args[1];
	if (!serverQueue) return msg.channel.send({ embed: { color: 0xFF0000, description: 'There is nothing playing.'}});
	if (!msg.member.voice) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You need to be in voice channel to changes song bitrate.'}});
	if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to change the song bitrate`}});
	if (value > 96) value = 96;
        if (value < 0) value = 0;
        if (!value) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You must specify a value between 1-96'}});
        if (!serverQueue.connection.dispatcher) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Can\'t set bitrate before the song has started.'}});
        serverQueue.connection.dispatcher.setBitrate(value);
        return msg.channel.send({ embed: { color: 0x008000, description: `Bitrate set to ${value}`}}) 
	} 
	exports.conf = {
		aliases: ['btr', 'bitrate'] 
	}