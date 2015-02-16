var _ = require("underscore"),
    Dictionary = require("../Helpers/dictionary"),
    Artist = require("../CanvasArtist");

module.exports = Renderable;

function Renderable(entity, type, options) {
    if (type === "always") {
        renderOptions.set(entity, options);
        alwaysRenders.push(entity);
    } else if (type === "if") {
        renderOptions.set(entity, options);
        ifRenders.push(entity);
    } else if (type === "once") renderEntity(onceArtist, entity, options);
    return entity;
}

var alwaysRenders = [],
    ifRenders = [],
    renderOptions = Dictionary(),
    onceArtist = Artist(),
    frequentlyArtist = Artist();

function renderFrame() {
    frequentlyArtist.clear();

    _.each(alwaysRenders, function renderAlwaysEntity(entity) {
        renderEntity(frequentlyArtist, entity, renderOptions.get(entity));
    });

    _.each(ifRenders, function renderAlwaysEntity(entity) {
        var options = renderOptions.get(entity);
        if (options.predicate && options.predicate(entity, options)) renderEntity(frequentlyArtist, entity, options);
    });
}

function renderEntity(artist, entity, options) {
    if (options && options.image) artist.setImage(_.result(options, "image"), entity);
    if (options && options.color) artist.setColor(
        _.result(options.color, "r"),
        _.result(options.color, "g"),
        _.result(options.color, "b"),
        _.result(options.color, "a"),
        entity);
    artist.drawEntity(entity);
}

////////////////
//Render Loop //
////////////////

var lastRender = null,
    milliPerFrame = 41.6; // ~24 fps

function renderStep(timestamp) {
    if (!lastRender) lastRender = timestamp;

    if (timestamp - lastRender >= milliPerFrame) {
        lastRender = timestamp;
        renderFrame();
    }

    window.requestAnimationFrame(renderStep);
}

window.requestAnimationFrame(renderStep);