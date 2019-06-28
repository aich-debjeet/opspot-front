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
var encryption_service_1 = require("../encryption/encryption.service");
var animations_1 = require("../animations");
var MessengerSetupChat = /** @class */ (function () {
    function MessengerSetupChat(encryption) {
        this.encryption = encryption;
        this.open = false;
    }
    MessengerSetupChat.prototype.toggle = function () {
        this.open = !this.open;
    };
    MessengerSetupChat.prototype.openPane = function () {
        this.open = true;
        this.attentionNeededTrigger = Date.now();
    };
    MessengerSetupChat = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-messenger--setup',
            templateUrl: 'setup.component.html',
            animations: animations_1.animations,
        }),
        __metadata("design:paramtypes", [encryption_service_1.MessengerEncryptionService])
    ], MessengerSetupChat);
    return MessengerSetupChat;
}());
exports.MessengerSetupChat = MessengerSetupChat;
//# sourceMappingURL=setup.component.js.map