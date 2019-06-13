"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var common_1 = require("@angular/common");
var client_1 = require("../../../../services/api/client");
var BoostCreatorP2PSearchComponent = /** @class */ (function () {
    function BoostCreatorP2PSearchComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.boostChanged = new core_1.EventEmitter();
        this.rates = {
            balance: null,
            rate: 1,
            min: 250,
            cap: 5000,
            usd: 1000,
            tokens: 1000,
            minUsd: 1,
            priority: 1,
            maxCategories: 3
        };
        this.query = '';
        this.results = [];
        this.searching = false;
    }
    /**
     * Activates and sets focus on the target editor
     */
    BoostCreatorP2PSearchComponent.prototype.onFocus = function () {
        var _this = this;
        this.searching = true;
        this.cd.detectChanges();
        if (this.input.nativeElement) {
            setTimeout(function () { return _this.input.nativeElement.focus(); }, 100);
        }
    };
    /**
     * Deactivates the target editor
     */
    BoostCreatorP2PSearchComponent.prototype.onBlur = function () {
        this.searching = false;
    };
    /**
     * Searches the current target query on the server
     */
    BoostCreatorP2PSearchComponent.prototype.search = function () {
        var _this = this;
        if (this.throttle) {
            clearTimeout(this.throttle);
            this.throttle = void 0;
        }
        if (this.query.charAt(0) !== '@') {
            this.query = '@' + this.query;
        }
        var query = this.query;
        if (query.charAt(0) === '@') {
            query = query.substr(1);
        }
        if (!query || query.length <= 2) {
            this.results = [];
            return;
        }
        this.throttle = setTimeout(function () {
            _this.client.get("api/v2/search/suggest/user", {
                q: query,
                limit: 8,
                hydrate: 1
            })
                .then(function (_a) {
                var entities = _a.entities;
                if (!entities) {
                    return;
                }
                _this.results = entities;
            })
                .catch(function (e) { return console.error('Cannot load results', e); });
        });
    };
    /**
     * Sets the current target for a P2P boost
     */
    BoostCreatorP2PSearchComponent.prototype.setTarget = function (target, $event) {
        if ($event) {
            $event.preventDefault();
        }
        this.boost.target = __assign({}, target);
        this.results = [];
        this.query = '@' + target.username;
        this.boostChanged.emit(this.boost);
    };
    // Boost Pro
    BoostCreatorP2PSearchComponent.prototype.togglePostToFacebook = function () {
        this.boost.postToFacebook = !this.boost.postToFacebook;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorP2PSearchComponent.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BoostCreatorP2PSearchComponent.prototype, "boostChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorP2PSearchComponent.prototype, "rates", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], BoostCreatorP2PSearchComponent.prototype, "input", void 0);
    BoostCreatorP2PSearchComponent = __decorate([
        core_1.Component({
            providers: [common_1.CurrencyPipe],
            selector: 'm-boost--creator-p2p-search',
            templateUrl: 'p2p-search.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef])
    ], BoostCreatorP2PSearchComponent);
    return BoostCreatorP2PSearchComponent;
}());
exports.BoostCreatorP2PSearchComponent = BoostCreatorP2PSearchComponent;
//# sourceMappingURL=p2p-search.component.js.map