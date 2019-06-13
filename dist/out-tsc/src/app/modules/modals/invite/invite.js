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
var InviteModal = /** @class */ (function () {
    function InviteModal(session) {
        this.session = session;
        this.open = false;
        this.closed = new core_1.EventEmitter();
        this.url = '';
        this.encodedUrl = '';
        this.embedCode = '';
        this.user = window.Opspot.user;
    }
    InviteModal.prototype.ngOnInit = function () {
        this.url = window.Opspot.site_url + 'register?referrer=' + this.session.getLoggedInUser().username;
        this.encodedUrl = encodeURI(this.url);
    };
    InviteModal.prototype.close = function (e) {
        this.open = false;
        this.closed.next(true);
    };
    InviteModal.prototype.copy = function (e) {
        e.target.select();
        document.execCommand('copy');
    };
    InviteModal.prototype.openWindow = function (url) {
        window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
    };
    InviteModal.prototype.openEmail = function () {
        window.location.href = 'mailto:?subject=Join%20me%20on%20opspot&body=Join me on Opspot ' + this.encodedUrl;
    };
    InviteModal = __decorate([
        core_1.Component({
            selector: 'm-modal-invite',
            inputs: ['open'],
            outputs: ['closed'],
            template: "\n    <m-modal [open]=\"open\" (closed)=\"close($event)\">\n\n      <div class=\"mdl-card__supporting-text\">\n        <ng-container i18n=\"@@MODALS__INVITE__DESCRIPTION\">Send the link below to your contacts to earn tokens for your referrals:</ng-container>\n      </div>\n\n      <div class=\"mdl-card__supporting-text\">\n        <input class=\"\" value=\"{{url}}\" (focus)=\"copy($event)\" (click)=\"copy($event)\" autofocus/>\n      </div>\n\n      <div class=\"mdl-card__supporting-text\">\n        <ng-container i18n=\"@@MODALS__INVITE__DESCRIPTION\">Add this code to the end of any Opspot link you share and earn tokens for signups within 24 hours:</ng-container>\n      </div>\n\n      <div class=\"mdl-card__supporting-text\">\n        <input class=\"\" value=\"?referrer={{user.username}}\" (focus)=\"copy($event)\" (click)=\"copy($event)\" autofocus/>\n      </div>\n\n      <div class=\"m-social-share-buttons\">\n        <button class=\"mdl-button mdl-button--raised mdl-color-text--white m-social-share-fb\"\n          (click)=\"openWindow('https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '&display=popup&ref=plugin&src=share_button')\">\n          <ng-container i18n=\"@@M__NAMES__FACEBOOK\">Facebook</ng-container>\n        </button>\n        <button class=\"mdl-button mdl-button--raised mdl-color-text--white m-social-share-twitter\"\n          (click)=\"openWindow('https://twitter.com/intent/tweet?text=Join%20me%20on%20Opspot&tw_p=tweetbutton&url=' + encodedUrl)\">\n          <ng-container i18n=\"@@M__NAMES__TWITTER\">Twitter</ng-container>\n        </button>\n        <button class=\"mdl-button mdl-button--raised mdl-color-text--white m-social-share-email\" (click)=\"openEmail()\">\n          <ng-container i18n=\"@@M__COMMON__EMAIL\">Email</ng-container>\n        </button>\n      </div>\n\n\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], InviteModal);
    return InviteModal;
}());
exports.InviteModal = InviteModal;
//# sourceMappingURL=invite.js.map