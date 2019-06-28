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
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var list_options_1 = require("../../../services/list-options");
var ReportCreatorComponent = /** @class */ (function () {
    function ReportCreatorComponent(session, _changeDetectorRef, overlayModal, client) {
        this.session = session;
        this._changeDetectorRef = _changeDetectorRef;
        this.overlayModal = overlayModal;
        this.client = client;
        this.subject = 0;
        this.note = '';
        this.guid = '';
        this.initialized = false;
        this.inProgress = false;
        this.success = false;
        this.error = '';
        this.subjects = list_options_1.REASONS;
        this.next = false;
    }
    Object.defineProperty(ReportCreatorComponent.prototype, "data", {
        set: function (object) {
            this.guid = object ? object.guid : null;
        },
        enumerable: true,
        configurable: true
    });
    ReportCreatorComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectorRef.detectChanges();
    };
    /**
     * Validates if the report can be submitted using the current settings
     */
    ReportCreatorComponent.prototype.validate = function () {
        if (!this.subject) {
            return false;
            //throw new Error('You cannot report this.');
        }
        return true;
    };
    /**
     * Checks if the user can submit using the current settings
     */
    ReportCreatorComponent.prototype.canSubmit = function () {
        try {
            return this.validate();
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Shows visible report errors
     */
    ReportCreatorComponent.prototype.showErrors = function () {
        this.error = '';
        try {
            this.validate();
        }
        catch (e) {
            this.error = e.message;
        }
    };
    ReportCreatorComponent.prototype.onSelectionChange = function (item) {
        this.subject = item.value;
    };
    ReportCreatorComponent.prototype.close = function () {
        this.overlayModal.dismiss();
    };
    /**
     * Submits the report to the appropiate server endpoint using the current settings
     */
    ReportCreatorComponent.prototype.submit = function () {
        var _this = this;
        var guid = this.guid;
        var subject = this.subject;
        var note = this.note;
        this.inProgress = true;
        this.client.post("api/v1/entities/report/" + guid, { subject: subject, note: note })
            .then(function (response) {
            _this.inProgress = false;
            if (response.done) {
                _this.success = true;
            }
            else {
                _this.overlayModal.dismiss();
                alert('There was an error sending your report.');
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
            //this.overlayModal.dismiss();
            alert(e.message ? e.message : e);
        });
    };
    __decorate([
        core_1.Input('object'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ReportCreatorComponent.prototype, "data", null);
    ReportCreatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-report--creator',
            templateUrl: 'creator.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            core_1.ChangeDetectorRef,
            overlay_modal_1.OverlayModalService,
            api_1.Client])
    ], ReportCreatorComponent);
    return ReportCreatorComponent;
}());
exports.ReportCreatorComponent = ReportCreatorComponent;
//# sourceMappingURL=creator.component.js.map