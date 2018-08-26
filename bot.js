var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Queue = require('./queue.js')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

// test queue
var queue1 = new Queue(1);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Bot listens for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !help
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Insert help message here'
                });
            break;
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // !add
            case 'add':
                bot.sendMessage({
                    to: channelID,
                    message: "You have been added to queue."
                })
            break;
            // !disp
            case 'disp':
                bot.sendMessage({
                    to: channelID,
                    message: "Here is the queue:"
                })
            break;
         }
     }
});