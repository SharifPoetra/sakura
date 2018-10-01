const { exec } = require('child_process');

exports.run = (client, msg, args) => {
  if(msg.author.id !== '427473949476126740' && msg.author.id !== '444454206800396309') return;
  try{
    exec(args.slice(1).join(' '), (stderr, stdout) => {
      if(!stderr){
        msg.channel.send(stdout, {code: 'bash'});
      }else{
        msg.channel.send({ embed: { description: `\`ERROR\`\n\`\`\`\n${stderr}\`\`\``}});
      }
    });
  }catch(e){
    return msg.channel.send({ embed: { description: `\`ERROR\`\n\`\`\`\n${e.message}\`\`\``}});
  }
}

exports.conf = {
   aliases: ['$']
}

exports.help = {
  name: 'exec' 
} 
/*
i like this command
sharif: gk bikin pemrs? owner? - gw bikin yak
OwO#8287: ok :v
dihhhh dah di bikin duluan
*/