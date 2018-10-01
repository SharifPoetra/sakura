const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./index.js', {
  totalShards: 1, 
  shardArgs: ['--ansi', '--color', '--trace-warnings'],
  token: process.env.SECRET
});

Manager.spawn(this.totalShard, 10000, true);
Manager.on('launch', shard => {
    console.log(`💎 Launch Shard ${shard.id} [${shard.id + 1}/${Manager.totalShards}]`);
});

Manager.on('message', (shard, message) => {
    console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

require('./server.js');

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));