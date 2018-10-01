const db = require('quick.db');

exports.run = async (client, message, args, prefix) => {
  
  if(!args[1]) return message.channel.send({ embed: { color: 0xcb11ff, description: `The current prefix is **\`${prefix}\`** to set the server prefix use **\`${prefix}prefix <prefix>\`**`}});
  
  if(!message.member.hasPermission('MANAGE_GUILD') && message.author.id !== '444454206800396309') return message.channel.send({ embed: { color: 0xff1111, description: 'Sorry but you don\'t have the Manage Server permission to set the server prefix'}});
  
  db.set(`serverPrefix_${message.guild.id}`, args.slice(1).join(' ')).then(serverPrefix => {
  message.channel.send({ embed: { color: 0x31ff11, description: `Prefix has been set to \`${serverPrefix}\``}});
  })
} 

exports.conf = {
   aliases: []
}

exports.help = {
  name: 'prefix', 
  description: 'Set bot prefix in your server',
  category: 'Moderation', 
  usage: 'prefix <new prefix>'
} 