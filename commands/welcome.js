const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args, prefix) => {

var option = args.slice(1).join(" ")
            if (!option) {
              var embed = new Discord.RichEmbed()
              .setAuthor(bot.user.username)
              .setColor('RANDOM')
              .setDescription(`
**Proper Usage:**
• ${prefix}welcome set \`#tagchannel\`
• ${prefix}welcome on
• ${prefix}welcome off
**Example:**
• ${prefix}welcome set \`#welcome-leave\`
**After do that, do again:**
• ${prefix}welcome on
`)
              .setFooter("Welcome Announcement")
              .setTimestamp()
              message.channel.send({embed});
            } else {
              if (option.match("set")) {
            var channel = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
            if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '444454206800396309') return message.reply("Sorry, you don't have permissions to do this!");
            var inputmessage = message.mentions.channels.first()
            if (args[0]) {
              channel[message.guild.id] = {
                channel: inputmessage.id
             };
              fs.writeFile("./welcome.json", JSON.stringify(channel), (err) => {
                if (err) console.log(err)
             });
              
              var embed = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setDescription(`Welcome image set to\n\n${inputmessage}`)
              .setTimestamp()              
              message.channel.send({embed});
            }
            }
            }
  
            if (option.match("on")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 1
                };
                  fs.writeFile("./welcomeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription(`welcome image has been set **on**.`)
                .setTimestamp()
                .setFooter("Welcome enable", bot.user.displayAvatarURL)
                
                message.channel.send({embed});
            }
            if (option.match("off")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 0
                };
                  fs.writeFile("./welcomeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription(`welcome has been set **off**.`)
                .setTimestamp()
                .setFooter("Welcome disable", bot.user.displayAvatarURL)
                
                message.channel.send({embed});
            }
}

exports.conf = {
   aliases: ['welcomeimg']
}

exports.help = {
  name: "welcomeimg",
  description: "Set the welcome image to the channel you select, make sure you set #channel first before set it `on`", 
  category: 'Moderation', 
  usage: 'welcome <#channel> [on/off]'
}