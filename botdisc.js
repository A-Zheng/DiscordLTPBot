const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');
var config = require('./config.json');
var Queue = require('./queue.js');

// Messages ----------------------------------------------------------
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
// -------------------------------------------------------------------

var Queues = [];
var fiveQ = new Queue("5q", 5);

client.login(auth.token);

client.on('ready', () => {
    console.log('Connected');
    console.log('Logged in as: ' + client.user.tag);
    console.log('Ready!');
});

client.on('message', message => {
    // Bot listens for messages that will start with `!`
    if (message.content.substring(0, 1) == config.prefix) {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            // !help
            case 'help':
                message.channel.send(helpMsg);
            break;

            case '5q':
            
                fiveQ.pushToQueue(message.author.id);

                console.log(message.author.id);

                if (fiveQ.isReadyPop()) {
                    var userArray = fiveQ.popQueue();
                    var poppedMsg = "Queue for x has popped:" ;

                    console.log(fiveQ.getQueueLength());

                    console.log(userArray[0]);

                    for (i = 0; i < fiveQ.getPopAmt(); ++i) {
                        poppedMsg += ` <@${userArray[i]}>`;
                    }

                    message.channel.send(poppedMsg);
                }
                
            break;

            // !create <popAmt> <queue name> -- create queue with amount of people
            case 'create':

                if (args.length < 2) {
                    message.channel.send(errorMsg);
                }

                // can't allow "all" to be a queue name
                // queue name needs to be one word

                message.channel.send(createMsg);

            break;

            // !add <queue name> -- add to which queue?
            // can't be added twice to the same queue
            case 'add':
                message.channel.send(addMsg);
            break;

            // !leave <queue name> -- leave queue
            case 'leave':

                message.channel.send(leaveAllMsg);
            
                message.channel.send(leaveMsg);

            break;

            // !disp all vs name-- have to add arguments for name
            case 'disp':
                message.channel.send(dispMsg);
                // get names
            break;

            case '.dev.exit.':
                process.exit(-1);
            break;

            default: 
                message.channel.send(errorMsg);
            break;
         }
     }
    
});