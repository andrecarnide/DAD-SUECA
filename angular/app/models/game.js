"use strict";
var Game = (function () {
    function Game(id, name, state, creatorId, gameStart, gameEnd, winner1, winner2, players) {
        this._id = id;
        this.name = name;
        this.state = state;
        this.creatorId = creatorId;
        this.gameStart = gameStart;
        this.gameEnd = gameEnd;
        this.winner1 = winner1;
        this.winner2 = winner2;
        this.players = players;
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map