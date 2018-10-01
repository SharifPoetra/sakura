const { RichEmbed } = require('discord.js');
const snek = require('node-superfetch');
const { load } = require('cheerio');
const number = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣'];
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN);

exports.run = async (client, msg, args) => {
  
  /*dbl.hasVoted(msg.author.id).then(voted => {
    if (!voted) return msg.channel.send({ embed: { description: `You must vote first before using this feature [Click Here](https://discordbots.org/bot/474723927688609797/vote), Then wait for 1 minute until your vote is processed!`}});
    if (voted) {*/
	if(!args[1]) return msg.channel.send({embed: {color: 0xf91d1d, description: 'No query provided'}});
	try{
		const embed = new RichEmbed()
		embed.setColor('RANDOM');
		const { body } = await snek.get('https://api.genius.com/search')
		.query({ q: args.slice(1).join('+') })
		.set('Authorization', `Bearer ${process.env.GENIUS}`);
		if(!body.response.hits.length) return msg.channel.send({ embed: { color: 0xf91d1d, description: 'No result found'}});
		const result = body.response.hits.splice(0, 5);
		const thisMess = await msg.channel.send(embed.setDescription(result.map((x, i) => `${number[i]}[${x.result.full_title}](${x.result.url})`).join('\n')));
		for(let i = 0; i < result.length; i++){
			await thisMess.react(number[i]);
		}
		const filter = (rect, usr) => number.includes(rect.emoji.name) && usr.id === msg.author.id
		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 15000
		});
    if (response.size){
       thisMess.delete();
    }
		if(!response.size){
			return thisMess.edit('**You took to long to reply!**', {}).then(x => x.delete(6000));
		}
		const choice = number.indexOf(response.first().emoji.name);
		const { text } = await snek.get(result[choice].result.url);
	   const ouch = require('../util.js').chunk(load(text)('.lyrics').text().trim(), 400)
     const pilGan = ['⏪', '⬅', '🔴', '➡', '⏩'];
    let index = 0;
    embed.setTitle(result[choice].result.full_title);
		embed.setURL(result[choice].result.url);
		embed.setThumbnail(result[choice].result.header_image_thumbnail_url);
		embed.setDescription(ouch[index])
    embed.setFooter(`Page ${index+1} of ${ouch.length} | ${msg.author.tag}`, msg.author.displayAvatarURL);
		const thisMes = await msg.channel.send(embed)
    
    for(const pil of pilGan){
		await thisMes.react(pil);
	}
	paginate();
	async function paginate(){
		const filter = (rect, usr) => pilGan.includes(rect.emoji.name) && usr.id === msg.author.id;		const response = await thisMes.awaitReactions(filter, {
			max: 1,
			time: 90000000,
		});
		if(!response.size) return undefined;
		const emoji = response.first().emoji.name;
		if(emoji === '🔴') return thisMes.delete();
		if(emoji === '⏪') index -= 3;
		if(emoji === '⬅') index--;
		if(emoji === '➡') index++;
		if(emoji === '⏩') index += 3;
		index = ((index % ouch.length) + ouch.length) % ouch.length;
		embed.setColor('RANDOM');
		embed.setDescription(ouch[index]);
		embed.setFooter(`Page ${index+1} of ${ouch.length} | ${msg.author.tag}`, msg.author.displayAvatarURL);
		thisMes.edit(embed);
		return paginate();
	}
    
    
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}

}

exports.conf = {
  aliases: ['l'],
  clientPerm: 'EMBED_LINKS',
  authorPerm: ''
}

exports.help = {
  name: 'lyrics',
  description: 'Search lyrics',
  usage: 'lyrics <query>',
  example: ['lyrics shape of you']
}