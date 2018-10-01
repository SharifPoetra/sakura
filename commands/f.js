const Discord = require('discord.js');
const fs = require('fs');
let file = JSON.parse(fs.readFileSync("./f.json", "utf8"));

exports.run = (bot, message, args) => {
  if (!file) file = {
    total: 0
  }
  const total = file.total + 1;
  file = {
    total: total
  }
  fs.writeFile('./f.json', JSON.stringify(file), (err) => {
    if (err) console.log(err.stack)
  });
  const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} has paid their respects!`, message.author.displayAvatarURL)
    .setColor('RANDOM')
    .setFooter(`Total respect paid: ${file.total}.`);
  message.channel.send({
    embed
  });
};

exports.conf = {
  aliases: ['respect']
} 

exports.help = {
  name: 'f', 
  category: 'Fun', 
  description: "Hey why not you pay your respects?", 
  usage: 'f'
} 