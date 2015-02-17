var _ = require("underscore"),
    SAT = require('sat');

module.exports = Collidable;

var collidableEntities = [];

function Collidable(entity, collideCallback) {
    var callback = collideCallback ? collideCallback : defaultCollideCallback;

    addToCollidableEntities(entity, callback);
    entity.checkForCollisions = checkForCollisions.bind(entity, entity, callback);
}

function addToCollidableEntities(entity, callback) {
    collidableEntities.push({
        entity: entity,
        callback: callback
    });
    return entity;
}

function checkForCollisions(entity, entitiesCallback, vector) {
    var endPosition = new SAT.Vector(vector.x, vector.y);
    var entityBox = new SAT.Box(endPosition, entity.w, entity.h).toPolygon();

    var collidingWith = _.filter(collidableEntities, function checkAgainstCollidableEntities(entityMap) {
        if(entity == entityMap.entity) return false;

        var testEntity = entityMap.entity,
            testWithBox = new SAT.Box(
                new SAT.Vector(testEntity.x, testEntity.y), 
                testEntity.w,
                testEntity.h
                ).toPolygon(),
            testResponse = new SAT.Response(),
            testBool = SAT.testPolygonPolygon(entityBox, testWithBox, testResponse);

            return testBool && testResponse.overlap > 0; //If overlap is 0 then they may be (for eg.) full unit size and in adjecent tiles
    });

    _.each(collidingWith, function triggerCollisionEvent(entityMap) {
        entitiesCallback.call(entity, entityMap.entity);
        entityMap.callback.call(entityMap.entity, entity);
    });

    return _.map(collidingWith, _.property("entity"));
}

function defaultCollideCallback(entity) {
    //console.log("Collision involving " + JSON.stringify(entity));
}