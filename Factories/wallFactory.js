var Entity = require("../entity"),
    Collidable = require("../Behaviours/collidable"),
    Renderable = require("../Behaviours/renderable");

module.exports = Wall;

function Wall(x, y, w, h) {
    var wall = Entity(x, y, w, h);
    Collidable(wall);
    Renderable(wall, "once", {
        color: {
            r:0,
            g:0,
            b:0,
            a:1
        }
    });
    return wall;
}