"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var modules = [
    platform_browser_1.BrowserModule,
    forms_1.FormsModule,
    http_1.HttpModule,
    app_routing_1.AppRoutingModule
];
var app_header_component_1 = require("./widgets/app-header/app-header.component");
var menu_aside_component_1 = require("./widgets/menu-aside/menu-aside.component");
var user_box_component_1 = require("./widgets/user-box/user-box.component");
var app_footer_component_1 = require("./widgets/app-footer/app-footer.component");
var app_component_1 = require("./app.component");
var widgets = [
    app_component_1.AppComponent,
    app_header_component_1.AppHeaderComponent,
    menu_aside_component_1.MenuAsideComponent,
    user_box_component_1.UserBoxComponent,
    app_footer_component_1.AppFooterComponent
];
var guard_service_1 = require("./services/guard.service");
var authentication_service_1 = require("./services/authentication.service");
var websocket_service_1 = require("./services/websocket.service");
var top10_service_1 = require("./services/top10.service");
var history_service_1 = require("./services/history.service");
var services = [
    websocket_service_1.WebSocketService,
    authentication_service_1.AuthenticationService,
    guard_service_1.GuardService,
    top10_service_1.Top10Service,
    history_service_1.HistoryService
];
var home_component_1 = require("./pages/home/home.component");
var history_component_1 = require("./pages/history/history.component");
var top10_component_1 = require("./pages/top10/top10.component");
var globalchat_component_1 = require("./pages/globalchat/globalchat.component");
var login_component_1 = require("./pages/login/login.component");
var register_component_1 = require("./pages/register/register.component");
var lobby_component_1 = require("./pages/lobby/lobby.component");
var pagenotfound_component_1 = require("./pages/pagenotfound/pagenotfound.component");
var notification_component_1 = require("./pages/notifications/notification.component");
var lobbytable_component_1 = require("./pages/lobbytable/lobbytable.component");
var game_component_1 = require("./pages/game/game.component");
var privatechat_component_1 = require("./pages/privatechat/privatechat.component");
var pages = [
    home_component_1.HomeComponent,
    history_component_1.HistoryComponent,
    top10_component_1.Top10Component,
    globalchat_component_1.GlobalChatComponent,
    login_component_1.LoginComponent,
    register_component_1.RegisterComponent,
    lobby_component_1.LobbyComponent,
    pagenotfound_component_1.PageNotFoundComponent,
    notification_component_1.NotificationComponent,
    lobbytable_component_1.LobbyTableComponent,
    game_component_1.GameComponent,
    privatechat_component_1.PrivateChatComponent
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: widgets.concat(pages),
        imports: modules.slice(),
        providers: services.slice(),
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map