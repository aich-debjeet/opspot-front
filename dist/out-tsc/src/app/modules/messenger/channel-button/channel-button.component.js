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
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var dockpanes_service_1 = require("../dockpanes/dockpanes.service");
var MessengerChannelButton = /** @class */ (function () {
    function MessengerChannelButton(session, client, dockpanes) {
        this.session = session;
        this.client = client;
        this.dockpanes = dockpanes;
        this.opspot = window.Opspot;
    }
    MessengerChannelButton.prototype.chat = function () {
        var conversation = this.buildConversation();
        console.log(conversation);
        this.dockpanes.open(conversation);
    };
    MessengerChannelButton.prototype.buildConversation = function () {
        return {
            guid: this.permutate(),
            participants: [this.user],
            open: true
        };
    };
    MessengerChannelButton.prototype.permutate = function () {
        var participants = [this.user.guid, this.session.getLoggedInUser().guid];
        participants.sort(function (a, b) { return a < b ? -1 : 1; });
        return participants.join(':');
    };
    MessengerChannelButton = __decorate([
        core_1.Component({
            selector: 'm-messenger--channel-button',
            templateUrl: 'channel-button.component.html',
            inputs: ['user']
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            dockpanes_service_1.MessengerConversationDockpanesService])
    ], MessengerChannelButton);
    return MessengerChannelButton;
}());
exports.MessengerChannelButton = MessengerChannelButton;
//# sourceMappingURL=channel-button.component.js.map