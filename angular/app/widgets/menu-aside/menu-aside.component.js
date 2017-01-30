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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var MenuAsideComponent = (function () {
    function MenuAsideComponent(router, auth) {
        var _this = this;
        this.router = router;
        this.auth = auth;
        this.links = [
            {
                "title": "Home",
                "icon": "home",
                "link": ['/']
            },
            {
                "title": "Lobby",
                "icon": "gamepad",
                "link": ['/lobby']
            },
            {
                "title": "Game",
                "icon": "users",
                "link": ['/game']
            },
            {
                "title": "History",
                "icon": "history",
                "link": ['/history']
            },
            {
                "title": "Top 10",
                "icon": "table",
                "link": ['/top10']
            },
            {
                "title": "Global Chat",
                "icon": "wechat",
                "link": ['/globalchat']
            },
        ];
        this.router.events.subscribe(function (evt) { return _this.current_url = evt.url; });
        this.auth = auth;
    }
    MenuAsideComponent.prototype.ngOnInit = function () {
    };
    return MenuAsideComponent;
}());
MenuAsideComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'menu-aside',
        templateUrl: './menu-aside.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService])
], MenuAsideComponent);
exports.MenuAsideComponent = MenuAsideComponent;
//# sourceMappingURL=menu-aside.component.js.map
