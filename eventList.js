var argsToArray = require("./Helpers/argsToArray"),
    throttle = require("./Helpers/throttle");

module.exports = EventList;

var eventListProto = {
    throttle: function throttleEventList(time) {
        var prop,
            returnObj = {};
        for (prop in this) returnObj[prop] = throttle(this[prop], time);

        return returnObj;
    }
};

function EventList() {
    var eventList = Object.create(eventListProto),
        subscriptions = [];

    eventList.forEach = forEach.bind(eventList, subscriptions);
    eventList.push = pushToSubscriptions.bind(eventList, subscriptions);

    return eventList;
}

function forEach(subscriptions, callback) {
    subscriptions.push(callback);
    return this;
}

function pushToSubscriptions(subscriptions) {
    var args = argsToArray(arguments);
    args.shift();
    subscriptions.forEach(function callCallback(callback) {
        callback.apply(null, args);
    });
}