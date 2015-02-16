var Map = require("./map"),
    Artist = require("./DOMArtist"),
    EventList = require("./eventList"),
    dudeFactory = require("./Factories/dudeFactory"),
    wallFactory = require("./Factories/wallFactory"),
    enemyFactory = require("./Factories/enemyFactory");

var mapW = 67,
    mapH = 31,
    map = Map(mapW, mapH),
    pixelBugdetPerWall = 20,
    artist = Artist(),
    movingEntityArtist = Artist();

function randomColorInt() {
    return Math.round(Math.random() * 255);
}

function randomTileOffset () {
    return Math.round(Math.random() * 3);
}

map.eachTile(function setTileToRandomColor(tile) {
    artist.setImage("img/tile" + randomTileOffset() + ".png", tile);
}).eachTile(artist.drawEntity);

function makeARandomWall() {
    var x = Math.round(Math.random() * mapW),
    y = Math.round(Math.random() * mapH),
    w = Math.round(Math.random() * pixelBugdetPerWall),
    h = Math.round(pixelBugdetPerWall - w),
    overMapWBy = (x + w) - mapW,
    overMapHBy = (y + h) - mapH;

    if(overMapWBy > 0) x -= overMapWBy;
    if(overMapHBy > 0) y -= overMapHBy;
    wallFactory(x,y,w,h, artist);
}

for (var i = 0; i < 20; i++) makeARandomWall();
for (var i = 0; i < 50; i++) enemyFactory(movingEntityArtist, map);

var keyDowns = EventList(),
    dude = dudeFactory(0, 0, keyDowns, movingEntityArtist, map);

$(document.body).keydown(keyDowns.push);