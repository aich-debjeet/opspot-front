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
var groups_service_1 = require("../groups-service");
var title_1 = require("../../../services/ux/title");
var session_1 = require("../../../services/session");
var GroupsCreator = /** @class */ (function () {
    function GroupsCreator(session, service, router, title) {
        this.session = session;
        this.service = service;
        this.router = router;
        this.title = title;
        this.opspot = window.Opspot;
        this.banner = false;
        this.avatar = false;
        this.group = {
            name: '',
            description: '',
            membership: 2,
            tags: '',
            invitees: '',
            moderated: 0,
            default_view: 0
        };
        this.invitees = [];
        this.editing = true;
        this.editDone = false;
        this.inProgress = false;
        this.title.setTitle('Create Group');
    }
    GroupsCreator.prototype.addBanner = function (banner) {
        this.banner = banner.file;
        this.group.banner_position = banner.top;
    };
    GroupsCreator.prototype.addAvatar = function (avatar) {
        this.avatar = avatar;
    };
    GroupsCreator.prototype.membershipChange = function (value) {
        this.group.membership = value;
    };
    GroupsCreator.prototype.invite = function (user) {
        for (var _i = 0, _a = this.invitees; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.guid === user.guid)
                return;
        }
        this.invitees.push(user);
    };
    GroupsCreator.prototype.removeInvitee = function (i) {
        this.invitees.splice(i, 1);
    };
    GroupsCreator.prototype.keyDown = function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
    };
    GroupsCreator.prototype.save = function (e) {
        var _this = this;
        if (!this.group.name) {
            return;
        }
        this.editing = false;
        this.editDone = true;
        this.inProgress = true;
        this.group.invitees = this.invitees.map(function (user) {
            return user.guid;
        });
        this.service.save(this.group)
            .then(function (guid) {
            _this.service.upload({
                guid: guid,
                banner_position: _this.group.banner_position
            }, {
                banner: _this.banner,
                avatar: _this.avatar
            })
                .then(function () {
                _this.router.navigate(['/groups/profile', guid]);
            });
        })
            .catch(function (e) {
            _this.editing = true;
            _this.inProgress = false;
        });
    };
    GroupsCreator.prototype.onTagsChange = function (tags) {
    };
    GroupsCreator.prototype.onTagsAdded = function (tags) {
        if (!this.group.tags)
            this.group.tags = [];
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            this.group.tags.push(tag.value);
        }
    };
    GroupsCreator.prototype.onTagsRemoved = function (tags) {
        for (var _i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
            var tag = tags_2[_i];
            for (var i in this.group.tags) {
                console.log(this.group.tags[i]);
                if (this.group.tags[i] == tag.value) {
                    this.group.tags.splice(i, 1);
                }
            }
        }
    };
    GroupsCreator = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-create',
            host: {
                '(keydown)': 'keyDown($event)'
            },
            templateUrl: 'create.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, groups_service_1.GroupsService, router_1.Router, title_1.OpspotTitle])
    ], GroupsCreator);
    return GroupsCreator;
}());
exports.GroupsCreator = GroupsCreator;
//# sourceMappingURL=create.js.map