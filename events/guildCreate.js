const { RichEmbed } = require('discord.js');

exports.run = async (client, guild) => {
   //const liveJoin = client.channels.get("477282824983019530");
    let liveJEmbed = new RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(`Your Bot Has Started Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Gained**: ${guild.memberCount}`)
    client.channels.get('477282824983019530').send({liveJEmbed});
 };