const { MessageEmbed } = require('discord.js');
const snek = require('node-superfetch');
const { load } = require('cheerio');
const api = require('genius-api');
const genius = new api(process.env.GENIUS);

exports.run = async (client, msg, args) => {
  
	if(!args[1]) return msg.channel.send({embed: {color: 0xf91d1d, description: 'You need to specify query to search the lyrics.' }});
	try {
 const response = await genius.search(args.slice(1).join(' '));
 const { text } = await snek.get(response.hits[0].result.url)

const chunked = require('../util').chunk(load(text)('.lyrics').text(),2040);
for(let i = 0; i < chunked.length; i++){
	const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setTitle(response.hits[0].result.full_title)
	.setURL(response.hits[0].result.url)
	.setThumbnail(response.hits[0].result.header_image_thumbnail_url)
	.setDescription(chunked[i]);
	if(i === chunked.length-1) 
    embed.setFooter(`Request by: ${msg.author.tag}`, msg.author.displayAvatarURL({size: 512}))
    .setTimestamp();
	await msg.channel.send(embed) 
}

} catch (e) {
	if(e.message === "Cannot read property 'result' of undefined") return msg.channel.send('No results found, Try with another query.');
	} 

}
exports.conf = {
  aliases: ['ly']
 } 