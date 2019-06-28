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
var attachment_1 = require("../../../services/attachment");
var ChannelModulesComponent = /** @class */ (function () {
    function ChannelModulesComponent(client, attachment) {
        this.client = client;
        this.attachment = attachment;
        this.items = [];
        this.type = 'all';
        this.limit = 9;
        this.inProgress = false;
        //this.load();
    }
    Object.defineProperty(ChannelModulesComponent.prototype, "_owner", {
        set: function (value) {
            this.owner = value;
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelModulesComponent.prototype, "_container", {
        set: function (value) {
            this.container = value;
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    ChannelModulesComponent.prototype.load = function () {
        var _this = this;
        this.inProgress = true;
        var containerType = this.owner ? 'owner' : 'container', guid = this.owner ? this.owner.guid : this.container.guid;
        var endpoint = "api/v1/entities/" + containerType + "/all/" + guid;
        switch (this.type) {
            case 'blog':
                endpoint = "api/v1/blog/" + containerType + "/" + guid;
                this.limit = 3;
                break;
            case 'video':
                endpoint = "api/v1/entities/" + containerType + "/video/" + guid;
                this.limit = 6;
                break;
            case 'image':
                endpoint = "api/v1/entities/" + containerType + "/image/" + guid;
                break;
        }
        this.client.get(endpoint, { limit: this.limit })
            .then(function (response) {
            var items = response.entities || response.blogs;
            if (!(items))
                return false;
            _this.items = items;
            _this.inProgress = false;
        })
            .catch(function (e) {
            this.inProgress = false;
        });
    };
    ChannelModulesComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--modules',
            inputs: ['type', '_owner: owner', '_container: container', 'limit', 'linksTo'],
            host: {
                'class': 'mdl-card m-border',
                '[hidden]': 'items.length == 0'
            },
            templateUrl: 'modules.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, attachment_1.AttachmentService])
    ], ChannelModulesComponent);
    return ChannelModulesComponent;
}());
exports.ChannelModulesComponent = ChannelModulesComponent;
//# sourceMappingURL=modules.js.map