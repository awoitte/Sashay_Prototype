module.exports = function enemyRenderPredicate(entity, options) {
    if (entity.changedSinceLastRender) {
        entity.changedSinceLastRender = false;
        return true;
    }
    else return false;
};