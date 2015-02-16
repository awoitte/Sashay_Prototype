var $ = require("jquery-browserify"),
    Dictionary = require("./Helpers/dictionary");

module.exports = DOMArtist;

var artistProto = {
    setColor: function setColor(r, g, b, a, entity) {
        entity.color = "rgba(" + ([r, g, b, a].join(",")) + ")";
        return this;
    },
    setImage: function setImage (url, entity, offsetX, offsetY) {
        entity.img = url;
        if(offsetX && offsetY) entity.bgOffset = {
            x: unitsToPixels(offsetX) + offsetX,
            y: unitsToPixels(offsetY) + offsetY
        };
        return this;
    }
};

function DOMArtist($el) {
    var artist = Object.create(artistProto),
        entityDictionary = Dictionary();

    if ($el === void 0 || !$el.length)($el = $("<div>"), $el.appendTo(document.body));

    artist.drawEntity = drawEntity.bind(artist, entityDictionary, $el);

    return artist;
}

function drawEntity(entityDictionary, $el, entity) {
    if (!entityDictionary || !$el || !entity) return this;

    getElementForEntity(entityDictionary, entity).width(unitsToPixels(entity.w))
        .height(unitsToPixels(entity.h))
        .offset({
            top: unitsToPixels(entity.y),
            left: unitsToPixels(entity.x)
        })
        .css({
            position: "absolute",
            "background-color": entity.color || "black",
            "background-image": entity.img ? "url(" + entity.img + ")" : "none",
            "background-position": entity.bgOffset ? bgOffset.x + "px " + bgOffset.y + "px" : "center"
        })
        .appendTo($el);

    return this;
}

function createEl() {
    return $("<div>");
}

function getElementForEntity(entityDictionary, entity) {
    if (entity.id !== null && entity.id !== void 0) {
        var currentEl = entityDictionary.get(entity);
        if (currentEl) return currentEl;
        else {
            var newEl = createEl();
            entityDictionary.set(entity, newEl);
            return newEl;
        }
    }
    return createEl();
}

function unitsToPixels(unit) {
    return unit * 20;
}