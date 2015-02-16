var _ = require("underscore");

module.exports = Dictionary;

function Dictionary() {
    var dictionary = {},
        maps = [];

    dictionary.get = get.bind(dictionary, maps);
    dictionary.set = set.bind(dictionary, maps);
    dictionary.each = each.bind(dictionary, maps);

    return dictionary;
}

function get(maps, key) {
    var map = _.findWhere(maps, {
        key: key
    });
    return map ? map.value : null;
}

function set(maps, key, value) {
    var currentMap = get(maps, key);
    if (currentMap) currentMap.value = value;
    else maps.push({
        key: key,
        value: value
    });
    return this;
}

function each (maps) {
    return _.map(maps, function shallowCloneMap (map) {
        return {
            key: map.key,
            value: map.value
        };
    });
}