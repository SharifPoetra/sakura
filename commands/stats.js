const Discord = require("discord.js");
const cpuStat = require("cpu-stat");
const { exec } = require("child_process");

const run = (module.exports.run = async (client, msg, args) => {
  try {
    let uptime = require("../util.js").parseDur(client.uptime);

    let botGuilds = client.guilds.cache.size;
    let botChannels = client.channels.cache.size;
    let botUsers = client.users.cache.size;
    let botConnect = client.voice.connections.size;

    const users = client.users.cache.array();
    const guildMembers = msg.guild.members.cache.array();
    const channels = client.channels.cache.array();

    var guildTotalOnline = 0;
    var totalOnline = 0;
    var totalTextChannels = 0;
    var totalVoiceChannels = 0;

    for (var i = 0; i < guildMembers.length; i++) {
      if (guildMembers[i].presence.status === "online") {
        guildTotalOnline++;
      }
    }

    for (var i = 0; i < users.length; i++) {
      if (users[i].presence.status === "online") {
        totalOnline++;
      }
    }
    var nonGuildChannels = 0;
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].type === "text") totalTextChannels++;
      else if (channels[i].type === "voice") totalVoiceChannels++;
      else nonGuildChannels++;
    }

    exec("uptime -p", async (error, stdout, stderr) => {
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }

        let info = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(client.user.displayAvatarURL)
          .setTitle(`${client.user.username}\'s Statistics`)
          .addField(
            "Guilds",
            `• ${client.guilds.cache.size.toLocaleString()}/${botGuilds.toLocaleString()} Guilds`
          )
          .addField(
            "Users",
            `
• ${botUsers.toLocaleString()} Users
• ${totalOnline} Online 

• ${msg.guild.memberCount.toLocaleString()} users this guild
• ${guildTotalOnline} online this guild
`,
            true
          )
          .addField(
            "Channels",
            `• ${client.channels.cache.size.toLocaleString()}/${(
              botChannels - nonGuildChannels
            ).toLocaleString()} Channels 
• ${msg.guild.channels.cache.size.toLocaleString()} this guild

• ${totalTextChannels.toLocaleString()} Total Text
• ${totalVoiceChannels.toLocaleString()} Total Voice
• ${botConnect} Queue Connected
`,
            true
          )
          .addField(
            "System",
            `• ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
              2
            )}MB Memory used
• ${percent.toFixed(2)}% CPU used
• ${client.ws.ping.toFixed(2)} MS websocket
`,
            true
          )
          .addField("Uptime", `up ${uptime}`, true)
          .addField("Server uptime", stdout, true)
          .addField(
            "Usefull Links",
            "**[Invite](https://discordapp.com/oauth2/authorize?client_id=500893309514940432&scope=bot&permissions=1517419646)** | **[Support server](https://discord.gg/BTckadf)** | **[Vote](https://discordbots.org/bot/500893309514940432/vote)**"
          )
          .setTimestamp()
          .setFooter(`Request by: ${msg.author.tag}`);

        return msg.channel.send(info); // eslint-disable-line one-var
      });
    });
  } catch (e) {
    msg.channel.send(e.message);
  }
});

exports.conf = {
  aliases: ["statistics"]
};

module.exports.help = {
  name: "stats",
  aliases: ["servers"],
  ownerOnly: false,
  description: "bot server info",
  usage: ""
};
