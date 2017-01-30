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
var authentication_service_1 = require("../../services/authentication.service");
var AppHeaderComponent = (function () {
    function AppHeaderComponent(auth) {
        this.auth = auth;
        this.auth = auth;
    }
    return AppHeaderComponent;
}());
AppHeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-header',
        templateUrl: './app-header.component.html',
        styleUrls: ['./app-header.component.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AppHeaderComponent);
exports.AppHeaderComponent = AppHeaderComponent;
//# sourceMappingURL=app-header.component.js.map