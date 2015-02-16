module.exports = function throttle (func, time) {
    var lastDateCalled;

    return function callIfReady () {
        var now = Date.now();
        if(!lastDateCalled || (now - lastDateCalled) > time){
            lastDateCalled = now;
            return func.apply(this, arguments);
        }
        return null;
    };
};