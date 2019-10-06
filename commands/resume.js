const { MessageEmbed } = require("discord.js");

exports.run = async (client, msg, args) => {
  const serverQueue = client.queue.get(msg.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return msg.channel.send({
      embed: { color: 0x008000, description: "▶ Resumed the music for you!" }
    });
  }
  return msg.channel.send({
    embed: { color: 0xff0000, description: "There is nothing playing." }
  });
};

exports.help = {
  name: "resume"
};
