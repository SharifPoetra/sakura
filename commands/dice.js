const { RichEmbed: OwOEmbed } = require('discord.js');

this.run = (client, msg, args) => {
  const embed = new OwOEmbed()
  .setColor('GREEN')
  .setTitle('🎲 DICE 🎲')
  .setDescription(`
${Math.floor(Math.random()*8)}
`);
  return msg.channel.send(embed);
}

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'dice', 
  category: 'Games', 
  description: 'Rolled dice and get your luck', 
  usage: 'dice' 
} 