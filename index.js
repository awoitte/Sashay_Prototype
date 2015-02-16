var Map = require("./map"),
    EventList = require("./eventList"),
    dudeFactory = require("./Factories/dudeFactory"),
    wallFactory = require("./Factories/wallFactory"),
    enemyFactory = require("./Factories/enemyFactory"),
    Renderable = require("./Behaviours/renderable");

$(document.body).css({
    "margin": 0,
    "padding": 0
});

var mapW = 67,
    mapH = 31,
    map = Map(mapW, mapH),
    pixelBugdetPerWall = 20;

map.eachTile(function setTileToRandomColor(tile) {
    Renderable(tile, "once", {
        image: "img/tile" + randomTileOffset() + ".png"
    });
});

function randomTileOffset () {
    return Math.round(Math.random() * 2) + 1;
}

function makeARandomWall() {
    var x = Math.round(Math.random() * mapW),
    y = Math.round(Math.random() * mapH),
    w = Math.round(Math.random() * pixelBugdetPerWall),
    h = Math.round(pixelBugdetPerWall - w),
    overMapWBy = (x + w) - mapW,
    overMapHBy = (y + h) - mapH;

    if(overMapWBy > 0) x -= overMapWBy;
    if(overMapHBy > 0) y -= overMapHBy;
    wallFactory(x,y,w,h);
}

for (var i = 0; i < 20; i++) makeARandomWall();
for (var i = 0; i < 50; i++) enemyFactory(map);

var keyDowns = EventList(),
    dude = dudeFactory(0, 0, keyDowns, map);

$(document.body).keydown(keyDowns.push);