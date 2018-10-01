const Discord = require('discord.js');

exports.run = async (client, msg, args, prefix) => {
  try {
  if (!args[1]) return msg.channel.send(`Hye ${msg.author.username}, You can see full commands list at: https://sakura-bots.glitch.me Or you can use \`${prefix}help here\` and i will send commands list here!`)
  } catch (e) { 
    console.error(e)
    msg.reply(`Something went wrong :( \`${e.message}\` try again later.`)
  }
  if(args[1] && client.commands.includes(`${args[1].toLowerCase()}.js`)) return getHelp(msg, args[1].toLowerCase());
 if(args[1] === 'here') {
  let bicon = client.user.displayAvatarURL;
  let version = require('../package.json').version
  let postMsg = await msg.channel.send('***Please Wait...***');
  let embed = new Discord.RichEmbed() 
  .setColor('RANDOM') 
  .setAuthor(`${client.user.username} Command List`, bicon)
  .setDescription(`We need your help to keep ${client.user.username} online by [Donate Here](https://www.paypal.me/poetrakencana), Want a more described how to use ${client.user.username}? join [Support Server Here](https://discord.gg/BTckadf).`)
  .addField('**♬ Music**', '\`search\` \`play\` \`loop\` \`lyrics\` \`pause\` \`resume\` \`shuffle\` \`skip\` \`stop\` \`np\` \`queue\`')
  .addField('**ヅ Fun**', '\`tableflip\` \`owoify\` \`clapify\` \`ship\` \`f\` \`beautiful\` \`triggered\` \`neko\` \`8ball\` \`say\` \`ratewaifu\`')
  .addField('**♯ Games**', '\`dice\` \`connect4\` \`lessons\` \`tictactoe\` \`hungergame\`')
  .addField('**☞ Utility**', '\`changelog\` \`avatar\` \`ping\` \`stats\` \`help\` \`dbl\` \`discrim\`')
  .addField('**✎ Moderation**', '\`prefix\` \`welcome\`')
  .addField('**♡ Support**', '\`donate\` \`invite\` \`vote\` \`bugreport\`')
  .addField('**✃ Owner Only**', '\`reload\` \`eval\` \`exec\` \`reboot\`')
 // .addField('\u200B', '\u200B')
  .setFooter(`Request by ${msg.author.tag} | v${version}`);
  
  setTimeout(() => {
        postMsg.edit(embed)
        }, 1000);
} 
} 

function getHelp (msg, cmd){
  const file = require(`./${cmd}`);
  let aliases = 'No aliases';
  let description = 'No description';
  let category = 'No category';
  let usage = 'No usage';
  if(file.conf && file.conf.aliases) aliases = file.conf.aliases instanceof Array ? file.conf.aliases.join(', ') : file.conf.aliases;
  if(file.help){
    const { help } = file;
    if(help.description) description = help.description;
    if(help.category) category = help.category;
    if(help.usage) usage = help.usage;
  }
  const { RichEmbed } = Discord;
  const embed = new RichEmbed()
  .setColor('DARK_BUT_NOT_BLACK')
  .setDescription(description || 'No description', true) 
  .addField('Category', category || 'no category', true)
  .addField('Aliases', aliases || 'No aliases', true)
  .addField('Usage', usage || 'No usage', true) 
  return msg.channel.send(embed);
}

exports.conf = {
   aliases: ['cmdlist', 'h', 'cmds', 'commands']
}

exports.help = {
  name: 'help', 
  category: 'Utility', 
  description: 'To see all command list', 
  usage: 'help [command]' 
} 