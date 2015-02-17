//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Credit to http://gamedevelopment.tutsplus.com/tutorials/using-the-html5-gamepad-api-to-add-controller-support-to-browser-games--cms-21345 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $ = require("jquery-browserify");

var gamepadProto = {
    getState: function getState () {
        return lastGamepadState;
    }
};

module.exports = GamePad;

function GamePad() {
    if (!canGame()) throw "Gamepad Unsuported";

    return Object.create(gamepadProto);
}

var prompt = "To begin using your gamepad, connect it and press any button!",
    noGamepadState = {
        prompt: prompt
    },
    lastGamepadState = noGamepadState,
    hasGP = false,
    repGP;

$(window).on("gamepadconnected", function() {
    hasGP = true;
    repGP = window.setInterval(reportOnGamepad, 100);
});

$(window).on("gamepaddisconnected", function() {
    lastGamepadState = noGamepadState;
    window.clearInterval(repGP);
});

var checkForGamepad = window.setInterval(function() {
    if (navigator.getGamepads()[0]) {
        if (!hasGP) $(window).trigger("gamepadconnected");
        window.clearInterval(checkForGamepad);
    }
}, 500);

function canGame() {
    return "getGamepads" in navigator;
}

var once = true;
function reportOnGamepad() {
    lastGamepadState = navigator.getGamepads()[0];
}