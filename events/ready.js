exports.run = async client => {
  console.log(`${client.user.tag} is Online`);
  client.setInterval(() => {
    client.pings.unshift(Math.floor(client.ping));
  }, 1);
};
