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
var client_1 = require("../../../../services/api/client");
var WelcomeOnboardingComponent = /** @class */ (function () {
    function WelcomeOnboardingComponent(client) {
        this.client = client;
        this.opspot = window.Opspot;
        this.onClose = new core_1.EventEmitter();
    }
    WelcomeOnboardingComponent.prototype.select = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('api/v2/onboarding/creator_frequency', { value: option })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.onClose.emit();
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeOnboardingComponent.items = ['creator_frequency'];
    WelcomeOnboardingComponent.canSkip = false;
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WelcomeOnboardingComponent.prototype, "onClose", void 0);
    WelcomeOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-onboarding--welcome',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n      <h2>Welcome to Opspot!</h2>\n      <div class=\"m-channelOnboardingSlide__column\">\n        <p class=\"m-channelOnboardingSlide__subtext\">\n          Before you get started, there are a few things we need to know to provide\n          you with the best experience.\n        </p>\n        <p class=\"m-channelOnboardingSlide__subtext\">\n          First off, how often do you post to social media?\n        </p>\n      </div>\n      <div class=\"m-channelOnboardingSlide__column\">\n        <ul class=\"m-channelOnboardingSlide__frequency\">\n          <li (click)=\"select('rarely')\">\n            Rarely\n            <i class=\"material-icons\">\n              keyboard_arrow_right\n            </i>\n          </li>\n          <li (click)=\"select('sometimes')\">\n            Sometimes\n            <i class=\"material-icons\">\n              keyboard_arrow_right\n            </i>\n          </li>\n          <li (click)=\"select('frequently')\">\n            Frequently\n            <i class=\"material-icons\">\n              keyboard_arrow_right\n            </i>\n          </li>\n        </ul>\n      </div>\n\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [client_1.Client])
    ], WelcomeOnboardingComponent);
    return WelcomeOnboardingComponent;
}());
exports.WelcomeOnboardingComponent = WelcomeOnboardingComponent;
//# sourceMappingURL=welcome.component.js.map