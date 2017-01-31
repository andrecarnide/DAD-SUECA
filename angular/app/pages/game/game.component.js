"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var authentication_service_1 = require('../../services/authentication.service');
var game_service_1 = require('../../services/game.service');
var card_1 = require('../../models/card');
var GameComponent = (function () {
    function GameComponent(gameService, authService, router) {
        this.gameService = gameService;
        this.authService = authService;
        this.router = router;
        this.trumpSuit = '';
        this.cardsBack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.myCards = [];
        this.roundTableCards = [];
        this.teamA = [];
        this.teamB = [];
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (response) {
            _this.gameService.sendGame(response.id);
        });
        this.myUser = this.authService.user;
        this.getMyCards();
        this.getTrumpSuitGame();
        this.getTableCards();
    };
    GameComponent.prototype.getTrumpSuitGame = function () {
        var _this = this;
        this.gameService.getTrumpSuit().subscribe(function (response) { return _this.trumpSuit = response; });
    };
    GameComponent.prototype.getMyCards = function () {
        var _this = this;
        this.gameService.getGame().subscribe(function (response) {
            if (response.userId == _this.authService.user._id) {
                response.playerCards.forEach(function (item) {
                    _this.myCards.push(new card_1.Card(item.suite, item.value));
                });
            }
        });
    };
    GameComponent.prototype.getTableCards = function () {
        var _this = this;
        this.gameService.getPlayCard().subscribe(function (response) {
            if (_this.roundTableCards.length <= 3) {
                _this.roundTableCards.push(new card_1.Card(response.card.suite, response.card.value));
            }
            else {
            }
        });
    };
    GameComponent.prototype.playCard = function (card) {
        this.gameService.sendPlayCard(this.gameService.getPrivateGame(), card, this.authService.user);
    };
    GameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './game.component.html',
            styleUrls: ['./game.component.css']
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map