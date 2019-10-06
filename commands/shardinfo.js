const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, color, prefix) => {
  if (args[1] === "core") return;
  try {
    const results = await client.shard.broadcastEval(
      "[this.shard.id, this.users.size, this.channels.size, this.guilds.size, this.ws.ping.toFixed(0), this.voiceConnections.size, (process.memoryUsage().rss / 1024 / 1024).toFixed(2),  this.uptime]"
    );

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL({ format: "png", size: 2048 }))
      .setTitle("Shards Information")
      .setTimestamp()
      .setFooter(`Request by: ${message.author.tag}`);
    for (const res of results) {
      embed.addField(
        `#Shard [${res[0]} / ${client.shard.count}] ${
          client.shard.id === res[0] ? "📌" : ""
        }`,
        `
User: ${res[1]}
Channels: ${res[2]}
Guilds: ${res[3]}
Queue: ${res[5]}
Ping: ${res[4]} ms
RAM: ${res[6]} MB
Uptime: ${moment.duration(res[7]).format("hh:mm:ss", { trim: false })}
		`,
        true
      );
    }
    return message.channel.send(embed);
  } catch (e) {
    console.log(e);
    message.channel.send(e.message);
  }
};

exports.conf = {
  aliases: ["si"],
  cooldown: "5"
};
exports.help = {
  name: "shardinfo",
  description: "Returns information about shards.",
  usage: "shardinfo"
};
