var _ = require("underscore");

module.exports = Collidable;

var collidableEntities = [];

function Collidable (entity, collideCallback) {
    var callback = collideCallback ? collideCallback : defaultCollideCallback;

    addToCollidableEntities(entity, callback);
    entity.checkForCollisions = checkForCollisions.bind(entity, entity, callback);
}

function addToCollidableEntities (entity, callback) {
    collidableEntities.push({
        entity: entity,
        callback: callback
    });
    return entity;
}

function checkForCollisions (entity, entitiesCallback, vector) {
    var collidingWith = _.filter(collidableEntities, function checkAgainstCollidableEntities (entityMap) {
        var collidableEntity = entityMap.entity;

        return collidableEntity !== entity && collidableEntity.isPointInEntity({
            x: vector.x,
            y: vector.y
        });
    });

    _.each(collidingWith, function triggerCollisionEvent (entityMap) {
        entitiesCallback.call(entity, entityMap.entity);
        entityMap.callback.call(entityMap.entity, entity);
    });

    return _.map(collidingWith, _.property("entitiy"));
}

function defaultCollideCallback (entity) {
    //console.log("Collision involving " + JSON.stringify(entity));
}