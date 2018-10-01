const { RichEmbed } = require('discord.js');
const { chunk } = require('../util.js');
const { queue } = require('../index.js');

exports.run = async (client, msg, args) => {
	try{
		const serverQueue = queue.get(msg.guild.id);
		if(!serverQueue) return msg.channel.send({ embed: { color: 0xff0707, description: 'Not playing anything right now'}});
		let queues = [];
		serverQueue.songs.forEach((x, i) => {
			if(i !== 0){
				queues.push(x);
			}
		});
		const embed = new RichEmbed().setColor('RANDOM');
		if(!queues || queues.length < 1) return msg.channel.send(`🎶** | Now playing ${serverQueue.songs[0].title}**`, {embed: embed.setDescription('**No songs in queue**')});
		if(queues.length > 10){
			let index = 0;
			queues = queues.map((x, i) => `\`${i +1}\`. __**[${x.title}](${x.url})**__ **by** ${x.author.toString()}`);
			queues = chunk(queues, 10);
			embed.setDescription(queues[index].join('\n'));
			embed.setFooter(`Page ${index+1} of ${queues.length}`);
			const queuesMess = await msg.channel.send(`🎶 ** | Now playing ${serverQueue.songs[0].title}**`, {embed: embed});
			await queuesMess.react('⬅');
      await queuesMess.react('🔴');
			await queuesMess.react('➡');
      awaitReactions();
			function awaitReactions(){
				const filter = (rect, usr)=> ['⬅', '➡'].includes(rect.emoji.name) && usr.id === msg.author.id;
				queuesMess.createReactionCollector(filter, {time: 30000, max: 1})
				.on('collect', col => {
          if(col.emoji.name === '🔴') return queuesMess.delete();
					if(col.emoji.name === '⬅') index--;
					if(col.emoji.name === '➡') index++;
					index = ((index % queues.length) + queues.length) % queues.length;
					embed.setDescription(queues[index].join('\n'));
					embed.setFooter(`Page ${index+1} of ${queues.length}`);
					queuesMess.edit(`🎶 ** | Now playing ${serverQueue.songs[0].title}**`, {embed: embed});
					return awaitReactions();
				});
			}
		}else{
			embed.setDescription(queues.map((x, i) => `\`${i +1}\`. __**[${x.title}](${x.url})**__ **by** ${x.author.toString()}`).join('\n'));
			return msg.channel.send(`🎶 ** | Now playing ${serverQueue.songs[0].title}**`, {embed: embed});
		}
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`\`\`${e.stack}\`\`\`try again later`);
	}
}

exports.conf = {
   aliases: ['q']
}

exports.help = {
  name: 'queue' 
} 