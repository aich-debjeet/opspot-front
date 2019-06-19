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
var InteractionsTableComponent = /** @class */ (function () {
    function InteractionsTableComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.startDate = '';
        this.endDate = '';
        this.inProgress = false;
        this.init = false;
        this.data = {
            actors: [],
            beneficiaries: []
        };
    }
    Object.defineProperty(InteractionsTableComponent.prototype, "_type", {
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionsTableComponent.prototype, "_startDate", {
        set: function (value) {
            this.startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionsTableComponent.prototype, "_endDate", {
        set: function (value) {
            this.endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    InteractionsTableComponent.prototype.ngOnInit = function () {
        this.getLeaderboard();
        this.init = true;
    };
    InteractionsTableComponent.prototype.ngOnChanges = function () {
        if (this.init) {
            this.getLeaderboard();
        }
    };
    InteractionsTableComponent.prototype.getLeaderboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate, response, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clearTimeout(this.timeout);
                        startDate = new Date(this.startDate), endDate = new Date(this.endDate);
                        startDate.setHours(0, 0, 0);
                        endDate.setHours(23, 59, 59);
                        this.inProgress = true;
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get("api/v2/admin/analytics/leaderboard/" + this.type + "/" + this.metric.metric, {
                                from: Math.floor(+startDate / 1000),
                                to: Math.floor(+endDate / 1000),
                            })];
                    case 2:
                        response = _a.sent();
                        this.data[this.type] = response.counts[this.type];
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        this.detectChanges();
                        if (endDate.toDateString() === (new Date()).toDateString()) {
                            this.timeout = setTimeout(function () { return _this.getLeaderboard(); }, 10000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    InteractionsTableComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InteractionsTableComponent.prototype, "metric", void 0);
    __decorate([
        core_1.Input('type'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], InteractionsTableComponent.prototype, "_type", null);
    __decorate([
        core_1.Input('startDate'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], InteractionsTableComponent.prototype, "_startDate", null);
    __decorate([
        core_1.Input('endDate'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], InteractionsTableComponent.prototype, "_endDate", null);
    InteractionsTableComponent = __decorate([
        core_1.Component({
            selector: 'm-admin--interactions--table',
            template: "\n    <h3> {{metric.title | titlecase}}</h3>\n    <div class=\"mdl-spinner mdl-js-spinner is-active\" [mdl] *ngIf=\"inProgress && !data[type].length\"></div>\n\n    <table>\n      <tbody>\n      <tr *ngFor=\"let item of data[type]\">\n        <td [routerLink]=\"['/', item.user.guid]\">\n          <img class=\"m-admin--interactions--avatar\" src=\"/icon/{{item.user.guid}}/medium/{{item.user.icontime}}\">\n          @{{item.user.username}}\n        </td>\n        <td>{{item.value}}</td>\n      </tr>\n\n      <tr *ngIf=\"data[type].length === 0 && !inProgress\">\n        <td style=\"text-align: left\" i18n=\"@@COMMON__ADMIN__NO_DATA\">No data</td>\n      </tr>\n      </tbody>\n    </table>\n  ",
            host: {
                'class': 'm-border',
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client, core_1.ChangeDetectorRef])
    ], InteractionsTableComponent);
    return InteractionsTableComponent;
}());
exports.InteractionsTableComponent = InteractionsTableComponent;
//# sourceMappingURL=table.component.js.map