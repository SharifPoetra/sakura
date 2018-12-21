const snek = require('node-superfetch');

class Util {
	
	static timeParser(time) {
	    let days = Math.floor((time % 31536000) / 86400);
	    let hours = Math.floor(((time % 31536000) % 86400) / 3600);
	    let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
	    let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
	    days = days > 9  ? days : "0" + days
	    hours = hours > 9 ? hours : "0" + hours
	    minutes = minutes > 9 ? minutes : "0" + minutes
	    seconds = seconds > 9 ? seconds : "0" + seconds
	    return (parseInt(days) > 0 ? days + ":" : "") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + ":") + minutes + ":" + seconds
	}
	
  static shuffle (array){
    const arr = array.slice(0);
    for(let i = arr.length -1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  static async hastebin(text){
    const { body } = await snek.post('https://haste.bin/documents')
    .send(text);
    return `https://hasteb.in/${body.key}`;
  }
  static chunk (array, chunkSize){
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }
	static timeString(seconds, forceHours = false) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor(seconds % 3600 / 60);
                if(isNaN(seconds) === false) {
		return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
              } else {
               return `LIVE`
          } 
	}
	
  static parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `${days} day, ${hours} hours, ${minutes} minutes`;
    }
    else if (hours) {
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    else if (minutes) {
      return `${minutes} minutes, ${seconds} seconds`;
    }
    return `${seconds} seconds`;
  }
  static trimArray(array, length = 10){
    const len = array.length - length;
    const temp = array.slice(0, length);
    temp.push(`...${len} more.`);
    return temp;
  }
  static silhouette(ctx, x, y, width, height) {
		const data = ctx.getImageData(x, y, width, height);
		for (let i = 0; i < data.data.length; i += 4) {
			data.data[i] = 0;
			data.data[i + 1] = 0;
			data.data[i + 2] = 0;
		}
		ctx.putImageData(data, x, y);
		return ctx;
	}
  static decodeHtmlEntities (text){
    return text.replace(/&#(\d+);/g, (rep, code) => {
      return String.frrmCharCode(code)
    });
  }
  
}


module.exports = Util;
