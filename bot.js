var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var Queue = require('./queue.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var errorMsg = 
`That is not a valid command. Type !help for help`

var helpMsg = 
`Help Menu

!help -- bring up help menu

!create <amount of people> <queue name> -- create a queue that will notify all users
in the queue reaches the amount of people required

!add <queue name> -- add yourself to a queue
// will eventually add ability to set timer (options with up to x o clock or within x min)

!disp all -- display all available queues

!disp <queue name> -- display the named queue

!leave all -- leave all queues

!leave <queue name> -- leave the named queue`;

var createMsg =
`You have created the following queue: `;

var addMsg =
`You have been added to the following queue: `;

var leaveMsg = 
`You have left the following queue: `;

var leaveAllMsg = 
`You have left all queues.`;

var dispMsg = 
`Queue Display: `;

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

// test queue
//var queue1 = new Queue(1);

var Queues = [];

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

        logger.info('args: ' + args);
       
        args = args.splice(1);

        logger.info('args after splice: ' + args);


        switch(cmd) {
            // !help
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: helpMsg
                });
            break;

            case '5q':
                bot.sendMessage({
                    to: channelID,
                    message: "@Emos#9670"
                });
            
            //var queue5qTest = new Queue("5q", 5);
                //if Queue

            break;

            // !create <popAmt> <queue name> -- create queue with amount of people
            case 'create':

                if (args.length < 2) {
                    bot.sendMessage({
                        to: channelID,
                        message: errorMsg
                    });
                }

                // can't allow "all" to be a queue name
                // queue name needs to be one word

                bot.sendMessage({
                    to: channelID,
                    message: createMsg
                })

            break;

            // !add <queue name> -- add to which queue?
            case 'add':
                bot.sendMessage({
                    to: channelID,
                    message: addMsg
                })
            break;

            // !leave <queue name> -- leave queue
            case 'leave':

                bot.sendMessage({
                    to: channelID,
                    message: leaveAllMsg
                })
            
                bot.sendMessage({
                    to: channelID,
                    message: leaveMsg
                })
            break;

            // !disp all vs name-- have to add arguments for name
            case 'disp':
             bot.sendMessage({
                 to: channelID,
                 message: dispMsg
             })
            break;

            case '.dev.exit.':
                process.exit(-1);
            break;

            default: 
                bot.sendMessage({
                    to: channelID,
                    message: errorMsg
                })
            break;
         }
     }
});