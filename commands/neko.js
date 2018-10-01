const neko = require("nekos.life");
const { get } = require("node-superfetch");
const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  
  if(!args[1]){
            get('https://nekos.life/api/v2/img/neko')
        .then(body => {
            body = body.body
            const embed = new Discord.RichEmbed()
            embed.setDescription(`**[Click here if image failed to load](${body.url})**`)
            embed.setImage(body.url)
            embed.setColor('RANDOM')
            embed.setFooter('Powered by nekos.life') 
             message.channel.send(embed);
        })
        .catch(err => {
            console.log(err)
            client.channels.get('477282824983019530').send(new Discord.RichEmbed().setColor('RANDOM').setDescription(`Command Neko Error\n\`\`\`${err.message}\`\`\``))
        })
        }
  if(args[1] === 'gif'){
            get('https://nekos.life/api/v2/img/ngif')
        .then(body => {
            body = body.body
            const embed = new Discord.RichEmbed()
            embed.setDescription(`**[Click here if image failed to load](${body.url})**`)
            embed.setImage(body.url)
            embed.setColor('RANDOM')
            embed.setFooter('Powered by nekos.life')
             message.channel.send(embed);
        })
        .catch(err => {
            client.channels.get('477282824983019530').send(new Discord.RichEmbed().setColor('RANDOM').setDescription(`Command Neko Gif Error\n\`\`\`${err.message}\`\`\``))
        })
  
}
}

exports.conf = {
   aliases: ['nya', 'nekos']
}
exports.help = {
  name: 'neko', 
  category: 'Fun', 
  description: "Give you random neko, or use 'neko gif' to get random neko gif", 
  usage: 'neko [gif]' 
} 