const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix) => {
    if (message.author.id !== '475230849239875584' && message.author.id !== '427473949476126740' && message.author.id !== '290159952784392202') return;
    try {
        let codein = args.slice(1).join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setAuthor('Evaluate')
        .setColor(color)
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

exports.help = {
    name: 'eval',
    aliases: [], 
    description: 'only my onwer can use this command',
    usage: '{prefix}eval [some javascript code]'
}