var method = Queue.prototype;

function Queue(name, popAmt) {
    this._name = name;
    this._queue = [];
    this._popAmt = popAmt;
}

method.isEmpty = function() {
    return (this.queue.length === 0);
};

method.pushToQueue = function(name) {

};

method.popQueue = function(amt) {

};

method.getQueueName = function() {
    return this._name;
};

method.getQueue = function() {
    return this._queue;
};

module.exports = Queue;

/*
var queue = [];
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
var i = queue.shift(); // queue is now [5]
alert(i);              // displays 2
*/