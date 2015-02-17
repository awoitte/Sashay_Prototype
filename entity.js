module.exports = Entity;

var entityProto = {
    convertRelativeVectorToGlobal: function (vector) {
        return {
            x: this.x + vector.x,
            y: this.y + vector.y
        };
    }
};

function Entity(x, y, w, h) {
    var entity = Object.create(entityProto);
    entity.x = x;
    entity.y = y;
    entity.w = w;
    entity.h = h;
    return entity;
}