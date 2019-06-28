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
var api_1 = require("../../../../../services/api");
var session_1 = require("../../../../../services/session");
var attachment_1 = require("../../../../../services/attachment");
var Remind = /** @class */ (function () {
    function Remind(session, client, attachment, changeDetectorRef) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this.changeDetectorRef = changeDetectorRef;
        this.opspot = window.Opspot;
        this.boosted = false;
        this.editing = false;
        this.commentsToggle = false;
        this.showBoostOptions = false;
        this.translateEvent = new core_1.EventEmitter();
        this.childEventsEmitter = new core_1.EventEmitter();
        this.isTranslatable = false;
        this.menuOptions = [];
        this.canDelete = false;
        this.hideTabs = true;
    }
    Object.defineProperty(Remind.prototype, "_events", {
        set: function (value) {
            var _this = this;
            if (this.eventsSubscription) {
                this.eventsSubscription.unsubscribe();
            }
            this.events = value;
            this.eventsSubscription = this.events.subscribe(function (_a) {
                var action = _a.action, _b = _a.args, args = _b === void 0 ? [] : _b;
                switch (action) {
                    case 'translate':
                        _this.translate.apply(_this, args);
                        break;
                }
                _this.changeDetectorRef.markForCheck();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Remind.prototype, "object", {
        set: function (value) {
            this.activity = value;
            this.activity.boosted = this.boosted;
            if (this.activity.custom_type == 'batch'
                && this.activity.custom_data
                && this.activity.custom_data[0].src) {
                this.activity.custom_data[0].src = this.activity.custom_data[0].src.replace(this.opspot.site_url, this.opspot.cdn_url);
            }
        },
        enumerable: true,
        configurable: true
    });
    Remind.prototype.getOwnerIconTime = function () {
        var session = this.session.getLoggedInUser();
        if (session && session.guid === this.activity.ownerObj.guid) {
            return session.icontime;
        }
        else {
            return this.activity.ownerObj.icontime;
        }
    };
    Remind.prototype.ngOnDestroy = function () {
        if (this.eventsSubscription) {
            this.eventsSubscription.unsubscribe();
        }
    };
    Remind.prototype.toDate = function (timestamp) {
        return new Date(timestamp * 1000);
    };
    Remind.prototype.translate = function ($event) {
        this.translateEvent.emit($event);
    };
    Remind.prototype.propagateTranslation = function (e) {
        return;
    };
    Remind.prototype.save = function () { };
    Remind.prototype.openComments = function () { };
    Remind.prototype.showBoost = function () { };
    Remind.prototype.showWire = function () { };
    Remind.prototype.togglePin = function () { };
    Remind.prototype.menuOptionSelected = function (e) { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Remind.prototype, "boosted", void 0);
    Remind = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-remind',
            inputs: ['object', '_events: events'],
            templateUrl: '../activity/activity.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            attachment_1.AttachmentService,
            core_1.ChangeDetectorRef])
    ], Remind);
    return Remind;
}());
exports.Remind = Remind;
//# sourceMappingURL=remind.js.map