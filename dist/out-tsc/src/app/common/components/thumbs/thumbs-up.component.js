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
var api_1 = require("../../../services/api");
var wallet_1 = require("../../../services/wallet");
var service_1 = require("../../../modules/modals/signup/service");
var ThumbsUpButton = /** @class */ (function () {
    function ThumbsUpButton(session, client, wallet, modal, cd) {
        this.session = session;
        this.client = client;
        this.wallet = wallet;
        this.modal = modal;
        this.cd = cd;
        this.changesDetected = false;
        this.object = {
            'guid': null,
            'owner_guid': null,
            'thumbs:up:user_guids': []
        };
        this.showModal = false;
    }
    Object.defineProperty(ThumbsUpButton.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            this.object = value;
            if (!this.object['thumbs:up:user_guids'])
                this.object['thumbs:up:user_guids'] = [];
        },
        enumerable: true,
        configurable: true
    });
    ThumbsUpButton.prototype.thumb = function () {
        if (!this.session.isLoggedIn()) {
            this.modal.setSubtitle('You need to have a channel to vote').open();
            this.showModal = true;
            return false;
        }
        this.client.put('api/v1/thumbs/' + this.object.guid + '/up', {});
        if (!this.has()) {
            //this.object['thumbs:up:user_guids'].push(this.session.getLoggedInUser().guid);
            this.object['thumbs:up:user_guids'] = [this.session.getLoggedInUser().guid];
            this.object['thumbs:up:count']++;
        }
        else {
            for (var key in this.object['thumbs:up:user_guids']) {
                if (this.object['thumbs:up:user_guids'][key] === this.session.getLoggedInUser().guid)
                    delete this.object['thumbs:up:user_guids'][key];
            }
            this.object['thumbs:up:count']--;
        }
    };
    ThumbsUpButton.prototype.has = function () {
        for (var _i = 0, _a = this.object['thumbs:up:user_guids']; _i < _a.length; _i++) {
            var guid = _a[_i];
            if (guid === this.session.getLoggedInUser().guid)
                return true;
        }
        return false;
    };
    ThumbsUpButton.prototype.ngOnChanges = function (changes) {
    };
    ThumbsUpButton.prototype.ngDoCheck = function () {
        this.changesDetected = false;
        if (this.object['thumbs:up:count'] != this.object['thumbs:up:count:old']) {
            this.object['thumbs:up:count:old'] = this.object['thumbs:up:count'];
            this.changesDetected = true;
        }
        if (this.changesDetected) {
            this.cd.detectChanges();
        }
    };
    ThumbsUpButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-thumbs-up',
            inputs: ['_object: object'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <a class=\"mdl-color-text--blue-grey-500\" (click)=\"thumb()\" [ngClass]=\"{'selected': has() }\">\n      <span class=\"icon-ops-spot\"></span>\n      <span class=\"opspot-counter\" *ngIf=\"object['thumbs:up:count'] > 0\">{{object['thumbs:up:count'] | number}}</span>\n    </a>\n  ",
            styles: ["\n      a {\n          cursor: pointer;\n      }\n  "],
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            wallet_1.WalletService,
            service_1.SignupModalService,
            core_1.ChangeDetectorRef])
    ], ThumbsUpButton);
    return ThumbsUpButton;
}());
exports.ThumbsUpButton = ThumbsUpButton;
//# sourceMappingURL=thumbs-up.component.js.map