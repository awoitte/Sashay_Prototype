module.exports = Moveable;

function Moveable (entity) {
    entity.move = moveEntity.bind(entity, entity);
    return entity;
}

function moveEntity (entity, vector) {
    entity.x += vector.x;
    entity.y += vector.y;
}