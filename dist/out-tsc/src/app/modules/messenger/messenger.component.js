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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sockets_1 = require("../../services/sockets");
var storage_1 = require("../../services/storage");
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var dockpanes_component_1 = require("./dockpanes/dockpanes.component");
var encryption_service_1 = require("./encryption/encryption.service");
var service_1 = require("./sounds/service");
var userlist_component_1 = require("./userlist/userlist.component");
var setup_component_1 = require("./setup/setup.component");
var Messenger = /** @class */ (function () {
    function Messenger(session, client, sockets, injector) {
        this.session = session;
        this.client = client;
        this.sockets = sockets;
        this.injector = injector;
        this.encryption = this.injector.get(encryption_service_1.MessengerEncryptionService);
        this.sounds = new service_1.MessengerSounds();
        this.dockpanes = this.injector.get(dockpanes_component_1.MessengerConversationDockpanesService);
        this.opspot = window.Opspot;
        this.storage = new storage_1.Storage();
    }
    Messenger.prototype.ngAfterViewInit = function () {
        var _this = this;
        // @todo: get rid of this ugly global window hack
        window.openMessengerWindow = function () {
            _this.open();
        };
    };
    Messenger.prototype.ngOnDestroy = function () {
        window.openMessengerWindow = function () {
            return;
        };
    };
    Messenger.prototype.open = function (guid /* for future use */) {
        if (guid === void 0) { guid = null; }
        if (this.userList) {
            this.userList.openPane();
        }
        else if (this.setupChat) {
            this.setupChat.openPane();
        }
    };
    __decorate([
        core_1.ViewChild('userList'),
        __metadata("design:type", userlist_component_1.MessengerUserlist)
    ], Messenger.prototype, "userList", void 0);
    __decorate([
        core_1.ViewChild('setupChat'),
        __metadata("design:type", setup_component_1.MessengerSetupChat)
    ], Messenger.prototype, "setupChat", void 0);
    Messenger = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-messenger',
            templateUrl: 'messenger.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            sockets_1.SocketsService,
            core_1.Injector])
    ], Messenger);
    return Messenger;
}());
exports.Messenger = Messenger;
var conversation_component_1 = require("./conversation/conversation.component");
exports.MessengerConversation = conversation_component_1.MessengerConversation;
//# sourceMappingURL=messenger.component.js.map