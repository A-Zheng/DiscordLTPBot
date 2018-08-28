# DiscordLTPBot

A bot for people "Looking to play" games.

To run/test, run node bot.js.

No public auth token.

Wanted functionalities:

Basic Functionality Case : 5q (Queue of 5)

- [x] Ability for people to add themselves to a queue for those who want to play with others.

- [x] Display queues

- [x] Ping people when there are enough people

- [x] Remove user from queue

Abstraction

- [ ] Users should be unique in a queue. Have not implemented due to having to test. (Don't want to create multiple discord accounts yet)

- [ ] Creation of multiple queues

- [ ] Ability to set amount of people to play

- [ ] Ability to add amount of time available (i.e. take me off queue after x amount of time)

- [ ] If user goes away, or offline, take off of queue

- [ ] If a person is in multiple queues, and one queue pops with his name, and he is pinged, remove him from other queues that he is in

- [ ] Deploy onto AWS (free EC2) Server?

- [ ] Improve search/remove time. Optimize. Make it scalable.
