const { RichEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
  const serverQueue = require('../index.js').queue.get(msg.guild.id);
 if(!serverQueue) return msg.channel.send({ embed: { color: 0x1D82B6, description:'There is nothing playing'}});
  const duration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
  const persentase = serverQueue.connection.dispatcher.time/duration;
  const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.time/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.time/60000)}` : Math.floor(serverQueue.connection.dispatcher.time/60000);
  const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.time%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.time%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.time%60000)/1000);
  const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
  const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
  
  const emb = new RichEmbed()
  .setColor('RANDOM')
  .setAuthor(serverQueue.songs[0].author.tag, serverQueue.songs[0].author.avatarURL)
  .setTitle(serverQueue.songs[0].title)
  .setURL(serverQueue.songs[0].url)
  .setThumbnail(serverQueue.songs[0].thumbnail)
  .setDescription(`▶ ${progressBar(persentase)} \`[${curentDurationMinute}:${currentDurationSeconds} - ${endDurationMinute}:${endDurationSeconds}]\`🔊`);
  
  return msg.channel.send('🎶 **Now playing...**', { embed: emb});
};

function progressBar(percent){
	let num = Math.floor(percent*12);
	if(num === 1){
		return '🔘▬▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 2){
		return '▬🔘▬▬▬▬▬▬▬▬▬▬';
	}else if(num === 3){
		return '▬▬🔘▬▬▬▬▬▬▬▬▬';
	}else if(num === 4){
		return '▬▬▬🔘▬▬▬▬▬▬▬▬';
	}else if(num === 5){
		return '▬▬▬▬🔘▬▬▬▬▬▬▬';
	}else if(num === 6){
		return '▬▬▬▬▬🔘▬▬▬▬▬▬';
	}else if(num === 7){
		return '▬▬▬▬▬▬🔘▬▬▬▬▬';
	}else if(num === 8){
		return '▬▬▬▬▬▬▬🔘▬▬▬▬';
	}else if(num === 9){
		return '▬▬▬▬▬▬▬▬🔘▬▬▬';
	}else if(num === 10){
		return '▬▬▬▬▬▬▬▬▬🔘▬▬';
	}else if(num === 11){
		return '▬▬▬▬▬▬▬▬▬▬🔘▬';
	}else if(num === 12){
		return '▬▬▬▬▬▬▬▬▬▬▬🔘';
	}else{
		return '🔘▬▬▬▬▬▬▬▬▬▬▬';
  } 
} 

exports.conf = {
   aliases: ['nowplay']
}

exports.help = {
  name: 'np' 
} 