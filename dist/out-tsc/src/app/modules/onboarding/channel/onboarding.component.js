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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dynamic_host_directive_1 = require("../../../common/directives/dynamic-host.directive");
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var onboarding_service_1 = require("./onboarding.service");
var ChannelOnboardingComponent = /** @class */ (function () {
    function ChannelOnboardingComponent(client, cd, session, router, service, _componentFactoryResolver) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.service = service;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.opspot = window.Opspot;
        this.inProgress = false;
    }
    ChannelOnboardingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.closeSubscription = this.service.onClose.subscribe(function () {
            _this.onClose();
        });
        this.service.onSlideChanged.subscribe(function () {
            _this.loadSlide();
        });
        this.loadSlide();
    };
    ChannelOnboardingComponent.prototype.ngOnDestroy = function () {
        this.closeSubscription.unsubscribe();
    };
    ChannelOnboardingComponent.prototype.loadSlide = function () {
        var _this = this;
        var viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        if (!this.service.slide) {
            return;
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.service.slide);
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.pendingItems = this.service.pendingItems || [this.service.slide.items];
        if (componentRef.instance.onClose) {
            componentRef.instance.onClose.subscribe(function (next) {
                _this.service.next();
                _this.loadSlide();
                _this.detectChanges();
            });
        }
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
    };
    ChannelOnboardingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    ChannelOnboardingComponent.prototype.onClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('api/v2/onboarding/onboarding_shown')];
                    case 1:
                        response = _a.sent();
                        this.service.onClose.emit();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", Object)
    ], ChannelOnboardingComponent.prototype, "host", void 0);
    ChannelOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--onboarding',
            template: "\n    <m-modal \n      [open]=\"true\"\n      [allowClose]=\"service.slide.canSkip\"\n      (closed)=\"onClose()\"\n      class=\"m-channel--onboarding\"\n    >\n      <div class=\"m-channelOnboarding__logo\">\n        <img [src]=\"opspot.cdn_assets_url + 'assets/logos/bulb.svg'\"/>\n      </div>\n      <ng-template dynamic-host></ng-template>\n\n      <div class=\"m-channelOnboarding__buttons\" *ngIf=\"service.currentSlide > 0\">\n        <div class=\"m-channelOnboarding__previous\" (click)=\"service.previous()\">\n          Previous\n        </div>\n        <div class=\"m-channelOnboarding__next\" *ngIf=\"service.currentSlide +1 < service.slides.length\"\n             (click)=\"service.next()\">\n          Next\n        </div>\n        <div class=\"m-channelOnboarding__next\" *ngIf=\"service.currentSlide +1 === service.slides.length\"\n            (click)=\"service.next()\">\n          Finish\n        </div>\n      </div>\n    </m-modal>\n  ",
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router,
            onboarding_service_1.ChannelOnboardingService,
            core_1.ComponentFactoryResolver])
    ], ChannelOnboardingComponent);
    return ChannelOnboardingComponent;
}());
exports.ChannelOnboardingComponent = ChannelOnboardingComponent;
//# sourceMappingURL=onboarding.component.js.map