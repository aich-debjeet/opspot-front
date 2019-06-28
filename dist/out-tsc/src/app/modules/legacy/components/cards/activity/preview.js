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
var ActivityPreview = /** @class */ (function () {
    function ActivityPreview(session, client, attachment, _changeDetectorRef) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this._changeDetectorRef = _changeDetectorRef;
        this.opspot = window.Opspot;
        this.editing = false;
        this.commentsToggle = false;
        this.showBoostOptions = false;
        this.childEventsEmitter = new core_1.EventEmitter();
        this.isTranslatable = false;
        this.menuOptions = [];
        this.canDelete = false;
        this.hideTabs = true;
    }
    Object.defineProperty(ActivityPreview.prototype, "object", {
        set: function (value) {
            this.activity = value;
            if (this.activity.mature) {
                this.activity.mature_visibility = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    ActivityPreview.prototype.getOwnerIconTime = function () {
        var session = this.session.getLoggedInUser();
        if (session && session.guid === this.activity.ownerObj.guid) {
            return session.icontime;
        }
        else {
            return this.activity.ownerObj.icontime;
        }
    };
    ActivityPreview.prototype.toDate = function (timestamp) {
        return new Date(timestamp * 1000);
    };
    ActivityPreview.prototype.propagateTranslation = function (e) {
        return;
    };
    ActivityPreview.prototype.save = function () { };
    ActivityPreview.prototype.openComments = function () { };
    ActivityPreview.prototype.showBoost = function () { };
    ActivityPreview.prototype.showWire = function () { };
    ActivityPreview.prototype.togglePin = function () { };
    ActivityPreview.prototype.menuOptionSelected = function (e) { };
    ActivityPreview = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-activity-preview',
            inputs: ['object'],
            templateUrl: 'activity.html',
            host: {
                class: 'mdl-shadow--8dp'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, attachment_1.AttachmentService, core_1.ChangeDetectorRef])
    ], ActivityPreview);
    return ActivityPreview;
}());
exports.ActivityPreview = ActivityPreview;
//# sourceMappingURL=preview.js.map