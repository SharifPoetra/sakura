const { MessageEmbed } = require("discord.js");
const { post } = require('node-superfetch');

exports.run = async (client, message, args, color) => {
  var bot = client;
  var msg = message;
  
if (message.author.id !== '475230849239875584' && message.author.id !== '427473949476126740' && message.author.id !== '290159952784392202') return;

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .addField('Input', '```js\n' + args.slice(1).join(" ") + '```')

    try {
      const code = args.slice(1).join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'My Token';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await post('https://hasteb.in/documents').send(output);
          embed.addField('Output', `https://hasteb.in/${body.key}.js`);
      } else {
          embed.addField('Output', '```js\n' + output + '```');
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://hasteb.in/documents').send(error);
          embed.addField('Error', `https://hasteb.in/${body.key}.js`);
      } else {
          embed.addField('Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.conf = {
  aliases: []
} 
