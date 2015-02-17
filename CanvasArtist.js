var $ = require("jquery-browserify"),
    Dictionary = require("./Helpers/dictionary");

module.exports = CanvasArtist;

var globalAssets = Dictionary();

var artistProto = {
    setColor: function setColor(r, g, b, a, entity) {
        entity.color = "rgba(" + ([r, g, b, a].join(",")) + ")";
        return this;
    },
    setImage: function setImage(url, entity) {
        var image = globalAssets.get(url);
        if (!image) {
            image = createImage(url);
            globalAssets.set(url, image);
        }
        entity.img = image;
        return this;
    }
};

function CanvasArtist($el) {
    var artist = Object.create(artistProto);

    if ($el === void 0 || !$el.length)($el = createEl(), $el.appendTo(document.body));

    artist.drawEntity = drawEntity.bind(artist, $el);
    artist.clear = clear.bind(artist, $el);

    return artist;
}

function clear ($el) {
    var context = getContext($el);
    context.clearRect(0, 0, $el.width(), $el.height());
}

function drawEntity($el, entity) {
    if (!$el || !entity) throw "drawEntity arguments missing";

    var context = getContext($el);

    if (entity.color) {
        context.fillStyle = entity.color;
        context.fillRect(unitsToPixels(entity.x), unitsToPixels(entity.y), unitsToPixels(entity.w), unitsToPixels(entity.h));
    }

    if (entity.img) context.drawImage(entity.img, unitsToPixels(entity.x), unitsToPixels(entity.y), unitsToPixels(entity.w), unitsToPixels(entity.h));

    return this;
}

function getContext($el) {
    var drawingCanvas = $el[0];
    if (drawingCanvas.getContext) {
        return drawingCanvas.getContext('2d');
    } else {
        throw "Canvas tag must be supported for the CanvasArtist";
    }
}

function createEl() {
    var $el = $("<canvas width='" + $(window).width() + "' height='" + $(window).height() + "'>");
    $el.css({
        position: "absolute",
        top: 0,
        left: 0
    });
    return $el;
}

function createImage(url) {
    var img = new Image();
    img.src = url;
    return img;
}

function unitsToPixels(unit) {
    return unit * 20;
}