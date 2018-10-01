const { RichEmbed, Collection } = require("discord.js");

exports.run = async (bot, message, args, prefix) => {
  
const cooldown = new Collection();
let cdseconds = 5;

  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.").then(m => m.delete(5000));
  }
    cooldown.set(message.author.id);
  
  
if(!args[2]) return message.channel.send({ embed: { color: 0xf91d1d, description: `**${message.author.username}**, Please Ask The Many Questions\n**Example:** \`${prefix}8ball your owner always online?\``}});

let replies = ["It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "Maybe?", "no", "Very Likely", "Probably No", "😇Only Good Knows.", "🙄hmmm...", "😆, What is your question?", "🤔Don\'t see what happening!"];

let postMsg = await message.channel.send('***Please Wait...***');

let result = Math.floor((Math.random() * replies.length));

let questions = args.slice(1).join(" ");

let ballembed = new RichEmbed() 
.setAuthor(message.author.tag) 
.setColor('RANDOM') 
.addField("❓Question", questions)
.addField("📝Answer", replies[result])
.setFooter(`Request by: ${message.author.tag}`);
  
setTimeout(() => {
postMsg.edit(ballembed)
}, 1500);
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
} 

exports.conf = {
   aliases: ['8b', 'ask']
}
module.exports.help = { 
 name: "8ball", 
 description: "ask shometing and bot will answer it", 
 category: 'Fun', 
  usage: '8ball <question>' 
} 