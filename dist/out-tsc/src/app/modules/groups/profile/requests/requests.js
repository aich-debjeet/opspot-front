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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var GroupsProfileRequests = /** @class */ (function () {
    function GroupsProfileRequests(session, client, service) {
        this.session = session;
        this.client = client;
        this.service = service;
        this.opspot = window.Opspot;
        this.users = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
    }
    GroupsProfileRequests.prototype.ngOnInit = function () {
        var _this = this;
        this.$group = this.service.$group.subscribe(function (group) {
            _this.group = group;
            _this.load(true);
        });
    };
    GroupsProfileRequests.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return;
        if (refresh) {
            this.offset = '';
            this.moreData = true;
            this.users = [];
        }
        this.inProgress = true;
        this.client.get('api/v1/groups/membership/' + this.group.guid + '/requests', { limit: 12, offset: this.offset })
            .then(function (response) {
            if (!response.users || response.users.length === 0) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (_this.users && !refresh) {
                for (var _i = 0, _a = response.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    _this.users.push(user);
                }
            }
            else {
                _this.users = response.users;
            }
            _this.offset = response['load-next'];
            _this.inProgress = false;
        });
    };
    GroupsProfileRequests.prototype.accept = function (user, index) {
        var _this = this;
        this.service.acceptRequest(this.group, user.guid)
            .then(function () {
            _this.users.splice(index, 1);
            _this.changeCounter('members:count', +1);
            _this.changeCounter('requests:count', -1);
        });
    };
    GroupsProfileRequests.prototype.reject = function (user, index) {
        var _this = this;
        this.service.rejectRequest(this.group, user.guid)
            .then(function () {
            _this.users.splice(index, 1);
            _this.changeCounter('requests:count', -1);
        });
    };
    GroupsProfileRequests.prototype.changeCounter = function (counter, val) {
        if (val === void 0) { val = 0; }
        if (typeof this.group[counter] !== 'undefined') {
            this.group[counter] = parseInt(this.group[counter], 10) + val;
        }
    };
    GroupsProfileRequests = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-profile-requests',
            inputs: ['_group : group'],
            templateUrl: 'requests.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, groups_service_1.GroupsService])
    ], GroupsProfileRequests);
    return GroupsProfileRequests;
}());
exports.GroupsProfileRequests = GroupsProfileRequests;
//# sourceMappingURL=requests.js.map