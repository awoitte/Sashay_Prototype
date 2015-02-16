module.exports = Entity;

var entityProto = {
    isPointInEntity: function (vector) {
        return vector.x >= this.x && vector.y >= this.y && vector.x < (this.x + this.w) &&  vector.y < (this.y + this.h);
    },
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