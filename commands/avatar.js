const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  var footertext = [`${client.user.username}: oof sexy`, `${client.user.username}: nice`, `${client.user.username}: 🔥`, `${client.user.username}: Someone's looking sharp today!`, `${client.user.username}: oof if i wasn't a bot...`, `${client.user.username}: looking sexier than a mug`];
    var rand = Math.floor(Math.random() * footertext.length);
    var randomfooter = footertext[rand];
  let boticon = client.user.displayAvatarURL;
  
const member = message.mentions.members.first() || message.guild.members.get(args[1]) || message.member;
  let avatarembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${member.user.tag}'s Avatar`)
  .setImage(member.user.displayAvatarURL)
  .setFooter(`${randomfooter} | Request by: ${message.author.tag}`, `${boticon}`) 
   message.channel.send(avatarembed);
  
 }

exports.conf = {
   aliases: ['ava', 'pp']
}

exports.help = {
    name: 'avatar',
    aliases: ['pp'],
    description: 'Shows User Avatars',
    usage: 'avatar'
};