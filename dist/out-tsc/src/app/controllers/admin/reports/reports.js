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
var api_1 = require("../../../services/api");
var list_options_1 = require("../../../services/list-options");
var AdminReports = /** @class */ (function () {
    function AdminReports(client, route) {
        this.client = client;
        this.route = route;
        this.filter = 'reports';
        this.type = 'review';
        this.reports = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.reasons = list_options_1.REASONS;
    }
    AdminReports.prototype.ngOnInit = function () {
        var _this = this;
        this.type = 'review';
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this.filter = params['filter'];
            }
            if (params['type']) {
                _this.type = params['type'];
            }
            _this.load(true);
        });
    };
    AdminReports.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    AdminReports.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (refresh) {
                            this.inProgress = false;
                            this.reports = [];
                            this.offset = '';
                            this.moreData = true;
                        }
                        if (this.inProgress) {
                            return [2 /*return*/];
                        }
                        this.inProgress = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.client.get("api/v1/admin/reports/" + this.type, { limit: 24, offset: this.offset })];
                    case 2:
                        response = _b.sent();
                        if (refresh) {
                            this.reports = [];
                        }
                        if (response.reports) {
                            (_a = this.reports).push.apply(_a, response.reports);
                        }
                        if (response['load-next']) {
                            this.offset = response['load-next'];
                        }
                        else {
                            this.moreData = false;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _b.sent();
                        alert((e_1 && e_1.message) || 'Error getting list');
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.parseReason = function (reasonValue) {
        var reason = reasonValue;
        list_options_1.REASONS.forEach(function (item) {
            if (item.value === reasonValue) {
                reason = item.label;
            }
        });
        return reason;
    };
    AdminReports.prototype.parseAction = function (action) {
        return typeof list_options_1.REPORT_ACTIONS[action] !== 'undefined' ?
            list_options_1.REPORT_ACTIONS[action] :
            action;
    };
    AdminReports.prototype.removeFromList = function (index) {
        if (this.type === 'history') {
            return;
        }
        this.reports.splice(index, 1);
    };
    AdminReports.prototype.archive = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post("api/v1/admin/reports/" + report.guid + "/archive", {})];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert('There was a problem archiving this report. Please reload.');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        alert((e_2 && e_2.message) || 'There was a problem archiving this report. Please reload.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.explicit = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('This will make this content explicit. Are you sure?')) {
                            return [2 /*return*/];
                        }
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post("api/v1/admin/reports/" + report.guid + "/explicit", { reason: report.reason })];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert('There was a problem marking this content as explicit. Please reload.');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        alert((e_3 && e_3.message) || 'There was a problem marking this content as explicit. Please reload.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.spam = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('This will mark this content as spam. Are you sure?')) {
                            return [2 /*return*/];
                        }
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post("api/v1/admin/reports/" + report.guid + "/spam", { reason: report.reason })];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert('There was a problem marking this content as spam. Please reload.');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        alert((e_4 && e_4.message) || 'There was a problem marking this content as spam. Please reload.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.delete = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('This will delete this from Opspot. Are you sure?')) {
                            return [2 /*return*/];
                        }
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post("api/v1/admin/reports/" + report.guid + "/delete", { reason: report.reason })];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert('There was a problem deleting this content. Please reload.');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        alert((e_5 && e_5.message) || 'There was a problem deleting this content. Please reload.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.approveAppeal = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm("This will approve an appeal and undo the last administrative action. There's no UNDO. Are you sure?")) {
                            return [2 /*return*/];
                        }
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.put("api/v1/admin/reports/appeals/" + report.guid, { reason: report.reason })];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert("There was a problem approving this content's appeal. Please reload.");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        alert((e_6 && e_6.message) || "There was a problem approving this content's appeal. Please reload.");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports.prototype.rejectAppeal = function (report, index) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm("This will reject an appeal. There's no UNDO. Are you sure?")) {
                            return [2 /*return*/];
                        }
                        this.removeFromList(index);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.delete("api/v1/admin/reports/appeals/" + report.guid, { reason: report.reason })];
                    case 2:
                        response = _a.sent();
                        if (!response.done) {
                            alert("There was a problem rejecting this content's appeal. Please reload.");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        alert((e_7 && e_7.message) || "There was a problem rejecting this content's appeal. Please reload.");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminReports = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-reports',
            templateUrl: 'reports.html',
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.ActivatedRoute])
    ], AdminReports);
    return AdminReports;
}());
exports.AdminReports = AdminReports;
//# sourceMappingURL=reports.js.map