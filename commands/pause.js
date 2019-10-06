exports.run = async (client, msg, args) => {
  const serverQueue = client.queue.get(msg.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return msg.channel.send({
      embed: { color: 0xff0000, description: "⏸ Paused the music for you!" }
    });
  }
  return msg.channel.send({
    embed: { color: 0xff0000, description: "There is nothing playing." }
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "pause"
};
