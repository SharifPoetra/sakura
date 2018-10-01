const emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣'];
const { RichEmbed } = require('discord.js');

this.run = async (client, msg, args) => {
	const wait = require('util').promisify(setTimeout);
	try{
		let user = msg.mentions.users.first();
		if(!user) user = client.user;
		let thisMess = await msg.channel.send(`Loading...`);
		for(const emo of emojis){
			await thisMess.react(emo);
		}
		let table = [ new Array(7).fill('⚪'), new Array(7).fill('⚪'), new Array(7).fill('⚪'), new Array(7).fill('⚪'), new Array(7).fill('⚪'), new Array(7).fill('⚪') ];
		let sessions = 0;
		let win = undefined;
		let turn = true;
		while(sessions < 7*6 && !win){
			let userTurn = turn ? msg.author : user;
			const sign = turn ? '🔴' : '🔵';
			const winsign = turn ? '🅾' : '🇴';
			const embed = new RichEmbed()
			.setColor('RANDOM')
			.setDescription(table.map(x => x.join('')).join('\n')+`\n${emojis.join('')}`);
			await thisMess.edit(`${userTurn.toString()} turn (${sign})`, { embed });
			let emoji;
			if(userTurn.bot){
				await wait(1000);
				emoji = Math.floor(Math.random()*7)-1;
			}else{
				const filter = (rect, usr) => emojis.includes(rect.emoji.name) && usr.id === userTurn.id;
				const response = await thisMess.awaitReactions(filter, {
					max: 1,
					time: 30000
				});
				if(!response.size){
					await msg.channel.send(`${userTurn.toString()} time is up!`);
					turn = !turn;
					userTurn = turn ? msg.author : user;
					win = userTurn;
					break;
				}
				emoji = emojis.indexOf(response.first().emoji.name);
			}
			const moved = move(table, emoji, sign);
			if(!moved.bool) continue;
			table = moved.table;
			const winner = checkWin(table, sign, winsign);
			if(winner.bool){
				table = winner.table;
				win = userTurn;
			}
			turn = !turn;
			sessions++;
		}
		await thisMess.delete();
		const embed = new RichEmbed()
		.setColor('GREEN')
		.setDescription(table.map(x => x.join('')).join('\n'));
		if(!win) return msg.channel.send('DRAW', { embed: embed.setColor('RED') });
		return msg.channel.send(`${win.toString()} won!`, { embed });
	}catch(err){
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

function move (board, index, sign){
	let fin = {
		bool: false
	}
	for(let i = 5; i >= 0; i--){
		if(board[i][index] === '⚪'){
			board[i][index] = sign;
			fin.bool = true;
			fin.table = board;
			return fin;
		}
	}
	return fin;
}

function checkWin(table, sign, winsign){
	let fin = {
		bool: false
	}
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 4; j++) {
			const row = table[i];
			if (row[j] === sign && row[j + 1] === sign && row[j + 2] === sign && row[j + 3] === sign) {
				table[i][j] = winsign;
				table[i][j+1] = winsign;
				table[i][j+2] = winsign;
				table[i][j+3] = winsign;
				fin.bool = true;
				fin.table = table
				return fin;
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 7; j++) {
			if (table[i][j] === sign && table[i + 1][j] === sign && table[i + 2][j] === sign && table[i + 3][j] === sign) {
				table[i][j] = winsign;
				table[i+1][j] = winsign;
				table[i+2][j] = winsign;
				table[i+3][j] = winsign;
				fin.bool = true;
				fin.table = table
				return fin;
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			if (table[i][j] === sign && table[i + 1][j + 1] === sign && table[i + 2][j + 2] === sign && table[i + 3][j + 3] === sign) {
				table[i][j] = winsign;
				table[i+1][j+1] = winsign;
				table[i+2][j+2] = winsign;
				table[i+3][j+3] = winsign;
				fin.bool = true;
				fin.table = table
				return fin;
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 3; j < 7; j++) {
			if (table[i][j] === sign && table[i + 1][j - 1] === sign && table[i + 2][j - 2] === sign && table[i + 3][j - 3] === sign) {
				table[i][j] === winsign;
				table[i+1][j-1] === winsign;
				table[i+2][j-2] === winsign;
				table[i+3][j-3] === winsign;
				fin.bool = true;
				fin.table = table
				return fin;
			}
		}
	}
  return fin;
}

exports.conf = {
   aliases: ['c4']
}
exports.help = {
  name: 'connect4', 
  category: 'Games', 
  description: "Challenge other user to play connect4", 
  usage: 'connect4 [@user]'
} 