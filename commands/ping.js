const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(args[1] === '-ws') return message.channel.send(client.pings.map(x => `\`${x}ms\``).splice(0, 96).join(', '));
  const embed = new Discord.RichEmbed().setColor("#36393e").setDescription("**Pinging...**");
  message.channel.send({
    embed
  }).then(m => {
    let time = m.createdTimestamp - message.createdTimestamp;
    const answers = [
      `:ping_pong: | Well done **${message.author.username}**-kun. You just wasted \`${time}ms\` of my time!`,
      `:ping_pong: | _angry pinging noises_ \`${time}ms\``,
      `:ping_pong: | B-b-baka! It\'s \`${time}ms\`.\nHappy now?!`,
      `:ping_pong: | You\'ve made me \`${time}ms\` older by just asking.`,
      `:ping_pong: | \`${time}ms\` to read & edit this message!`
    ]; 
    let ping = answers[Math.floor(Math.random() * answers.length)];
    embed.setDescription(ping);
    m.edit({
      embed
    });
  });
}

exports.conf = {
   aliases: ['pong']
}

exports.help = {
  name: 'ping'
} 