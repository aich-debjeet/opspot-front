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
var api_1 = require("../../../../../services/api");
var groups_service_1 = require("../../../groups-service");
var GroupsProfileMembersInvite = /** @class */ (function () {
    function GroupsProfileMembersInvite(client, service) {
        this.client = client;
        this.service = service;
        this.opspot = window.Opspot;
        this.invited = new core_1.EventEmitter();
        this.users = [];
        this.searching = false;
        this.q = '';
        this.inviteInProgress = false;
        this.inviteLastUser = '';
        this.inviteError = '';
    }
    Object.defineProperty(GroupsProfileMembersInvite.prototype, "_group", {
        set: function (value) {
            this.group = value;
        },
        enumerable: true,
        configurable: true
    });
    GroupsProfileMembersInvite.prototype.invite = function (user) {
        var _this = this;
        if (!user.subscriber) {
            return alert('You can only invite users who are subscribed to you');
        }
        this.invited.next(user);
        this.q = '';
        this.users = [];
        if (!this.group) {
            return;
        }
        this.inviteInProgress = true;
        this.inviteLastUser = '';
        this.inviteError = '';
        this.service.invite(this.group, user)
            .then(function () {
            _this.inviteInProgress = false;
        })
            .catch(function (e) {
            _this.inviteInProgress = false;
            _this.inviteError = e;
        });
    };
    GroupsProfileMembersInvite.prototype.search = function (q) {
        var _this = this;
        if (this.timeout)
            clearTimeout(this.timeout);
        this.searching = true;
        if (this.q.charAt(0) !== '@') {
            this.q = '@' + this.q;
        }
        var query = this.q;
        if (query.charAt(0) === '@') {
            query = query.substr(1);
        }
        this.timeout = setTimeout(function () {
            _this.client.get("api/v2/search/suggest/user", {
                q: query,
                limit: 5,
                hydrate: 1
            })
                .then(function (success) {
                if (success.entities) {
                    _this.users = success.entities;
                }
            })
                .catch(function (error) {
                console.log(error);
            });
        }, 600);
    };
    GroupsProfileMembersInvite = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-profile-members-invite',
            inputs: ['_group : group'],
            outputs: ['invited'],
            templateUrl: 'invite.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, groups_service_1.GroupsService])
    ], GroupsProfileMembersInvite);
    return GroupsProfileMembersInvite;
}());
exports.GroupsProfileMembersInvite = GroupsProfileMembersInvite;
//# sourceMappingURL=invite.js.map