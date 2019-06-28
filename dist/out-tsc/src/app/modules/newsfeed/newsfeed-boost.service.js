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
var session_1 = require("../../services/session");
var client_1 = require("../../services/api/client");
var NewsfeedBoostService = /** @class */ (function () {
    function NewsfeedBoostService(session, client) {
        this.session = session;
        this.client = client;
        this.explicitChanged = new core_1.EventEmitter();
        this.enableChanged = new core_1.EventEmitter();
        this.pauseChanged = new core_1.EventEmitter();
        this.enabled = true;
        this.paused = false;
        this.rating = 2; //default to Safe Mode Off
        if (this.session.getLoggedInUser().plus && this.session.getLoggedInUser().disabled_boost) {
            this.enabled = false;
        }
        this.paused = !session.getLoggedInUser().boost_autorotate;
    }
    NewsfeedBoostService.prototype.getBoostRating = function () {
        return this.rating;
    };
    NewsfeedBoostService.prototype.isBoostEnabled = function () {
        return this.enabled;
    };
    NewsfeedBoostService.prototype.isBoostPaused = function () {
        return this.paused;
    };
    NewsfeedBoostService.prototype.setExplicit = function (active) {
        var _this = this;
        this.session.getLoggedInUser().mature = active;
        this.explicitChanged.emit(active);
        this.client.post('api/v1/settings/' + this.session.getLoggedInUser().guid, {
            mature: active,
            boost_rating: this.rating
        }).catch(function (e) {
            window.Opspot.user.mature = !active;
            _this.explicitChanged.emit(!active);
        });
    };
    NewsfeedBoostService.prototype.togglePause = function () {
        this.paused = !this.paused;
        this.client.post('api/v1/settings', { boost_autorotate: !this.paused });
        this.pauseChanged.emit(this.paused);
    };
    NewsfeedBoostService.prototype.hideBoost = function () {
        var _this = this;
        this.session.getLoggedInUser().disabled_boost = true;
        this.enabled = false;
        this.enableChanged.emit(this.enabled);
        this.client.put('api/v1/plus/boost')
            .catch(function () {
            _this.session.getLoggedInUser().disabled_boost = false;
            _this.enabled = true;
            _this.enableChanged.emit(_this.enabled);
        });
    };
    NewsfeedBoostService.prototype.showBoost = function () {
        var _this = this;
        this.session.getLoggedInUser().disabled_boost = false;
        this.enabled = true;
        this.enableChanged.emit(this.enabled);
        this.client.delete('api/v1/plus/boost')
            .catch(function () {
            _this.session.getLoggedInUser().disabled_boost = true;
            _this.enabled = false;
            _this.enableChanged.emit(_this.enabled);
        });
    };
    NewsfeedBoostService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client])
    ], NewsfeedBoostService);
    return NewsfeedBoostService;
}());
exports.NewsfeedBoostService = NewsfeedBoostService;
//# sourceMappingURL=newsfeed-boost.service.js.map