const { RichEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
  
  let embed = new RichEmbed() 
  .setColor('RANDOM').setAuthor(`Hye ${message.author.tag}`, message.author.displayAvatarURL) 
  .setDescription(`You can support my creator by donating on:\nhttps://paypal.me/poetrakencana\n\n**Thank You ${message.author.username}**`)
  .setFooter(`${client.user.username}`, client.user.displayAvatarURL)
  message.channel.send(embed)
} 

exports.conf = {
  aliases: ['support']
} 
exports.help = {
  name: 'donate', 
  category: 'Support', 
  description: "Donate my creator use PayPal", 
  usage: 'donate'
} 