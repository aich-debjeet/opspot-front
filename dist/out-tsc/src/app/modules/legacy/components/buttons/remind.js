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
var session_1 = require("../../../../services/session");
var api_1 = require("../../../../services/api");
var service_1 = require("../../../../modules/modals/signup/service");
// had forwardRef(() => RemindComposerModal)
var RemindButton = /** @class */ (function () {
    function RemindButton(session, client, modal) {
        this.session = session;
        this.client = client;
        this.modal = modal;
        this.showModal = false;
        this.message = '';
        this.remindOpen = false;
    }
    Object.defineProperty(RemindButton.prototype, "_object", {
        set: function (value) {
            this.object = value;
        },
        enumerable: true,
        configurable: true
    });
    RemindButton.prototype.remind = function () {
        var self = this;
        if (this.object.reminded)
            return false;
        if (!this.session.isLoggedIn()) {
            this.modal.open();
            return false;
        }
        this.remindOpen = true;
    };
    RemindButton.prototype.send = function ($event) {
        var _this = this;
        if ($event.message) {
            this.message = $event.message;
        }
        this.object.reminded = true;
        this.object.reminds++;
        this.client.post('api/v2/newsfeed/remind/' + this.object.guid, {
            message: this.message
        })
            .catch(function (e) {
            _this.object.reminded = false;
            _this.object.reminds--;
        });
    };
    RemindButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-remind',
            inputs: ['_object: object'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <a class=\"mdl-color-text--blue-grey-500\" (click)=\"remind()\" [ngClass]=\"{'selected': object.reminded }\">\n      <i class=\"material-icons\">repeat</i>\n      <span class=\"opspot-counter\" *ngIf=\"object.reminds > 0\">{{object.reminds | number}}</span>\n    </a>\n\n    <m-modal-remind-composer *ngIf=\"remindOpen\"\n    [object]=\"object\"\n    [open]=\"true\"\n    [default]=\"message\"\n    (closed)=\"remindOpen = false\"\n    (post)=\"send($event)\"\n    ></m-modal-remind-composer>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, service_1.SignupModalService])
    ], RemindButton);
    return RemindButton;
}());
exports.RemindButton = RemindButton;
//# sourceMappingURL=remind.js.map