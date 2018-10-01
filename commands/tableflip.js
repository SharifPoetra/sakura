exports.run = async(client, message, args) => {
    message.channel.send({embed: { color: 0x42f44b, description: "(°-°)\\ ┬─┬"}}).then(m => {
        setTimeout(() => {
            m.edit({ embed: { color: 0xfca61b, description:"(╯°□°)╯    ]"}}).then(ms => {
                setTimeout(() => {
                    ms.edit({ embed: { color: 0xf91d1d, description: "(╯°□°)╯  ︵  ┻━┻"}})
                }, 1500)
            })
        }, 1500);

    });
}

exports.conf = {
   aliases: ['tf']
}
exports.help = {
  name: 'tableflip',
  category: 'Fun', 
  description: 'Flip a table', 
  usage: 'tableflip' 
} 