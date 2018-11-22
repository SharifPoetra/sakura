const Discord = require("discord.js");
const cpuStat = require('cpu-stat');
const run = module.exports.run = async (client, msg, args) => {
	try {
  if(!args[1]) return undefined;
  if(args[1] === 'music') {
  if(args[2] === '-t') return parseDept(msg);
  if(args[2] === '-g') return getGuild(client, msg);
    let uptime = require('../util.js').parseDur(client.uptime);
  
let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')
      let voiceEval = await client.shard.broadcastEval('this.voiceConnections.size')
     let botGuilds = guildsEval.reduce((prev, val) => prev + val)
     let botChannels = channelsEval.reduce((prev, val) => prev + val)
     let botUsers = usersEval.reduce((prev, val) => prev + val)
     let botConnect = voiceEval.reduce((prev, val) => prev + val) 
     
     const users = client.users.array();
  		const guildMembers = msg.guild.members.array();
  		const channels = client.channels.array();

  		var guildTotalOnline = 0;
  		var totalOnline = 0;
  		var totalTextChannels = 0;
  		var totalVoiceChannels = 0;
  		

  		for(var i = 0; i < guildMembers.length; i++){
  			if(guildMembers[i].presence.status === 'online'){
  				guildTotalOnline++;
  			}
  		}

  		for(var i = 0; i < users.length; i++){
  			if(users[i].presence.status === 'online'){
  				totalOnline++;
  			}
  		}
  		var nonGuildChannels = 0;
  		for(var i = 0; i < channels.length; i++){
  			if(channels[i].type === 'text')
  				totalTextChannels++
  			else if(channels[i].type === 'voice')
  				totalVoiceChannels++
  			else
  				nonGuildChannels++
  		}
  
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
  
    let info = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(client.user.displayAvatarURL)
  .setTitle(`${client.user.username}\'s Statistics (shard/total)`) 
  .setDescription(`This guild is running on shard ${client.shard.id+1} of ${client.shard.count}...`)
  .addField('Guilds', `• ${client.guilds.size.toLocaleString()}/${botGuilds.toLocaleString()} Guilds`) 
  .addField('Users', `
• ${client.users.size.toLocaleString()}/${botUsers.toLocaleString()} Users
• ${totalOnline} Online 

• ${msg.guild.memberCount.toLocaleString()} users this guild
• ${guildTotalOnline} online this guild
`, true)
  .addField('Channels', `• ${client.channels.size.toLocaleString()}/${(botChannels - nonGuildChannels).toLocaleString()} Channels 
• ${msg.guild.channels.size.toLocaleString()} this guild

• ${totalTextChannels.toLocaleString()} Total Text
• ${totalVoiceChannels.toLocaleString()} Total Voice
• ${client.voiceConnections.size}/${botConnect} Queue Connected
`, true)
  .addField('System', `• ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB Memory used
• ${percent.toFixed(2)}% CPU used
• ${client.ping.toFixed(2)} MS websocket
`, true)
  .addField('Uptime', uptime, true) 
  .addField('Usefull Links', '**[Invite](https://discordapp.com/oauth2/authorize?client_id=500893309514940432&scope=bot&permissions=1517419646)** | **[Support server](https://discord.gg/BTckadf)** | **[Vote](https://discordbots.org/bot/500893309514940432/vote)**') 
  .setTimestamp()
  .setFooter(`Request by: ${msg.author.tag}`)
    
    return msg.channel.send(info); // eslint-disable-line one-var
  });
 } 
} catch (e) {
	msg.channel.send(e.message);
	} 
} 

function parseDept (msg){
	let { dependencies } = require('../package.json');
	let dept = Object.keys(dependencies);
	let ver = Object.values(dependencies);
	msg.channel.send(`
===== DEPENDENCIES =====
${dept.map((x,i) => `${x} : ${ver[i]}`).join(',\n')}
	`, {code: 'diff'});
}

async function getGuild (client, msg){
	const guilds = require('../util.js').chunk(client.guilds.array().map((x, i) => `\`${i+1}\`. **${x.name}**`), 10);
	const pilGan = ['⏪', '⬅', '🔴', '➡', '⏩'];
	let index = 0;
	const embed = new (require('discord.js').RichEmbed)();
	embed.setTitle('🌐 | Guild List');
	embed.setColor('RANDOM');
	embed.setDescription(guilds[index].join('\n'));
	embed.setFooter(`Page ${index+1} of ${guilds.length}`);
	const thisMess = await msg.channel.send(embed);
	for(const pil of pilGan){
		await thisMess.react(pil);
	}
	paginate();
	async function paginate(){
		const filter = (rect, usr) => pilGan.includes(rect.emoji.name) && usr.id === msg.author.id;		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 60000,
		});
		if(!response.size) return undefined;
		const emoji = response.first().emoji.name;
		if(emoji === '🔴') return thisMess.delete();
		if(emoji === '⏪') index -= 10;
		if(emoji === '⬅') index--;
		if(emoji === '➡') index++;
		if(emoji === '⏩') index += 10;
		index = ((index % guilds.length) + guilds.length) % guilds.length;
		embed.setColor('RANDOM');
		embed.setDescription(guilds[index].join('\n'));
		embed.setFooter(`Page ${index+1} of ${guilds.length}`);
		thisMess.edit(embed);
		return paginate();
	}
}

exports.conf = {
   aliases: ['info', 'botinfo', 'about']
}

module.exports.help = {
    name: 'stats', 
    aliases: ['servers'],
    ownerOnly: false,
    description: 'bot server info',
    usage: ''
}
