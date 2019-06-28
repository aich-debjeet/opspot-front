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
var router_1 = require("@angular/router");
var session_1 = require("../../../../services/session");
var GroupsProfileConversation = /** @class */ (function () {
    function GroupsProfileConversation(session, router) {
        this.session = session;
        this.router = router;
    }
    GroupsProfileConversation.prototype.ngOnInit = function () {
        if (!this.group['is:member'] && this.group.membership != 2) {
            this.router.navigate(['/groups/profile', this.group.guid, 'activity']);
            return;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GroupsProfileConversation.prototype, "group", void 0);
    GroupsProfileConversation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-profile-conversation',
            templateUrl: 'conversation.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, router_1.Router])
    ], GroupsProfileConversation);
    return GroupsProfileConversation;
}());
exports.GroupsProfileConversation = GroupsProfileConversation;
//# sourceMappingURL=conversation.component.js.map