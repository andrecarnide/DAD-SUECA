"use strict";
var PlayerGame = (function () {
    function PlayerGame(userId, gameId, playerCards, playerTurn, playerTeam) {
        this.userId = '';
        this.gameId = '';
        this.playerCards = [];
        this.playerTurn = 0;
        this.playerTeam = '';
        this.userId = userId;
        this.gameId = gameId;
        this.playerCards = playerCards;
        this.playerTurn = playerTurn;
        this.playerTeam = playerTeam;
    }
    return PlayerGame;
}());
exports.PlayerGame = PlayerGame;
;
//# sourceMappingURL=playerGame.js.map