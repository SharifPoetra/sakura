const Discord = require('discord.js');

exports.run = async (client, message, args, prefix) => {
  
  if(!args[1]){
    let micon = client.user.displayAvatarURL;
    let hembed = new Discord.RichEmbed() 
    .setColor('RANDOM') 
    .setAuthor(`${client.user.username} Help for \`${this.help.name}\` command`, micon)
    .setDescription(`
To get some information about this server, Use:
\`${prefix}server info\`

To get the list emojis in this server, Use:
\`${prefix}server emojis\`

To get the list roles is this server, Use:
\`${prefix}server roles\`
`) 
    .setTimestamp()
    .setFooter(`Request by: ${message.author.tag}`) 
    message.channel.send(hembed);
  } 
  
  if (args[1] === 'info') {
    let guild = message.guild;
  let large = message.guild.large ? "✅" : "❎";
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let textChannels = 0;
  let voiceChannels = 0;
  guild.channels.forEach(channel => {
  channel.type === "text" ? textChannels++ : voiceChannels++;
  });

  let emojis = message.guild.emojis.size
  if (emojis) {
    emojis = message.guild.emojis.size
  } else {
    emojis = 'None'
  };
  const roles = message.guild.roles.size;

  let embed = new Discord.RichEmbed()
  .setColor('RANDOM') 
  .setThumbnail(icon) 
  .setAuthor(`${message.guild.name}`, icon)
  .setDescription(`
**• ID:** ${message.guild.id}
**• Region:** ${message.guild.region.toUpperCase()}
**• Shard:** [${client.shard.id}/${client.shard.count}]
**• Owner:** ${message.guild.owner}
**• Owner ID:** ${message.guild.owner.id}

**• Verification level:** ${message.guild.verificationLevel}
**• Created At:** ${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}

**• Total User:** ${message.guild.members.filter(member => !member.user.bot).size}
**• Total Bot:** ${message.guild.members.filter(member => member.user.bot).size}

**• Text Channels:** ${textChannels}
**• Voice Channels:** ${voiceChannels} 

**• Total Roles:** [**${roles}**]
Use **\`${prefix}server roles\`** for list server roles.
**• Total Emojis:** [**${emojis}**]
Use **\`${prefix}server emojis\`** for list server emojis.
`)

  return message.channel.send(embed);
    return;
  } 
  if (args[1] === 'emojis') {
    const pilGan = ['⏪', '⬅', '🔴', '➡', '⏩'];
	let index = 0;
    let emosize = message.guild.emojis.size;
  let emojis = require('../util.js').chunk(message.guild.emojis.array().map((x,i) => `\`${i+1}.\` ${x.toString()}`), 5)
  if (emojis) {
    emojis = require('../util.js').chunk(message.guild.emojis.array().map((x,i) => `\`${i+1}.\` ${x.toString()}`), 5)
  } else {
    emojis = 'There is nothing emojis!'
  } 
  
  let emoembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`List all emojis in ${message.guild.name}`) 
  .setDescription(emojis[index].join('\n'))
  .setFooter(`Page ${index+1} of ${emojis.length}`);
  const thisMess = await message.channel.send(emoembed);
    for(const pil of pilGan){
		await thisMess.react(pil);
	}
	paginate();
	async function paginate(){
		const filter = (rect, usr) => pilGan.includes(rect.emoji.name) && usr.id === message.author.id;		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 60000
		});
		if(!response.size) return undefined;
		const emoji = response.first().emoji.name;
		if(emoji === '🔴') return thisMess.delete();
		if(emoji === '⏪') index -= 2;
		if(emoji === '⬅') index--;
		if(emoji === '➡') index++;
		if(emoji === '⏩') index += 2;
		index = ((index % emojis.length) + emojis.length) % emojis.length;
		emoembed.setColor('RANDOM');
		emoembed.setDescription(emojis[index].join('\n'));
		emoembed.setFooter(`Page ${index+1} of ${emojis.length}`);
		thisMess.edit(emoembed);
		return paginate();
  }
  }
  if (args[1] === 'roles') {
    const pilGan = ['⏪', '⬅', '🔴', '➡', '⏩'];
	let index = 0;
    let rosize = message.guild.roles.size;
    let roles = require('../util.js').chunk(message.guild.roles.array().map((x, i) => `\`${i+1}\`. **${x}**`), 5);
  if (roles) {
    roles = require('../util.js').chunk(message.guild.roles.array().map((x, i) => `\`${i+1}\`. **${x}**`), 5);
  } else {
    roles = 'There is nothing Roles!'
  } 
  
  let rembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`List all roles in ${message.guild.name}`) 
  .setDescription(roles[index].join('\n'))
  .setFooter(`Page ${index+1} of ${roles.length}`);
 const thisMess = await message.channel.send(rembed);
    for(const pil of pilGan){
		await thisMess.react(pil);
	}
	paginate();
	async function paginate(){
		const filter = (rect, usr) => pilGan.includes(rect.emoji.name) && usr.id === message.author.id;		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 60000
		});
		if(!response.size) return undefined;
		const emoji = response.first().emoji.name;
		if(emoji === '🔴') return thisMess.delete();
		if(emoji === '⏪') index -= 3;
		if(emoji === '⬅') index--;
		if(emoji === '➡') index++;
		if(emoji === '⏩') index += 3;
		index = ((index % roles.length) + roles.length) % roles.length;
		rembed.setColor('RANDOM');
		rembed.setDescription(roles[index].join('\n'));
		rembed.setFooter(`Page ${index+1} of ${roles.length}`);
		thisMess.edit(rembed);
		return paginate();
  }
  } 
} 
exports.help = {
  name: 'server'
} 