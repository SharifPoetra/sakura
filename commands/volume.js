const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN);

exports.run = async(client, msg, args) => {
  dbl.hasVoted(msg.author.id).then(voted => {
    if (!voted) return msg.channel.send({ embed: { description: `You must vote first before using this feature [Click Here](https://discordbots.org/bot/474723927688609797/vote), Then wait for 1 minute until your vote is processed!`}});
    if (voted) {
    const serverQueue = require('../index.js').queue.get(msg.guild.id);
if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You are not in a voice channel!'}});
   // if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to change the current volume`}});	
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
    var botRoleColorSync = msg.guild.member(client.user).highestRole.color;
		if (!args[1]) return msg.channel.send({embed: { color: 0x32ffe7,  description: `The current volume is: **${serverQueue.volume}**%`}});
		serverQueue.volume = args[1];
    if (args[1] > 100) return msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%, please do not hurt yourself!`}});
    serverQueue.volume = args[1];
    if (args[1] > 100) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) +
    msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%, please do not hurt yourself!`}});
 
    if (args[1] < 101) return serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) + msg.channel.send({ embed: { description: `I set the volume to: __**${args[1]}**%__`}});
    
  }
  })
}

exports.conf = {
   aliases: ['v']
}


  exports.help = {
    name: 'volume' 
  } 