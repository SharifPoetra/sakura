const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    if (message.author.id !== "444454206800396309") return;
    let sv = client.guilds.get(args[1])
    if (!sv) return message.channel.send(`Enter a valid guild id`)
    sv.channels.random().createInvite().then(a => message.author.send(a.toString()))
  message.channel.send('check you Dm mastah') 

}

exports.conf = {
   aliases: ['gi']
}

module.exports.help = {
    name: "getinvite"
}