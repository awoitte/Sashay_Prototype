module.exports = function argsToArray(args) {
    return Array.prototype.splice.call(args, 0);
}