const { handleVideo, youtube, prefix } = require('../index.js');
const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	
	const voiceChannel = msg.member.voiceChannel;
	if (!voiceChannel) return msg.channel.send({ embed: { description: 'I\'m sorry but you need to be in a voice channel to play music!'}});
	if (!args[1]) return msg.channel.send({ embed: { color: 0x4286f4, description: `*Correct usage is*: **${prefix}play** ***[Song Name]/[Video URL]/[Playlist URL]***`}});
	//if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `Woop I already playing in the other channel you must be in **${serverQueue.voiceChannel.name}** to request the song`}});	
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.channel.send({ embed: { description: 'I cannot connect to your voice channel, make sure I have the proper permissions!'}});
	if (!permissions.has('SPEAK')) return msg.channel.send({ embed: { description: 'I cannot speak in this voice channel, make sure I have the proper permissions!'}});
	if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await youtube.getPlaylist(url);
		const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
			const video2 = await youtube.getVideoByID(video.id);
			await handleVideo(video2, msg, voiceChannel, true);
		}
		return msg.channel.send({ embed: { description: `✅ Playlist: **${playlist.title}** has been added to the queue!`}});
	} else {
		try {
			var video = await youtube.getVideo(url);
		} catch (error) {
			try {
				var videos = await youtube.searchVideos(searchString, 10);
				let index = 0;
				var selectembed = new RichEmbed()
				.setColor('RANDOM') 
				.setTitle('Song selection')
				.setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`) 
				.setFooter('Please provide a value to select one of the search results ranging from 1-10 or all') 
				
				let msgtoDelete = await msg.channel.send({ embed: selectembed})
				try{
					const filter = msg2 => ((msg2.content > 0 && msg2.content < 11) || (/all/gi).test(msg2.content)) && msg2.author.id === msg.author.id;
					var response = await msg.channel.awaitMessages(filter, {
						maxMatches: 1,
						time: 30000,
						errors: ['time']
					});
					msgtoDelete.delete();
				} catch (err) {
					const noPick = new RichEmbed()
					.setDescription("No or invalid value entered, cancelling video selection.")
					.setColor('RANDOM')
					msg.channel.send({embed: noPick});
					return msgtoDelete.delete()
				}
				if((/all/gi).test(response.first().content)){
					for(const vid of videos){
						const vid2 = await youtube.getVideoByID(vid.id);
						await handleVideo(vid2, msg, voiceChannel, true);
					}
					return msg.channel.send({ embed: { color: 0x42f456, description: `✅ Added 10 songs with query **${searchString}**`}});
				}
				const videoIndex = parseInt(response.first().content);
				var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
			} catch (err) {
				return msg.channel.send('🆘 I could not obtain any search results.');
			}
		}
		return handleVideo(video, msg, voiceChannel);
	}
  
}

exports.conf = {
   aliases: ['search-music', 'sm']
}

exports.help = {
  name: 'play' 
} 