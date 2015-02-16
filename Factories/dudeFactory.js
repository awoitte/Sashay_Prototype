var _ = require("underscore"),
    Entity = require("../entity"),
    uniqueId = require("../Helpers/uniqueId"),
    changedSinceLastRenderPredicate = require("../Helpers/changedSinceLastRenderPredicate"),
    Moveable = require("../Behaviours/moveable"),
    Collidable = require("../Behaviours/collidable"),
    Healthable = require("../Behaviours/healthable"),
    Renderable = require("../Behaviours/renderable");

module.exports = Dude;

function Dude(x, y, keyDowns, map) {
    var dude = Entity(x, y, 1, 1);

    //behaviours
    Moveable(dude);
    Collidable(dude, handleCollision.bind(dude));
    Healthable(dude, 5);
    Renderable(dude, "if", {
        image: defaultImg.bind(dude, dude),
        predicate: changedSinceLastRenderPredicate
    });

    dude.id = uniqueId();

    dude.changedSinceLastRender = true;

    dude.moveBasedOnInputVector = moveBasedOnInputVector.bind(dude, dude);

    dude.isWithinMap = isWithinMap.bind(dude, dude, map);

    keyDowns.forEach(handleKeyDown.bind(dude, dude));

    return dude;
}

function defaultImg (dude) {
    if(dude.getHealth() <= 0) return "img/dude-dead.png";
    else if(Date.now() - dude.lastHitTime <= 250) return "img/dude-hurt.png";
    else return "img/dude.png";
}

function isWithinMap(dude, map, destination) {
    return destination.x >= 0 && destination.y >= 0 && destination.x < map.getW() && destination.y < map.getH();
}

function handleCollision (collidingWith) {
    if (_.result(collidingWith, "isEnemy")) {
        var dude = this;
        dude.damage(1);
        dude.lastHitTime = Date.now();
        dude.changedSinceLastRender = true;
        setTimeout(function resetImage () {
            dude.changedSinceLastRender = true;
        }, 250);
    }
}

function handleKeyDown(dude, e) {
    if (e.keyCode) {
        if (e.keyCode === 38) dude.moveBasedOnInputVector({
            x: 0,
            y: -1
        });
        if (e.keyCode === 40) dude.moveBasedOnInputVector({
            x: 0,
            y: 1
        });
        if (e.keyCode === 37) dude.moveBasedOnInputVector({
            x: -1,
            y: 0
        });
        if (e.keyCode === 39) dude.moveBasedOnInputVector({
            x: 1,
            y: 0
        });
    }
}

function moveBasedOnInputVector(dude, vector) {
    var destination = dude.convertRelativeVectorToGlobal(vector),
        collisions = dude.checkForCollisions(destination);
    if (collisions.length === 0 && dude.isWithinMap(destination)) {
        dude.move(vector);
        dude.changedSinceLastRender = true;
    }
}