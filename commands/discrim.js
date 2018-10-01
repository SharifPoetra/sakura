const Discord = require('discord.js');

exports.run = (client, message, args, prefix) => {
    
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM');
    
    if (isNaN(args[1]) || args[1] > 9999 || args[1] < 1) { 

        embed.setFooter('Sorry, please enter a valid discrim.');
      
        return message.channel.send(embed);
        
    }
    
   let resp = '';
   
   client.users.map(function(user) {
       
       if (user.discriminator == args[1]) return resp += `${user.username}\n`;
       else return; 
       
   })
   
    embed.setTitle(`Username with Discrim: ${args[1]}`)
        .setDescription(resp);
    message.channel.send(embed)
    
}

exports.conf = {
   aliases: ['discriminator']
}

exports.help = {
  name: 'discrim' 
} 