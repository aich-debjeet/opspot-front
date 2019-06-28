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
var ChannelSupporters = /** @class */ (function () {
    function ChannelSupporters(session, client) {
        this.session = session;
        this.client = client;
        this.users = [];
        this.offset = '';
        this.moreData = true;
        this.inProgress = false;
    }
    Object.defineProperty(ChannelSupporters.prototype, "channel", {
        set: function (value) {
            this.guid = value.guid;
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    ChannelSupporters.prototype.load = function () {
        var _this = this;
        if (this.inProgress)
            return;
        this.inProgress = true;
        this.client.get('api/v1/payments/subscribers/' + this.guid + '/exclusive', { offset: this.offset })
            .then(function (response) {
            if (!response.subscribers || response.subscribers.length === 0) {
                _this.moreData = false;
                _this.inProgress = false;
                return;
            }
            _this.users = _this.users.concat(response.subscribers);
            _this.offset = response['load-next'];
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    ChannelSupporters = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channel--supporters',
            inputs: ['channel'],
            templateUrl: 'supporters.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client])
    ], ChannelSupporters);
    return ChannelSupporters;
}());
exports.ChannelSupporters = ChannelSupporters;
//# sourceMappingURL=supporters.js.map