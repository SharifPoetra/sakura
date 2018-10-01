const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, color) => {

if(!message.author.id !== '444454206800396309') return;
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Sorry you can't do that!").then(msg => msg.delete(3000));
	if (!args[1]) return message.channel.send(`Please input new prefix`).then(msg => msg.delete(3000));
	let prefix = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	prefix[message.guild.id] = {
		prefix: args[1]
	};

	fs.writeFile("./prefixes.json", JSON.stringify(prefix, null, 2), (err) => {
		if (err) console.log(err);
	});

	    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`My new prefix in ${message.guild.name} set to **\`${args[1]}\`**`);

    message.channel.send(embed);

  console.log(args[1])
}
exports.conf = {
 aliases: ['prefix'] 
}
exports.help = {
 name: 'setprefix', 
 description: 'set the bot prefix to anything you want', 
 usage: 'setprefix <New Prefix>' 
} 
