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
var storage_1 = require("../../../services/storage");
var webtorrent_service_1 = require("../../webtorrent/webtorrent.service");
var client_1 = require("../../../services/api/client");
var SettingsP2PMediaComponent = /** @class */ (function () {
    function SettingsP2PMediaComponent(cd, storage, webtorrent, client) {
        this.cd = cd;
        this.storage = storage;
        this.webtorrent = webtorrent;
        this.client = client;
        this.settings = {
            enableP2p: false,
        };
        this.supported = true;
        this.changed = false;
    }
    SettingsP2PMediaComponent.prototype.ngOnInit = function () {
        this.supported = this.webtorrent.isBrowserSupported();
        this.settings.enableP2p = window.Opspot.user.p2p_media_enabled;
    };
    SettingsP2PMediaComponent.prototype.change = function () {
        this.changed = true;
    };
    SettingsP2PMediaComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.Opspot.user.p2p_media_enabled = this.settings.enableP2p;
                        this.webtorrent.setEnabled(!this.settings.enableP2p);
                        url = 'api/v2/settings/p2p';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!this.settings.enableP2p) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.post(url)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.client.delete(url)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        window.Opspot.user.p2p_media_enabled = this.settings.enableP2p;
                        this.webtorrent.setEnabled(this.settings.enableP2p);
                        return [3 /*break*/, 7];
                    case 7:
                        this.changed = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsP2PMediaComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    SettingsP2PMediaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-settings--p2pmedia',
            templateUrl: 'p2pmedia.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            storage_1.Storage,
            webtorrent_service_1.WebtorrentService,
            client_1.Client])
    ], SettingsP2PMediaComponent);
    return SettingsP2PMediaComponent;
}());
exports.SettingsP2PMediaComponent = SettingsP2PMediaComponent;
//# sourceMappingURL=p2pmedia.component.js.map