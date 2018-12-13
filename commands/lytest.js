const { MessageEmbed } = require('discord.js');
const snek = require('node-superfetch');
const { load } = require('cheerio');
const api = require('genius-api');
const genius = new api(process.env.GENIUS);
exports.run = async (client, msg, args) => {
  
	if(!args[1]) return //msg.channel.send({embed: {color: 0xf91d1d, description: 'No query provided'}});

 const response = await genius.search(args.slice(1).join(' '));
 const { text } = await snek.get(response.hits[1].result.url)
 
 const embed = new MessageEmbed()
.setDescription(load(text)('.lyrics').text().slice(0,1999))
  msg.channel.send(embed) 

const cembed = new MessageEmbed()
.setDescription(load(text)('.lyrics').text().trim().slice(0,2000))
.setFooter(`Request by: ${msg.author.tag}`) 
  msg.channel.send(cembed) 

}

exports.conf = {
  aliases: [''],
  clientPerm: 'EMBED_LINKS',
  authorPerm: ''
}

exports.help = {
  name: 'lyrics',
  description: 'Search lyrics',
  usage: 'lyrics <query>',
  example: ['lyrics shape of you']
}
