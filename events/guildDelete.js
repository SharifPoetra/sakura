const { RichEmbed } = require('discord.js');

exports.run = async (client, guild) => {

//const liveLeave = client.channels.get("477282824983019530");
    let liveLEmbed = new RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(`Your Bot Has Stopped Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    client.channels.get('477282824983019530').send({liveLEmbed});
 };