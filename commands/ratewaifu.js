const rates = [
  "1/10 :poop:", "2/10 :dizzy_face:", "3/10 :astonished:", "4/10 :grimacing:",
  "5/10 :ok_hand:",
  "6/10 :upside_down:", "7/10 :relieved:", "8/10 :blush:", "9/10 :heart_eyes:", "10/10 :clap:"
];

exports.run = (bot, message, args) => {
  if (!args[1]) {
    message.channel.send({ embed: { color: 0xff1919, description: "I can't rate *nobody* :confused:"}});
  }
  
  if (message.content.includes('427473949476126740')) {
    message.channel.send({ embed: { color: 0xf442bc, description: "I'd rate " + `<@427473949476126740>` + " a 11/10! :heart:"}});
  }
  
  if (message.content.includes('474723927688609797')) {
    message.channel.send({ embed: { color: 0xf442bc, description: "I'd rate myself a 11/10. Just like him! :revolving_hearts:"}});
  } else if (args[1]) {
    const waifus = rates[Math.floor(Math.random() * rates.length)];
    if (message.content.includes('427473949476126740') || message.content.includes('474723927688609797')) return;
    if (args[1] == message.author.id || args[1] == "me") {
      message.channel.send({ embed: { color: 0xf442bc, description: `Sure, lemme give you a ${waifus}.`}});
    } else {
      message.channel.send({ embed: { color: 0x1D82B6, description: `Sure **${message.author.username}**. I'll give ${message.content.substr(11)} a ${waifus}`}});
    }
  }
  delete require.cache[require.resolve('./ratewaifu.js')];
};

exports.conf = {
   aliases: ['rw', 'waifu']
}
exports.help = {
  name: 'ratewaifu', 
  category: 'Fun', 
  description: "Give your waifu random percent love", 
  usage: 'ratewaifu <@user>'
} 