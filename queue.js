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

method.popQueue = function() {
    popped = [];
    
    for (let i = 0; i < this._popAmt; ++i) {
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

method.findAndRemove = function(item) {
    if (this._queue.find(function(element) 
        { return element == item; })) {
        let ind = this._queue.indexOf(item);
        this._queue.splice(ind, 1);
        console.log("Queue after removal: " + this._queue);
        return true;
    } else {
        console.log("Could not find " + item + "in queue" + this._name);
        return false;
    }
}

module.exports = Queue;