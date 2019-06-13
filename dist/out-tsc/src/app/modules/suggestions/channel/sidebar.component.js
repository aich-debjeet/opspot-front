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
var api_1 = require("../../../services/api");
var SuggestionsSidebar = /** @class */ (function () {
    function SuggestionsSidebar(client) {
        this.client = client;
        this.opspot = window.Opspot;
        this.suggestions = [];
        this.lastOffset = 0;
        this.inProgress = false;
    }
    SuggestionsSidebar.prototype.ngOnInit = function () {
        this.load();
    };
    SuggestionsSidebar.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var limit, response, _i, _a, suggestion, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.inProgress = true;
                        limit = 5;
                        if (this.suggestions.length)
                            limit = 1;
                        // Subscribe can not rely on next batch, so load further batch
                        this.lastOffset = this.suggestions.length ? this.lastOffset + 11 : 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.client.get('api/v2/suggestions/user', {
                                limit: limit,
                                offset: this.lastOffset,
                            })];
                    case 2:
                        response = _b.sent();
                        for (_i = 0, _a = response.suggestions; _i < _a.length; _i++) {
                            suggestion = _a[_i];
                            this.suggestions.push(suggestion);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SuggestionsSidebar.prototype.pass = function (suggestion, e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        e.stopPropagation();
                        this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
                        return [4 /*yield*/, this.client.put("api/v2/suggestions/pass/" + suggestion.entity_guid)];
                    case 1:
                        _a.sent();
                        // load more
                        this.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuggestionsSidebar.prototype.remove = function (suggestion) {
        this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
        // load more
        this.load();
    };
    SuggestionsSidebar = __decorate([
        core_1.Component({
            selector: 'm-suggestions__sidebar',
            templateUrl: 'sidebar.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], SuggestionsSidebar);
    return SuggestionsSidebar;
}());
exports.SuggestionsSidebar = SuggestionsSidebar;
//# sourceMappingURL=sidebar.component.js.map