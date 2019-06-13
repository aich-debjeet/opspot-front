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
var session_1 = require("../../../../../services/session");
var api_1 = require("../../../../../services/api");
var UserCard = /** @class */ (function () {
    function UserCard(session, client) {
        this.session = session;
        this.client = client;
        this.opspot = window.Opspot;
        this.avatarSize = 'medium';
    }
    Object.defineProperty(UserCard.prototype, "object", {
        set: function (value) {
            this.user = value;
            this.bannerSrc = this.opspot.cdn_url + "fs/v1/banners/" + this.user.guid + "/fat/" + this.user.icontime;
        },
        enumerable: true,
        configurable: true
    });
    UserCard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-card-user',
            inputs: ['object', 'avatarSize'],
            templateUrl: 'user.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client])
    ], UserCard);
    return UserCard;
}());
exports.UserCard = UserCard;
//# sourceMappingURL=user.js.map