var method = Queue.prototype;

function Queue(name, popAmt) {
    this._name = name;
    this._queue = [];
    this._popAmt = popAmt;
}

method.isEmpty = function() {
    return (this._queue.length === 0);
};

method.pushToQueue = function(toPush) {
    this._queue.push(toPush);
};

// fix this and add an amount to pop
method.popQueue = function() {
    popped = [];
    
    for (i = 0; i < this._popAmt; ++i) {
        popped.push(this._queue.shift());
        console.log(popped);
    }
    console.log(popped);
    return popped;
};

method.isReadyPop = function() {
    console.log("this queue length: " + this._queue.length);
    console.log("this queue length: " + this._popAmt);
    return (this._queue.length >= this._popAmt);
};

method.getQueueName = function() {
    return this._name;
};

method.getQueue = function() {
    return this._queue;
};

method.getQueueLength = function() {
    return this._queue.length;
};

method.getPopAmt = function() {
    return this._popAmt;
};

module.exports = Queue;

/*
var queue = [];
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
var i = queue.shift(); // queue is now [5]
alert(i);              // displays 2
*/