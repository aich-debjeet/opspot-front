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
var GroupsMembersModuleComponent = /** @class */ (function () {
    function GroupsMembersModuleComponent(client) {
        this.client = client;
        this.members = [];
        this.limit = 21;
        this.inProgress = false;
    }
    Object.defineProperty(GroupsMembersModuleComponent.prototype, "_group", {
        set: function (value) {
            this.group = value;
            this.load();
            this.el.nativeElement.scrollIntoView();
        },
        enumerable: true,
        configurable: true
    });
    GroupsMembersModuleComponent.prototype.load = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get("api/v1/groups/membership/" + this.group.guid, { limit: this.limit })
            .then(function (response) {
            if (!response.members) {
                return false;
            }
            _this.members = response.members;
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    __decorate([
        core_1.ViewChild('el'),
        __metadata("design:type", Object)
    ], GroupsMembersModuleComponent.prototype, "el", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GroupsMembersModuleComponent.prototype, "linksTo", void 0);
    __decorate([
        core_1.Input('group'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GroupsMembersModuleComponent.prototype, "_group", null);
    GroupsMembersModuleComponent = __decorate([
        core_1.Component({
            selector: 'm-group--members-module',
            host: {
                'class': 'm-group--members mdl-card mdl-shadow--2dp',
                '[hidden]': 'members.length == 0'
            },
            templateUrl: 'members.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], GroupsMembersModuleComponent);
    return GroupsMembersModuleComponent;
}());
exports.GroupsMembersModuleComponent = GroupsMembersModuleComponent;
//# sourceMappingURL=members.js.map