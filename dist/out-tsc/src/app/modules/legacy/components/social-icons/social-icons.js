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
var embed_1 = require("../../../../services/embed");
var SocialIcons = /** @class */ (function () {
    function SocialIcons(embed) {
        this.embed = embed;
        this.url = '';
        this.title = 'Shared via Opspot.com';
        this.encodedUrl = '';
        this.encodedTitle = 'Shared%20via%20Opspot.com';
        this.embedCode = '';
        this.embedModalOpen = false;
        this.embedModalClosed = new core_1.EventEmitter();
    }
    Object.defineProperty(SocialIcons.prototype, "_url", {
        set: function (value) {
            this.url = value;
            this.encodedUrl = encodeURI(this.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocialIcons.prototype, "_title", {
        set: function (value) {
            this.title = value;
            this.encodedTitle = encodeURI(this.title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocialIcons.prototype, "_embed", {
        set: function (object) {
            this.embedCode = this.embed.getIframeFromObject(object);
        },
        enumerable: true,
        configurable: true
    });
    SocialIcons.prototype.copy = function (e) {
        e.target.select();
        document.execCommand('copy');
    };
    SocialIcons.prototype.openWindow = function (url) {
        window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
    };
    SocialIcons.prototype.embedModalClose = function () {
        this.embedModalOpen = false;
        this.embedModalClosed.next(true);
    };
    SocialIcons = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-social-icons',
            inputs: ['_url: url', '_title: title', '_embed: embed'],
            templateUrl: 'social-icons.html'
        }),
        __metadata("design:paramtypes", [embed_1.EmbedService])
    ], SocialIcons);
    return SocialIcons;
}());
exports.SocialIcons = SocialIcons;
//# sourceMappingURL=social-icons.js.map