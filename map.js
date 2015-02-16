var Entity = require("./entity"),
    unary = require("./Helpers/unary");

module.exports = Map;

function Map(w, h) {
    var map = {};

    var tiles = (w > 0 && h > 0) ? generateMap(w, h) : [];

    map.addTile = addTile.bind(map, tiles);

    map.eachTile = eachTile.bind(map, tiles);

    map.getW = unary.bind(null, w);
    map.getH = unary.bind(null, h);

    return map;
}

function generateMap(w, h) {
    var result = [],
        x, y;
    for (x = 0; x < w; ++x)
        for (y = 0; y < h; ++y)
            result.push(Entity(x, y, 1, 1));

    return result;
}

function addTile(tiles, tile) {
    tiles.push(tile);
    return this;
}

function eachTile(tiles, callback) {
    tiles.forEach(callback);
    return this;
}