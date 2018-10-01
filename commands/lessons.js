const { get } = require('node-superfetch');
const { shuffle } = require('../util.js');
const { RichEmbed } = require('discord.js');
const validChoice = ['A', 'B', 'C', 'D'];

exports.run = async (client, msg, args) => {
	let passes = 0;
	let answered = new Array(10).fill('❌');
	while(passes < 10){
		const question = await getQuestion();
		await msg.channel.send(`Question ${passes+1}`, { embed: getEmbed(question.description) });
		const filter = msgs => validChoice.includes(msgs.content.toUpperCase()) && msgs.author.id === msg.author.id;
		const response = await msg.channel.awaitMessages(filter, {
			max: 1,
			time: 15000
		});
		if(!response.size){
			await msg.reply('Sorry but time is up!');
			break;
		}
		const choice = validChoice.indexOf(response.first().content.toUpperCase())%question.answer.length;
		if(question.answer[choice] === question.right){
			answered[passes] = '✅';
			await msg.reply(getEmbed(`✅ Absolutely Right! it was ${decodeURIComponent(question.right)}`, 'GREEN'));
		} else {
			await msg.reply(getEmbed(`❌ Wrong! it was ${decodeURIComponent(question.right)}`, 'RED'));
		}
		passes++;
	}
	const embed = new RichEmbed()
	.setColor('RANDOM')
	.setDescription(answered.map((x, i) => `Question ${i+1} ${x}`))
	.setFooter(getReaction(answered, msg.author.tag), msg.author.avatarURL);
	return msg.channel.send(embed);
}

async function getQuestion () {
	let { body } = await get('https://opentdb.com/api.php')
	.query({
		amount: 1,
		encode: 'url3986'
	});
  body = body.results[0];
  let answer = body.incorrect_answers;
	answer.push(body.correct_answer);
	answer = shuffle(answer);
	return {
		answer,
		right: body.correct_answer,
		description: `
__**${decodeURIComponent(body.category)}**__
${decodeURIComponent(body.question)}

${answer.map((x,i) => `${validChoice[i]}. ${decodeURIComponent(x)}`).join('\n')}
		`
	}
}

function getEmbed (description, color = 'BLUE'){
	return new RichEmbed()
	.setColor(color.toUpperCase())
	.setDescription(description);
}

function getReaction(ans, at) {
	let val = 0;
	for(const an of ans){
		if(an === '✅') val += 10;	}
	if(val === 100) return `${val} 👏 Good Job ${at}`;
	if(val > 70) return `${val} 👍 Good! ${at}`;
	if(val < 70) return `${val} 😉 Not Bad ${at}`;
}

exports.conf = {
   aliases: ['trivia', 'quiz']
}

exports.help = {
  name: 'lessons', 
  category: 'Games', 
  description: "Lets test your brain for answer the random question", 
  usage: 'lessons'
} 