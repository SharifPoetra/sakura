const { RichEmbed } = require('discord.js');

const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

exports.run = (client, msg, args) => {
  
let text = args.slice(1).join(' ')

if(!text) return msg.channel.send(new RichEmbed().setColor('RANDOM').setDescription(`**${msg.author.username}**, What can i say? **${faces[Math.floor(Math.random() * faces.length)]}**`))

		let owo = text
			.replace(/(?:r|l)/g, 'w')
			.replace(/(?:R|L)/g, 'W')
			.replace(/n([aeiou])/g, 'ny$1')
			.replace(/N([aeiou])/g, 'Ny$1')
			.replace(/N([AEIOU])/g, 'NY$1')
			.replace(/ove/g, 'uv')
			.replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
			.trim();
	 msg.channel.send(new RichEmbed().setColor('RANDOM').setDescription(owo)) 
  msg.delete();
};

exports.conf = {
   aliases: ['owo']
}

exports.help = {
  name: 'owoify', 
  category: 'Fun', 
  description: "Response with owoify text", 
  usage: 'owoify <text>' 
} 