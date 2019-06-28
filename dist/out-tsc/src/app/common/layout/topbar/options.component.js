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
var settings_service_1 = require("../../../modules/settings/settings.service");
var TopbarOptionsComponent = /** @class */ (function () {
    function TopbarOptionsComponent(session, settingsService) {
        this.session = session;
        this.settingsService = settingsService;
        this.options = ['rating'];
        this.change = new core_1.EventEmitter;
    }
    Object.defineProperty(TopbarOptionsComponent.prototype, "rating", {
        get: function () {
            return this.session.getLoggedInUser().boost_rating;
        },
        enumerable: true,
        configurable: true
    });
    TopbarOptionsComponent.prototype.toggleRating = function () {
        switch (this.rating) {
            case 1:
                this.settingsService.setRating(2);
                break;
            case 2:
            default:
                this.settingsService.setRating(1);
                break;
        }
        this.change.next({ rating: this.rating });
        event.stopPropagation();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TopbarOptionsComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TopbarOptionsComponent.prototype, "change", void 0);
    TopbarOptionsComponent = __decorate([
        core_1.Component({
            selector: 'm-topbar--navigation--options',
            templateUrl: 'options.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, settings_service_1.SettingsService])
    ], TopbarOptionsComponent);
    return TopbarOptionsComponent;
}());
exports.TopbarOptionsComponent = TopbarOptionsComponent;
//# sourceMappingURL=options.component.js.map