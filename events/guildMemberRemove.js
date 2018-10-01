const Discord = require('discord.js');
const { Canvas } = require('canvas-constructor');
const fs = require('fs');
const superagent = require('node-superfetch');

exports.run = async (client, member) => {  
            async function createCanvas() {
              var imageUrlRegex = /\?size=2048$/g; 
              var namam = member.user.username;
              var jadim = namam.length > 12 ? namam.substring(0,10) + '...' : namam;
              var {body: background} = await superagent.get("https://cdn.discordapp.com/attachments/452827786063642646/483859056725852160/Haruno.Sakura.full.936129.jpg");
              var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));


            return new Canvas(850, 470)
              .addRect(0, 0, 850, 470)
              .save()
              .addBeveledImage(background, 0,0,850,470)
              .setColor('#FFFFFF')              
              .addCircle(243, 239, 140)
              .setColor('#FFFFFF')              
              //.setTextFont('bold 20px Arial')
              .setTextAlign('center')
              .setTextFont('35px Courier New')
              .setColor('#1b1818') 
              .addText("GOODBYE", 235, 410)
              .addText(`${jadim}#${member.user.discriminator}`, 235, 445)
              .restore()
              .addRoundImage(avatar, 115, 110, 256, 256, 128)              
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     checker: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].channel}`);
    if (!channel) return;
  
        const gumen = `Goodbye **${member.user.tag}**, see you next time!`
        ; channel.send( gumen, {file: new Discord.Attachment(await createCanvas(), 'goodbye.png')});
            //channel.send(`Welcome to ${member.guild.name}, ${member}. You're the \`${member.guild.memberCount}\` member!`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
};