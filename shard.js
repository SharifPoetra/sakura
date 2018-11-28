const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./index.js', {
  totalShards: 3, 
  token: process.env.TOKEN, 
  respawn: true, 
});

Manager.on('shardCreate', shard => {
	console.log(`----- SHARD ${shard.id} LAUNCHED -----`);
	shard.on('death', () => console.log(`----- SHARD ${shard.id} DIED -----`))
		.on('ready', () => console.log(`----- SHARD ${shard.id} READY -----`))
		.on('disconnect', () => console.log(`----- SHARD ${shard.id} DISCONNECTED -----`))
		.on('reconnecting', () => console.log(`----- SHARD ${shard.id} RECONNECTING -----`));
});

Manager.spawn(this.totalShard, 5000, true);

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));
