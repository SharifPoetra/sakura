const Discord = require("discord.js");
const cpuStat = require('cpu-stat');
const run = module.exports.run = async (client, msg, args) => {
  
  if(args[1] === '-t') return parseDept(msg);
  if(args[1] === '-g') return getGuild(client, msg);
    let uptime = require('../util.js').parseDur(client.uptime);
  
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')
      let voiceEval = await client.shard.broadcastEval('this.voiceConnections.size')
     let botGuilds = guildsEval.reduce((prev, val) => prev + val)
     let botChannels = channelsEval.reduce((prev, val) => prev + val)
     let botUsers = usersEval.reduce((prev, val) => prev + val)
     let botConnect = voiceEval.reduce((prev, val) => prev + val) 

    let postMsg = await msg.channel.send("***Please Wait...***");
  
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
    
    let info = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Bot Information', `• Node.js: ${process.version}\n• Discord.js: ${Discord.version}\n__Creator__:\n• Sharif#2769\n• OwO#8287`) 
        .addField('General Stats', `• **${client.shard.id} / ${client.shard.count}** shard\n• **${botGuilds.toLocaleString()}** guilds\n• **${botChannels.toLocaleString()}** channels\n• **${botUsers.toLocaleString()}** other users\n• **${botConnect}** queue(s).`)
        .addField('Usage', `• ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB Memory used\n• ${percent.toFixed(2)}% CPU used`)
        .addField('Uptime', uptime)
        .addField('Websocket', `${client.ping.toFixed(2)}ms`)
        .setTimestamp()
        .setFooter(`Request by: ${msg.author.tag}`)

         setTimeout(() => {
         postMsg.edit(info)
          }, 1000);
  })
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