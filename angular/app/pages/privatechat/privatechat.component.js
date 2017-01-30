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
var websocket_service_1 = require("../../services/websocket.service");
var PrivateChatComponent = (function () {
    function PrivateChatComponent(websocketService) {
        this.websocketService = websocketService;
        this.privateChat = [];
    }
    PrivateChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getPrivateGameChatMessages().subscribe(function (response) { return _this.privateChat.push(response); });
    };
    PrivateChatComponent.prototype.send = function () {
        this.websocketService.sendPrivateGameChatMessage(this.websocketService.getPrivateGame(), this.message);
        this.message = '';
    };
    return PrivateChatComponent;
}());
PrivateChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'private-chat',
        templateUrl: './privatechat.component.html',
        styleUrls: ['./privatechat.component.css']
    }),
    __metadata("design:paramtypes", [websocket_service_1.WebSocketService])
], PrivateChatComponent);
exports.PrivateChatComponent = PrivateChatComponent;
//# sourceMappingURL=privatechat.component.js.map