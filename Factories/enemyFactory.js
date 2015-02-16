var Entity = require("../entity"),
    uniqueId = require("../Helpers/uniqueId"),
    unary = require("../Helpers/unary"),
    reverseVector = require("../Helpers/reverseVector"),
    Moveable = require("../Behaviours/moveable"),
    Collidable = require("../Behaviours/collidable"),
    Healthable = require("../Behaviours/healthable");

module.exports = Enemy;

function Enemy(enemyArtist, map) {
    var enemy = Entity(Math.round(Math.random() * map.getW()) - 1, Math.round(Math.random() * map.getH()) - 1, 1, 1);
    Moveable(enemy);
    Collidable(enemy);
    Healthable(enemy);

    enemy.id = uniqueId();
    enemy.update = enemyArtist.drawEntity.bind(enemyArtist, enemy);
    enemyArtist.setColor(255, 0, 0, 1, enemy).setImage("img/enemy.png", enemy);
    enemy.update();

    enemy.moveVector = {
        x: Math.round((Math.random() * 2) - 1),
        y: Math.round((Math.random() * 2) - 1)
    };

    enemy.isEnemy = unary.bind(enemy, true);

    enemy.moveBasedOnInputVector = moveBasedOnInputVector.bind(enemy, enemy);

    enemy.isWithinMap = isWithinMap.bind(enemy, enemy, map);

    setInterval(moveDirection.bind(enemy, enemy), 500);

    return enemy;
}

function moveDirection(enemy) {
    if (enemy.moveBasedOnInputVector(enemy.moveVector)) return true;
    else if (enemy.moveBasedOnInputVector(reverseVector(enemy.moveVector))) enemy.moveVector = reverseVector(enemy.moveVector);
    //else stuck
}

function isWithinMap(enemy, map, destination) {
    return destination.x >= 0 && destination.y >= 0 && destination.x < map.getW() && destination.y < map.getH();
}

function moveBasedOnInputVector(enemy, vector) {
    var destination = enemy.convertRelativeVectorToGlobal(vector),
        collisions = enemy.checkForCollisions(destination);

    if (collisions.length === 0 && enemy.isWithinMap(destination)) {
        enemy.move(vector);
        enemy.update();
        return true;
    } else return false;
}