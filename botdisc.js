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
`Queue - `;

var allNameErrorMsg = 
`'all' cannot be a queue name.`;

var popAmtErrorMsg = 
`Please enter a value that is 2 or above for queue length.`;

var qPopMsg =
`The following queue has popped: `;
// -------------------------------------------------------------------

var Queues = [];

var usernameMap = {};

client.login(auth.token);

client.on('ready', () => {
    console.log('Connected');
    console.log('Logged in as: ' + client.user.tag);
    console.log('Ready!');
});

client.on('message', message => {
    // Bot listens for messages that will start with `!`
    if (message.content.substring(0, 1) == config.prefix) {
        let args = message.content.substring(1).split(' ');
        let cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            // !help
            case 'help':
                message.channel.send(helpMsg);
            break;

            // !create <popAmt> <queue name> -- create queue with amount of people, adds the user in
            // for now, queue name must have no spaces
            // Have to make it so there can't be multiple of the same name of queue
            case 'create':

                if (args.length != 2) {
                    message.channel.send(errorMsg);
                } else if (args[0] === "all") {
                    message.channel.send(allNameErrorMsg);
                } else if (args[1] <= 1) {
                    message.channel.send(popAmtErrorMsg);
                } else {
                    let newQueue = new Queue(args[1], args[0]);
                    newQueue.pushToQueue(message.author.id);
                    usernameMap[message.author.id] = message.author.username;
                    Queues.push(newQueue);
                    message.channel.send(createMsg + args[1]);
                }

            break;

            // !add <queue name> -- add to which queue?
            // can't be added twice to the same queue
            case 'add':
                
                if (args.length != 1) {
                    message.channel.send(errorMsg);
                } else {
                    for (let i = 0; i < Queues.length; ++i) {
                        if (args[0] === Queues[i].getQueueName()) {
                            Queues[i].pushToQueue(message.author.id);
                            usernameMap[message.author.id] = message.author.username;
                            message.channel.send(addMsg + args[0]);
                        }

                        if (Queues[i].isReadyPop()) {
                            let userArray = Queues[i].popQueue();
        
                            console.log(Queues[i].getQueueLength());
        
                            console.log(userArray[0]);
        
                            for (let j = 0; j < Queues[i].getPopAmt(); ++j) {
                                poppedMsg += ` <@${userArray[j]}>`;
                            }
        
                            message.channel.send(qPopMsg + args[0]);
                        }
                    }
                }

            break;

            // !leave <queue name> -- leave queue
            // !leave all -- leave all queues
            case 'leave':

                if (args.length != 1) {
                    message.channel.send(errorMsg);
                } else if (args[0] === "all") {

                    for (let i = 0; i < Queues.length; ++i) {
                        let result = Queues[i].findAndRemove(message.author.id);
                    }
                    message.channel.send(leaveAllMsg);

                } else {
                    for (let i = 0; i < Queues.length; ++i) {
                        if (Queues[i].getQueueName() === args[0]) {
                            let result = Queues[i].findAndRemove(message.author.id);
                            message.channel.send(leaveMsg + args[0]);
                        }
                    }
                }

            break;

            // !disp all vs name-- have to add arguments for name
            case 'disp':
                
                if (args.length != 1) {
                    message.channel.send(errorMsg);
                } else if (args[0] === "all") {
                    let dispQMsg = `
                    `;
                    for (let i = 0; i < Queues.length; ++i) {
                        dispQMsg += `${dispMsg} `
                        let fetchQueue = Queues[i].getQueue();
                        for (let i = 0; i < fetchQueue.length; ++i) {
                            if (fetchQueue[i] in usernameMap) {
                                //fetchedUsernames.push(usernameMap[fetchQueue[i]]);
                                dispQMsg += ` ${usernameMap[fetchQueue[i]]}`;
                            } else {
                                console.log("ERROR IN FETCHING USERNAME");
                            }
                            dispQMsg += 
                            `
                            `;
                        }
                    }
                    message.channel.send(dispQMsg);
                } else {
                    // Implement hash map for O(1) retrival of if it's actually a name
                    for (let i = 0; i < Queues.length; ++i) {
                        if (args[0] === Queues[i].getQueueName()) {
                            let dispQMsg = dispMsg + ` ${Queues[i].getQueueName()}`;
                            let fetchQueue = Queues[i].getQueue();
                            for (let i = 0; i < fetchQueue.length; ++i) {
                                if (fetchQueue[i] in usernameMap) {
                                    //fetchedUsernames.push(usernameMap[fetchQueue[i]]);
                                    dispQMsg += " " + usernameMap[fetchQueue[i]];
                                } else {
                                    console.log("ERROR IN FETCHING USERNAME");
                                }
                            }
                            message.channel.send(dispQMsg);
                        }
                    }
                }
            
                
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