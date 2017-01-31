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
var top10_service_1 = require('../../services/top10.service');
var Top10Component = (function () {
    function Top10Component(top10Service) {
        this.top10Service = top10Service;
        this.playersByVictories = [];
        this.playersByScore = [];
    }
    Top10Component.prototype.ngOnInit = function () {
        this.getTop10PlayersByVictories();
        this.getTop10PlayersByScore();
    };
    Top10Component.prototype.getTop10PlayersByVictories = function () {
        var _this = this;
        this.top10Service.getTop10ByVictories().subscribe(function (response) { return _this.playersByVictories = response; });
    };
    Top10Component.prototype.getTop10PlayersByScore = function () {
        var _this = this;
        this.top10Service.getTop10ByScore().subscribe(function (response) { return _this.playersByScore = response; });
    };
    Top10Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './top10.component.html',
            styleUrls: ['./top10.component.css']
        }), 
        __metadata('design:paramtypes', [top10_service_1.Top10Service])
    ], Top10Component);
    return Top10Component;
}());
exports.Top10Component = Top10Component;
//# sourceMappingURL=top10.component.js.map