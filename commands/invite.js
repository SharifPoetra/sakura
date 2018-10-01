const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let version = require('../package.json').version
  let postMsg = await message.channel.send('***Please Wait...***');
  let bicon = client.user.displayAvatarURL;
  let invembed = new Discord.RichEmbed()
  .setColor('RANDOM') 
  .setTitle(`Hi i'm ${client.user.username}, here is the link can be used for:`) 
  .setThumbnail(bicon) 
  .addField('Invite me', '[Click Here](https://discordapp.com/oauth2/authorize?client_id=474723927688609797&scope=bot&permissions=112327680)')
  .addField('Vote me', '[Click Here](https://discordbots.org/bot/474723927688609797/vote)')
  .setFooter(`Request by: ${message.author.tag} | v${version}`);
  setTimeout(() => {
postMsg.edit(invembed)
}, 1000);
} 

exports.conf = {
   aliases: ['invitebot']
}

exports.help = {
  name: 'invite', 
  category: 'Support', 
  description: "Love sakura? why nkt you invite him to your own server!", 
  usage: 'invite' 
} 