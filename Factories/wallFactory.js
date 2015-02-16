var Entity = require("../entity"),
    Collidable = require("../Behaviours/collidable");

module.exports = Wall;

function Wall(x, y, w, h, artist) {
    var wall = Entity(x, y, w, h);
    artist.setColor(0, 0, 0, 1, wall);
    artist.drawEntity(wall);
    Collidable(wall);
    return wall;
}