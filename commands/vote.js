const { RichEmbed } = require('discord.js');
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN);
let version = require('../package.json').version;
exports.run = async (client, message, args) => {
dbl.hasVoted(message.author.id).then(voted => {
    if (!voted){
      let embed = new RichEmbed() 
      .setColor('RANDOM') 
      .addField(`${message.author.tag} You can vote ${client.user.username} now!`, `[Click Here To Vote](https://discordbots.org/bot/474723927688609797/vote)`) 
      .setFooter(`Thank you for voting | v${version}`, client.user.displayAvatarURL) 
      return message.channel.send(embed) 
    } else {
      return message.channel.send({ embed: { color: 0x5cf442, description: `**${message.author.username}**, You already give me upvote. Comeback in 12 Hour :)`}})
    } 
})
}

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'vote', 
  category: 'Support', 
  description: "Vote sakura on Discord Bot List", 
  usage: 'vote' 
} 