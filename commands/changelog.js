const Discord = require('discord.js');

exports.run = async (client, message, args, prefix) => {
  
  let version = require('../package.json').version
  let bicon = client.user.displayAvatarURL;
  
  let Cembed = new Discord.RichEmbed() 
  .setColor('RANDOM') 
  .setAuthor('Last Sakura Update [20/09/2018]', bicon)
  .addField(`✓ Added:`, `1. donate\n2. lyrics\n3. akinator`)
  .addField(`**⇗** Upgrade:`, `None`) 
  .addField(`✎ Fixed:`, `1. Move dice to games category\n2. Move avatar to Utility category\nMore Fixes`) 
  .addField(`☞ Rewrite:`, `1. forceplay to play\n2. play to search\n3. Change owo to owoify\n3. Akinator has been removed`) 
  .setFooter(`Request by: ${message.author.tag} | v${version}`) 
  message.channel.send(Cembed);  
} 

exports.help = {
  name: 'changelog' 
} 