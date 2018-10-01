function clapify (client,msg,args) {
	args = args.slice(1).join(' ') || 'Im trying to clap something spook';
	let clapped = '👏';
	for(let i = 0; i < args.length; i++){
		if(args[i] === ' '){
			clapped += '👏';
		} else {
			clapped += i%2 === 0 ? args[i].toLowerCase() : args[i].toUpperCase();
		}
	}
  clapped += '👏';
	return msg.channel.send(clapped);
}

this.run = clapify;

exports.conf = {
  aliases: ['clap']
}

exports.help = {
  name: 'clapify', 
  category: 'Fun', 
  description: 'Response with what you say but with clap emote', 
  usage: 'clapify <text>' 
} 