var _ = require("underscore"),
    unary = require("../Helpers/unary");

module.exports = Healthable;

function Healthable (entity, startingHealth) {
    var health = {
        amount: startingHealth !== void 0 ? startingHealth : 10
    };

    entity.damage = damage.bind(entity, health);
    entity.heal = heal.bind(entity, health);
    entity.getHealth = getHealth.bind(entity, health);
}

function getHealth (health) {
    return health.amount;
}

function damage (health, amount) {
    health.amount = adjustHealth(health.amount, -1 * amount);
}

function heal (health, amount) {
    health.amount = adjustHealth(health.amount, amount);
}

function adjustHealth (health, amount) {
    if((health + amount) < 0) return 0;
    return health + amount;
}