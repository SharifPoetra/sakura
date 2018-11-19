require('dotenv').config() 
const { Discord, Client, Util, MessageEmbed, Collection } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const fs = require('fs')
const path = require('path');
const snek = require('node-superfetch');

const client = new Client({
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true,
  fetchAllMembers: false
});

client.pings = new Array(96).fill(0);
client.util = require('./util.js');
client.commands = fs.readdirSync('./commands');
client.aliases = {};

// discordbotlist.com POST. 
const Botlister = require('botlister');
const lister = new Botlister({ apiToken: process.env.BOTLIST, defaultBotId: '500893309514940432' })

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const queue = new Collection();
client.queue = queue;

// event handler 
fs.readdir("./events/", (err, files) => {
if (err) console.log(err);
files.forEach(file => {
let eventFunc = require(`./events/${file}`);
let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunc.run(client, ...args));
	});
});

for(const cmd of client.commands){
const file = require(`./commands/${cmd}`);
if(!file.conf || !file.conf.aliases) continue;
if(file.conf.aliases instanceof Array){
for(const al of file.conf.aliases){
client.aliases[al] = cmd;
    }
  }else{
client.aliases[file.conf.aliases] = cmd;
  }
}

client.on('warn', console.warn);

client.on('error', error => console.log(error));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line

var DEFAULTPREFIX = 's!' 

var { body } = await snek
.get('https://haruno-sakura.glitch.me/api/server/prefix') 

if (!body[msg.guild.id]) {
 body[msg.guild.id] = {
 prefix: DEFAULTPREFIX
 };
} 

  var prefix = body[msg.guild.id].prefix
 
  exports.prefix = prefix;
  
    if (!msg.guild) return;

	if (msg.author.bot) return undefined;
  
	if (!prefix || !msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.slice(prefix.length).split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	msg.member.voiceChannel === msg.member.voice;

	let command = msg.content.slice(prefix.length).split(' ')[0];
	command = command.toLowerCase();
  
    try {
      if(client.aliases[command]){
				delete require.cache[require.resolve(`./commands/${client.aliases[command]}`)];
        require(`./commands/${client.aliases[command]}`).run(client, msg, args, prefix);

      }else{

    delete require.cache[require.resolve(`./commands/${command}.js`)];

		let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, prefix);

      }

  } catch (e) {
    console.log(e.stack)                                                                  
  } finally {
   console.log(`${msg.author.tag} used ${command} in shard ${client.shard.id} and guild ${msg.guild.name} (${msg.guild.id})`)
  }

});

exports.handleVideo = handleVideo;
exports.queue = queue;
exports.youtube = youtube;

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = client.queue.get(msg.guild.id);
	//console.log(video)
	const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`, 
    durationmm: video.durationSeconds ? video.durationSeconds : video.duration / 1000,
    channel: msg.member.voice.channel.name,
    uploadedby: video.channel.title, 
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    author: msg.author,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds, 
    duration: video.duration,
};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
            loop: false, 
		};
		client.queue.set(msg.guild.id, queueConstruct);
        let m = await queueConstruct.textChannel.send('<a:blob:512503400575926272>  | Music servers are expensive! But you can help out: https://paypal.me/poetrakencana');
        setTimeout(() => { m.delete() }, 40000); 
		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			connection.sendVoiceStateUpdate({self_deaf:true});
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0])
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			client.queue.delete(msg.guild.id);
			return msg.channel.send({ embed: { color: 0xf91d1d, description: `I could not join the voice channel: ${error}`}});
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs) 
		if (playlist) return undefined;
  
var adedembed = new MessageEmbed() 

  .setColor('RANDOM')
  .setAuthor(`✅ Added to Queue:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setTitle(`${song.title}`, song.url)
  .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
  .addField('<:YouTubeicon:501663319128670209> Uploaded by:', `[${song.uploadedby}](${song.channelurl})`, true)
  .setFooter(`Request by: ${song.author.tag}`)
  .setTimestamp();
		
 return msg.channel.send(adedembed);
	}
	return undefined;
}

function play(guild, song, msg) {
	const serverQueue = client.queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		client.queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs) 

	const dispatcher = serverQueue.connection.play(ytdl(song.url, { quality: 'highestaudio' }))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			const shifed = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(shifed);
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

var pleyembed = new MessageEmbed() 

  .setColor('RANDOM')
  .setAuthor(`🎶 Start Playing:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setTitle(`${song.title}`, song.url)
  .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
  .addField('<:YouTubeicon:501663319128670209> Uploaded by:', `[${song.uploadedby}](${song.channelurl})`, true)
  .setFooter("If you can't hear the music, please reconnect. If you still can't hear maybe the bot is restarting!")
  .setTimestamp();

	serverQueue.textChannel.send(pleyembed);

}

client.login(process.env.TOKEN);
