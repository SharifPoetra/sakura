const Discord = require('discord.js');
const request = require('request');

exports.run = async(client, message, args, prefix) => {
  
  if (!args[1] || !args[2]) return message.channel.send({ embed: {
    color: 0x1D82B6, 
    description: `
***Correct usage is:***
\`${prefix}dbl info <@mention-bot>\` To get full info about the bot on DBL.
\`${prefix}dbl widget <@mention-bot>\` To get the bot widget.
\`${prefix}dbl owner <@mention-bot>\` To get the small widget with bot owner. 
\`${prefix}dbl status <@mention-bot>\` To get the small widget with bot status. 
\`${prefix}dbl upvotes <@mention-bot>\` To get the small widget with bot total upvotes. 
\`${prefix}dbl servers <@mention-bot\` To get the small widget with bot total servers. 
\`${prefix}dbl lib <@mention-bot>\` To get the small widget with bot libraries. 

**Note:** ***Please make sure the bot you mention is available on [Discord Bot List](https://discordbots.org)***
`
  }});
  
  let user = message.mentions.users.first() || client.users.get(args[2]);
  
  if (args[1] == 'info') {
    if (user) user = request.get(`https://discordbots.org/api/bots/${user.id}`, function (err, ress, body) {
      if (err) return console.error
			body = JSON.parse(body)
      let avac = client.user.displayAvatarURL;
      let ava = `https://cdn.discordapp.com/avatars/${body.clientid}/${body.avatar}.png`;
      let dblembed = new Discord.RichEmbed() 
      .setColor('RANDOM')
      .setThumbnail(avac)
      .setAuthor(`DBL stats for ${body.username}#${body.discriminator}`, ava)
      .setDescription(`
\`\`\`${body.shortdesc}\`\`\`

**Monthly Votes:** ${body.monthlyPoints}
**Total Votes:** ${body.points}
**Lib:** ${body.lib}
**Prefix:** ${body.prefix}
**Tags:** ${body.tags}
**Certified?** ${body.certifiedBot ? `${body.certifiedBot}` : '\`Nope, i dont think so...\`'}
**Posted Guild Count:** ${body.server_count ? `${body.server_count}` : 'None'}
**Posted Shard Count:** ${body.shard_count ? `${body.shard_count}` : 'None'}

 [DBL Page](https://discordbots.org/bot/${body.clientid}) | [Invite](${body.invite}) | ${ !body.support ? 'No Support server' : `[Support Server](https://discord.gg/${body.support})` } | ${ !body.github ? 'No Github repository' : `[Github Repository](${body.github})` } | ${ !body.website ? 'No Website' : `[Website](${body.website})` }

`)
    message.channel.send(dblembed);
  }
 )
}
  
  if (args[1] == 'widget') {
    if (user) user = `https://discordbots.org/api/widget/${user.id}.png?topcolor=1d63e5&highlightcolor=1d63e5&labelcolor=ffffff&datacolor=ffffff`;
    
    let wEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM')
    .setTitle('widget.png')
    .attachFile({attachment: user, name: `widget.png`})
    .setImage('attachment://widget.png')
    message.channel.send(wEmbed);
    
  };
  
  if (args[1] == 'owner') {
    if (user) user = `https://discordbots.org/api/widget/owner/${user.id}.png?lefttextcolor=ffffff&righttextcolor=ffffff`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM') 
    .setTitle('owner.png')
    .attachFile({attachment: user, name: `owner.png`})
    .setImage('attachment://owner.png') 
    message.channel.send(oEmbed);
    
  };
  
  if (args[1] == 'status') {
    if (user) user = `https://discordbots.org/api/widget/status/${user.id}.png?lefttextcolor=ffffff&righttextcolor=ffffff`;
    
    let sEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM') 
    .setTitle('status.png')
    .attachFile({attachment: user, name: `status.png`})
    .setImage('attachment://status.png') 
    message.channel.send(sEmbed);
    
  };
  
  if (args[1] == 'upvotes') {
    if (user) user = `https://discordbots.org/api/widget/upvotes/${user.id}.png?lefttextcolor=ffffff&righttextcolor=ffffff`;
    
    let uEmbed = new Discord.RichEmbed()
    .setColor('RANDOM') 
    .setTitle('upvotes.png') 
    .attachFile({attachment: user, name: `upvotes.png`})
    .setImage('attachment://upvotes.png') 
    message.channel.send(uEmbed);
    
  };
  
  if (args[1] == 'servers') {
    if (user) user = `https://discordbots.org/api/widget/servers/${user.id}.png?lefttextcolor=ffffff&righttextcolor=ffffff`;
    
    let sEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM')
    .setTitle('servers.png')
    .attachFile({attachment: user, name: `servers.png`})
    .setImage('attachment://servers.png')
    message.channel.send(sEmbed);
    
  };
  
  if (args[1] == 'lib') {
    if (user) user = `https://discordbots.org/api/widget/lib/${user.id}.png?lefttextcolor=ffffff&righttextcolor=ffffff`;
    
    let lEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM') 
    .setTitle('lib.png')
    .attachFile({attachment: user, name: `lib.png`})
    .setImage('attachment://lib.png') 
    message.channel.send(lEmbed);
    
  };
  
} 

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'dbl' 
} 