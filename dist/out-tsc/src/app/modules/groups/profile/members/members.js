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
var groups_service_1 = require("../../groups-service");
var client_service_1 = require("../../../../common/api/client.service");
var session_1 = require("../../../../services/session");
var GroupsProfileMembers = /** @class */ (function () {
    function GroupsProfileMembers(session, client, service) {
        this.session = session;
        this.client = client;
        this.service = service;
        this.opspot = window.Opspot;
        this.invitees = [];
        this.members = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.canInvite = false;
        this.q = '';
    }
    GroupsProfileMembers.prototype.ngOnInit = function () {
        var _this = this;
        this.$group = this.service.$group.subscribe(function (group) {
            _this.group = group;
            _this.load(true);
            _this.el.nativeElement.scrollIntoView();
        });
    };
    GroupsProfileMembers.prototype.ngOnDestroy = function () {
        if (this.searchDelayTimer) {
            clearTimeout(this.searchDelayTimer);
        }
        this.$group.unsubscribe();
    };
    GroupsProfileMembers.prototype.load = function (refresh, query) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (query === void 0) { query = null; }
        if (this.httpSubscription)
            this.httpSubscription.unsubscribe();
        if (refresh) {
            this.offset = '';
            this.moreData = true;
            this.members = [];
        }
        // TODO: [emi] Send this via API
        this.canInvite = false;
        if (this.group['is:owner']) {
            this.canInvite = true;
        }
        else if (this.group.membership === 2 && this.group['is:member']) {
            this.canInvite = true;
        }
        var endpoint = "api/v1/groups/membership/" + this.group.guid, params = { limit: 12, offset: this.offset };
        if (this.q) {
            endpoint = endpoint + "/search";
            params.q = this.q;
        }
        this.inProgress = true;
        this.httpSubscription = this.client.get(endpoint, params)
            .subscribe(function (response) {
            console.log(response);
            if (!response.members) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (refresh) {
                _this.members = response.members;
            }
            else {
                _this.members = _this.members.concat(response.members);
            }
            if (response['load-next']) {
                _this.offset = response['load-next'];
            }
            else {
                _this.moreData = false;
            }
            _this.inProgress = false;
        }, function (err) {
            _this.inProgress = false;
        });
    };
    GroupsProfileMembers.prototype.invite = function (user) {
        for (var _i = 0, _a = this.invitees; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.guid === user.guid)
                return;
        }
        this.invitees.push(user);
    };
    GroupsProfileMembers.prototype.search = function (q) {
        var _this = this;
        if (this.searchDelayTimer) {
            clearTimeout(this.searchDelayTimer);
        }
        this.q = q;
        this.searchDelayTimer = setTimeout(function () {
            _this.load(true);
        }, 300);
    };
    __decorate([
        core_1.ViewChild('el'),
        __metadata("design:type", Object)
    ], GroupsProfileMembers.prototype, "el", void 0);
    GroupsProfileMembers = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-profile-members',
            inputs: ['_group : group'],
            templateUrl: 'members.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, client_service_1.OpspotHttpClient, groups_service_1.GroupsService])
    ], GroupsProfileMembers);
    return GroupsProfileMembers;
}());
exports.GroupsProfileMembers = GroupsProfileMembers;
//# sourceMappingURL=members.js.map