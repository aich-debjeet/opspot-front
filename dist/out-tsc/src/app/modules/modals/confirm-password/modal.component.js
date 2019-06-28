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
var forms_1 = require("@angular/forms");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var ConfirmPasswordModalComponent = /** @class */ (function () {
    function ConfirmPasswordModalComponent(session, cd, overlayModal, client, fb) {
        this.session = session;
        this.cd = cd;
        this.overlayModal = overlayModal;
        this.client = client;
        this.fb = fb;
        this.opspot = window.Opspot;
        this.success = false;
        this.criticalError = false;
        this.error = '';
        this.inProgress = false;
        this.form = fb.group({
            password: ['', forms_1.Validators.required]
        });
    }
    Object.defineProperty(ConfirmPasswordModalComponent.prototype, "opts", {
        set: function (opts) {
            this._opts = opts;
        },
        enumerable: true,
        configurable: true
    });
    ConfirmPasswordModalComponent.prototype.validate = function () {
        if (!this.form.value.password) {
            throw new Error('Password should be set.');
        }
    };
    ConfirmPasswordModalComponent.prototype.canSubmit = function () {
        try {
            this.validate();
            return true;
        }
        catch (e) {
        }
        return false;
    };
    ConfirmPasswordModalComponent.prototype.showErrors = function () {
        if (!this.submitted) {
            this.error = '';
        }
        try {
            this.validate();
        }
        catch (e) {
            if (e.visible) {
                this.error = e.message;
            }
        }
    };
    ConfirmPasswordModalComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.inProgress) {
                            return [2 /*return*/];
                        }
                        if (!this.canSubmit()) {
                            this.showErrors();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.inProgress = true;
                        this.submitted = true;
                        this.error = '';
                        return [4 /*yield*/, this.client.post('api/v2/settings/password/validate', { 'password': this.form.value.password })];
                    case 2:
                        _a.sent();
                        if (this._opts && this._opts.onComplete) {
                            this._opts.onComplete({
                                password: this.form.value.password
                            });
                            this.overlayModal.dismiss();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.inProgress = false;
                        if (e_1.status === 'failed') {
                            this.error = 'LoginException::AuthenticationFailed';
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConfirmPasswordModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-confirm-password--modal',
            templateUrl: 'modal.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            core_1.ChangeDetectorRef,
            overlay_modal_1.OverlayModalService,
            api_1.Client,
            forms_1.FormBuilder])
    ], ConfirmPasswordModalComponent);
    return ConfirmPasswordModalComponent;
}());
exports.ConfirmPasswordModalComponent = ConfirmPasswordModalComponent;
//# sourceMappingURL=modal.component.js.map