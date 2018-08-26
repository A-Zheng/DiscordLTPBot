var method = Queue.prototype;

function Queue(age) {
    this._queue = [];
}

method.isEmpty = function() {
    return (this.queue.length === 0);
};

method.addToQueue = function(name) {

};

method.getQueue = function() {
    return this._age;
};

module.exports = Queue;