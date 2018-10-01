const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args,ops) => {
  if(message.author.id !== '444454206800396309' && message.author.id !== '427473949476126740') return message.channel.send({ embed: { color: 0xed1809, description:"Sorry, Only my owner can use this!"}})

  try{
    delete require.cache[require.resolve(`./${args[1]}.js`)];

    return message.channel.send({ embed: { color: 0x09ed2b, description:`o ok command **${args[1]}** sudah di reload.`}})
     }catch(e){
     return message.channel.send({ embed: { color: 0xed1809, description:`Hmm gk bisa reload, command itu gk ada :(\n\`${e.message}\``}})
     }
}; 

exports.conf = {
   aliases: ['rel']
}

module.exports.help = {
name: "reload"
}