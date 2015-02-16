module.exports = function uniqueId () {
    return lastId++;
};

var lastId = 1;