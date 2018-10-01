exports.run = async(client, message, args, prefix) => {
  
  let text = args.slice(1).join(' ');
  if (!text) return message.channel.send({ embed: { 
    color: 0xff1919, 
    description: `${message.author}, What can i say?\nExample: **\`${prefix}say Halo world\`**`
  }});
  message.delete();
  message.channel.send(text);
} 

exports.conf = {
  aliases: [] 
} 

exports.help = {
  name: 'say', 
  category: 'Fun', 
  description: 'Bot will send back what you say', 
  usage: 'say <text>' 
} 