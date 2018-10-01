const Discord = require('discord.js');


module.exports.run = async (client, message, args) => {
  if (message.author.id !== '444454206800396309' && message.author.id !== '427473949476126740') return;

    message.channel.send("**Please wait...**").then(m => {
        setTimeout(() => {
            m.edit("**Rebooting...**").then(ms => {
                setTimeout(() => {
                    ms.edit("**Done.**")
                }, 1000)
            })
        }, 1000);

    })
    
    .then(message => client.destroy())
    .then(() => client.login(process.env.SECRET))
 } 

exports.conf = {
   aliases: ['shutdown']
}

module.exports.help = {
  name: 'reboot',
  category: 'creator', 
  description: 'This will reboot the bot instance.',
  usage: 'reboot'
};