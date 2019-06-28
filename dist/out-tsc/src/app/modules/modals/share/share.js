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
var session_1 = require("../../../services/session");
var embed_1 = require("../../../services/embed");
var ShareModal = /** @class */ (function () {
    function ShareModal(session, embed) {
        this.session = session;
        this.embed = embed;
        this.open = false;
        this.closed = new core_1.EventEmitter();
        this.url = '';
        this.encodedUrl = '';
        this.embedCode = '';
    }
    Object.defineProperty(ShareModal.prototype, "_url", {
        set: function (value) {
            this.url = value;
            this.encodedUrl = encodeURI(this.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareModal.prototype, "_embed", {
        set: function (object) {
            this.embedCode = this.embed.getIframeFromObject(object);
        },
        enumerable: true,
        configurable: true
    });
    ShareModal.prototype.close = function (e) {
        this.open = false;
        this.closed.next(true);
    };
    ShareModal.prototype.copy = function (e) {
        e.target.select();
        document.execCommand('copy');
    };
    ShareModal.prototype.openWindow = function (url) {
        window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
    };
    ShareModal = __decorate([
        core_1.Component({
            selector: 'm-modal-share',
            inputs: ['open', '_url: url', '_embed: embed'],
            outputs: ['closed'],
            template: "\n    <m-modal [open]=\"open\" (closed)=\"close($event)\">\n\n      <div class=\"mdl-card__supporting-text\">\n        <input class=\"\" value=\"{{url}}\" (click)=\"copy($event)\"/>\n\n      </div>\n\n      <div class=\"m-social-share-buttons\">\n        <button class=\"mdl-button mdl-button--raised mdl-color-text--white m-social-share-fb\"\n          (click)=\"openWindow('https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '&display=popup&ref=plugin&src=share_button')\">\n          <ng-container i18n=\"@@MODALS__SHARE__ON_FACEBOOK\">Share on Facebook</ng-container>\n        </button>\n        <button class=\"mdl-button mdl-button--raised mdl-color-text--white m-social-share-twitter\"\n          (click)=\"openWindow('https://twitter.com/intent/tweet?text=Shared%20via%20Opspot.com&tw_p=tweetbutton&url=' + encodedUrl)\">\n          <ng-container i18n=\"@@MODALS__SHARE__ON_TWITTER\">Share on Twitter</ng-container>\n        </button>\n      </div>\n\n      <div class=\"m-modal-share-embed\" *ngIf=\"embedCode\">\n        <span class=\"m-modal-share-embed__label mdl-color-text--blue-grey-300\">\n          <ng-container i18n=\"@@M__COMMON__EMBED_INTO_WEBSITE\">Embed into your website:</ng-container>\n        </span>\n        <div>\n          <textarea (click)=\"copy($event)\" readonly>{{ embedCode }}</textarea>\n        </div>\n      </div>\n\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, embed_1.EmbedService])
    ], ShareModal);
    return ShareModal;
}());
exports.ShareModal = ShareModal;
//# sourceMappingURL=share.js.map