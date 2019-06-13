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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var attachment_1 = require("../../../../services/attachment");
var MediaGridComponent = /** @class */ (function () {
    function MediaGridComponent(session, client, attachment) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this.object = {};
        this.items = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
    }
    Object.defineProperty(MediaGridComponent.prototype, "_object", {
        set: function (value) {
            this.object = value;
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    MediaGridComponent.prototype.load = function () {
        var self = this;
        if (this.inProgress)
            return;
        this.inProgress = true;
        this.client.get('api/v1/media/albums/' + this.object.guid, { offset: this.offset })
            .then(function (response) {
            if (!response.entities || response.entities.length === 0) {
                self.inProgress = false;
                self.moreData = false;
                return false;
            }
            self.items = self.items.concat(response.entities);
            self.offset = response['load-next'];
            self.inProgress = false;
        });
    };
    MediaGridComponent = __decorate([
        core_1.Component({
            selector: 'm-media--grid',
            inputs: ['_object: object'],
            template: "\n    <a *ngFor=\"let item of items\"\n    [routerLink]=\"['/media', item.guid]\"\n    [ngClass]=\"{ 'm-mature-thumbnail': attachment.shouldBeBlurred(item) }\"\n    >\n      <img src=\"/fs/v1/thumbnail/{{item.guid}}/large\" />\n      <span class=\"material-icons\" [hidden]=\"item.subtype !='video'\">play_circle_outline</span>\n      <i class=\"material-icons\">explicit</i>\n    </a>\n    <infinite-scroll\n        distance=\"25%\"\n        (load)=\"load()\"\n        [moreData]=\"moreData\"\n        [inProgress]=\"inProgress\"\n        style=\"width:100%\">\n    </infinite-scroll>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, attachment_1.AttachmentService])
    ], MediaGridComponent);
    return MediaGridComponent;
}());
exports.MediaGridComponent = MediaGridComponent;
//# sourceMappingURL=grid.component.js.map