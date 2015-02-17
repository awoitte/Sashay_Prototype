var _ = require("underscore"),
    Entity = require("../entity"),
    uniqueId = require("../Helpers/uniqueId"),
    Moveable = require("../Behaviours/moveable"),
    Collidable = require("../Behaviours/collidable"),
    Healthable = require("../Behaviours/healthable"),
    Renderable = require("../Behaviours/renderable");

module.exports = Dude;

function Dude(x, y, keyDowns, gamepadDowns, map) {
    var dude = Entity(x, y, 1, 1);

    //behaviours
    Moveable(dude);
    Collidable(dude, handleCollision.bind(dude));
    Healthable(dude, 5);
    Renderable(dude, "always", {
        image: defaultImg.bind(dude, dude)
    });

    dude.id = uniqueId();

    dude.moveBasedOnInputVector = moveBasedOnInputVector.bind(dude, dude);

    dude.isWithinMap = isWithinMap.bind(dude, dude, map);

    keyDowns.forEach(handleKeyDown.bind(dude, dude));
    gamepadDowns.forEach(handleButtonDown.bind(dude, dude));

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

function handleButtonDown (dude, e) {
    if(e.keyCode !== void 0 && e.type === "axis"){
        
        if(e.keyCode === 1 && e.direction === "neg") dude.moveBasedOnInputVector({
            x: 0,
            y: -1
        });
        if (e.keyCode === 1 && e.direction === "pos") dude.moveBasedOnInputVector({
            x: 0,
            y: 1
        });
        if (e.keyCode === 0 && e.direction === "neg") dude.moveBasedOnInputVector({
            x: -1,
            y: 0
        });
        if (e.keyCode === 0 && e.direction === "pos") dude.moveBasedOnInputVector({
            x: 1,
            y: 0
        });
    }
    if (e.keyCode && e.type === "button") {
        if (e.keyCode === 12) dude.moveBasedOnInputVector({
            x: 0,
            y: -1
        });
        if (e.keyCode === 13) dude.moveBasedOnInputVector({
            x: 0,
            y: 1
        });
        if (e.keyCode === 14) dude.moveBasedOnInputVector({
            x: -1,
            y: 0
        });
        if (e.keyCode === 15) dude.moveBasedOnInputVector({
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
    }
}