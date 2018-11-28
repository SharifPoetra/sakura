const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args, color, prefix) => {
	if(message.author.id !== '475230849239875584') return;
	if(!args[1]) return;
  if(args[1] === 'music' || args[1] === 'm') {
  try {
    const results = await client.shard.broadcastEval('[this.shard.id, this.users.size, this.channels.size, this.guilds.size, this.ws.ping.toFixed(0), this.voiceConnections.size, (process.memoryUsage().rss / 1024 / 1024).toFixed(2)]');

  let embed = new MessageEmbed() 
  .setColor("RANDOM")
  .setThumbnail(client.user.displayAvatarURL) 
  .setTitle('Shards Information') 
  .setTimestamp() 
  .setFooter(`Request by: ${message.author.tag}`)
  for(const res of results){
	embed.addField(`#Shard [${res[0]} / ${client.shard.count}] ${client.shard.id === res[0] ? '📌' : ''}`,
		`
${res[1]} users
${res[2]} channels 
${res[3]} guilds
${res[5]} voice connected 
${res[4]} MS ping
${res[6]} MB memory used
		`, true);
  } 
  return message.channel.send(embed)
  
  } catch (e) {
    console.log(e) 
    message.channel.send(e.message);
  } 
 } 
} 
exports.conf = {
  aliases: ['si'], 
  cooldown: '5'
} 
exports.help = {
  name: 'shardinfo', 
  description: "Returns information about shards.", 
  usage: 'shardinfo' 
} 