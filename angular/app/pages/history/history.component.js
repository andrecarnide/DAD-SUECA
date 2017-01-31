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
var history_service_1 = require('../../services/history.service');
var authentication_service_1 = require('../../services/authentication.service');
var HistoryComponent = (function () {
    function HistoryComponent(historyService, auth) {
        this.historyService = historyService;
        this.auth = auth;
        this.allHistoryGames = [];
        this.myHistoryGames = [];
        this.textButtonMyHistory = 'Show My History';
        this.hideTableMyHistory = true;
        this.auth = auth;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        this.getHistory();
    };
    HistoryComponent.prototype.getHistory = function () {
        var _this = this;
        this.historyService.getHistoryGames().subscribe(function (response) { return _this.allHistoryGames = response; });
    };
    HistoryComponent.prototype.getMyHistory = function () {
        var _this = this;
        this.myHistoryGames = [];
        this.historyService.getHistoryGames().subscribe(function (response) {
            response.forEach(function (game) {
                if (game.creatorId == _this.auth.user._id) {
                    _this.myHistoryGames.push(game);
                }
            });
        });
    };
    HistoryComponent.prototype.toggleTableMyHistory = function () {
        this.getMyHistory();
        if (this.hideTableMyHistory) {
            this.hideTableMyHistory = false;
            this.textButtonMyHistory = 'Hide My History';
        }
        else {
            this.hideTableMyHistory = true;
            this.textButtonMyHistory = 'Show My History';
        }
    };
    HistoryComponent.prototype.setFinished = function (state) {
        if (state == 'ended') {
            return 'Yes';
        }
        else {
            return 'No';
        }
    };
    HistoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
        }), 
        __metadata('design:paramtypes', [history_service_1.HistoryService, authentication_service_1.AuthenticationService])
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map