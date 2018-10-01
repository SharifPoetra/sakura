
const { Discord, Client, Util, RichEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const fs = require('fs')
const { Canvas } = require('canvas-constructor');
const db = require('quick.db');
const path = require('path');
const Botlister = require('botlister');

const client = new Client({
  disableEveryone: true, 
  fetchAllMembers: true 
});

client.pings = new Array(96).fill(0);
client.util = require('./util.js');
client.queue = this.queue;
client.commands = fs.readdirSync('./commands');
client.aliases = {};

// DBL post
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);

// bots.discord.pw POST in ready events 

// discordbotlist.com POST, sisanya di event ready
const lister = new Botlister({ apiToken: process.env.BOTLIST, defaultBotId: '474723927688609797' })

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const queue = new Map();
let cooldown = new Set();
let cdseconds = 5;

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

dbl.on('posted', () => {
  console.log('Server count DBL posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on('warn', console.warn);

client.on('error', error => console.log(error));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
  
 /* //logging Dm to owner
  if (msg.channel.type === "dm") {
                let embed = new RichEmbed()
                    .setTimestamp()
                    .setTitle("Direct Message To The Bot")
                    .addField(`Sent By:`, `<@${msg.author.id}> | ${msg.author.tag}`)
                    .setColor("RANDOM")
                    .setThumbnail(msg.author.displayAvatarURL)
                    .addField(`Message:`, `${msg.content}`)
                    .setFooter(`DM Bot Messages | DM Logs`)
              client.users.get("444454206800396309").send(embed)
            }*/
  
  //prefix 
  const prefixes = ['s!'];
  let prefix = undefined;
  for(const pred of prefixes){
    if(msg.content.startsWith(pred)) prefix = pred;
  }
  let fetchedPrefix = await db.fetch(`serverPrefix_${msg.guild.id}`);
  if (fetchedPrefix === null) fetchedPrefix = prefix;
  else prefix = fetchedPrefix;
  exports.prefix = prefix;
  
  if (!msg.guild) return;

	if (msg.author.bot) return undefined;
  
	if (!prefix || !msg.content.startsWith(prefix)) return undefined;

  if(cooldown.has(msg.author.id)){
    msg.delete();
    return msg.reply("You have to wait 5 seconds between commands.").then(m => m.delete(5000));
  }

	const args = msg.content.slice(prefix.length).split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.slice(prefix.length).split(' ')[0];
	command = command.toLowerCase();
  
    try {
      if(client.aliases[command]){
        delete require.cache[require.resolve(`./commands/${client.aliases[command]}`)];
        require(`./commands/${client.aliases[command]}`).run(client, msg, args, prefix);
        cooldown.add(msg.author.id);
      }else{

    delete require.cache[require.resolve(`./commands/${command}.js`)];

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, prefix);
      cooldown.add(msg.author.id);
      }

  } catch (e) {
    console.log(e.message)                                                                  
    //client.channels.get('477282824983019530').send(`***ERROR***\n\`\`\`ini\n${e.stack}\`\`\``)
  } finally {
   console.log(`${msg.author.tag} used ${command} in shard ${client.shard.id} and guild ${msg.guild.name} (${msg.guild.id})`)
    //client.channels.get('477282824983019530').send(`Name: ${msg.author.tag}\nID: ${msg.author.id}\n*Used Cmd:* **${command}**\nGuildName: **${msg.guild.name}**\nGuildID: **${msg.guild.id}**\n*Shard:* **[${client.shard.id}/${client.shard.count}]**`);
  }
  
  setTimeout(() => {
    cooldown.delete(msg.author.id)
  }, cdseconds * 1000)
  
});

exports.handleVideo = handleVideo;
exports.queue = queue;
exports.youtube = youtube;

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	//console.log(video)
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`, 
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,   
    channel: msg.member.voiceChannel.id, 
    author: msg.author,
	
    author: msg.author};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
      loop: false
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send({ embed: { description: `I could not join the voice channel: ${error}`}});
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs) 
		if (playlist) return undefined;
  
var adedembed = new RichEmbed() 

  .setColor('RANDOM')
  .setAuthor(`Added to Queue`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `__[${song.title}](${song.url})__`, true)
  .addField('Video ID', `${song.id}`, true)
  .addField("Duration", `${song.durationh}hr ${song.durationm}min ${song.durations}sec`, true)
  .addField('Requested by', `${song.author}`)
  .setTimestamp();
		
 return msg.channel.send(adedembed);
	}
	return undefined;
}

function play(guild, song, msg) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs) 

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			const shifed = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(shifed);
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
var pleyembed = new RichEmbed() 

  .setColor('RANDOM')
  .setAuthor(`Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `__[${song.title}](${song.url})__`, true)
  .addField('Video ID', `${song.id}`, true)
  .addField("Volume", `${serverQueue.volume}%`, true)
  .addField("Duration", `${song.durationh}hr ${song.durationm}min ${song.durations}sec`, true)
  .addField('Playing At', `**<#${song.channel}>**`)
  .addField('Requested by', `${song.author}`)
  .setFooter("If you can't hear the music, please reconnect. If you still can't hear maybe the bot is restarting!")
  .setTimestamp();

	serverQueue.textChannel.send(pleyembed);

}

client.login(process.env.SECRET);