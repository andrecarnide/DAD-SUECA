"use strict";
var cardSuit_1 = require("./cardSuit");
var cardValue_1 = require("./cardValue");
var Card = (function () {
    function Card(suite, value) {
        this.suite = suite;
        this.value = value;
    }
    Card.prototype.getSuit = function () {
        return cardSuit_1.cardSuit[this.suite];
    };
    Card.prototype.getValue = function () {
        return cardValue_1.cardValue[this.value];
    };
    Card.prototype.getImageName = function () {
        return "../../../assets/img/cards/" + this.getSuit() + "-" + this.getValue() + ".png";
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map