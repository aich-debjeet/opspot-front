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
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var title_1 = require("../../../services/ux/title");
var HelpdeskDashboardComponent = /** @class */ (function () {
    function HelpdeskDashboardComponent(router, client, session, title) {
        this.router = router;
        this.client = client;
        this.session = session;
        this.title = title;
        this.opspot = window.Opspot;
        this.query = '';
        this.results = [];
        this.searching = false;
        this.topQuestions = [];
    }
    HelpdeskDashboardComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.title.setTitle('Help Desk');
                        return [4 /*yield*/, this.loadPopular()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HelpdeskDashboardComponent.prototype.loadPopular = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("api/v2/helpdesk/questions/top", { limit: 8 })];
                    case 1:
                        response = _a.sent();
                        this.topQuestions = response.questions;
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
    /**
     * Activates and sets focus on the question seach box
     *
     */
    HelpdeskDashboardComponent.prototype.onFocus = function () {
        var _this = this;
        this.searching = true;
        if (this.input.nativeElement) {
            setTimeout(function () { return _this.input.nativeElement.focus(); }, 100);
        }
    };
    HelpdeskDashboardComponent.prototype.newCategory = function () {
        this.router.navigate(['/help/category/edit/new']);
    };
    HelpdeskDashboardComponent.prototype.newQuestion = function () {
        this.router.navigate(['/help/question/edit/new']);
    };
    /**
     * Deactivates the question seach box
     */
    HelpdeskDashboardComponent.prototype.onBlur = function () {
        this.searching = false;
    };
    HelpdeskDashboardComponent.prototype.setQuestion = function (question, $event) {
        if ($event) {
            $event.preventDefault();
        }
        this.results = [];
        this.query = question.question;
    };
    HelpdeskDashboardComponent.prototype.search = function () {
        var _this = this;
        if (this.throttle) {
            clearTimeout(this.throttle);
            this.throttle = void 0;
        }
        var query = this.query;
        if (!query || query.length <= 2) {
            this.results = [];
            return;
        }
        this.throttle = setTimeout(function () {
            _this.client.get("api/v2/helpdesk/questions/search", {
                q: query,
                limit: 8,
            })
                .then(function (_a) {
                var entities = _a.entities;
                if (!entities) {
                    return;
                }
                _this.results = entities;
            })
                .catch(function (e) {
                console.error('Cannot load results', e);
            });
        });
    };
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], HelpdeskDashboardComponent.prototype, "input", void 0);
    HelpdeskDashboardComponent = __decorate([
        core_1.Component({
            selector: 'm-helpdesk--dashboard',
            templateUrl: 'dashboard.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            client_1.Client,
            session_1.Session,
            title_1.OpspotTitle])
    ], HelpdeskDashboardComponent);
    return HelpdeskDashboardComponent;
}());
exports.HelpdeskDashboardComponent = HelpdeskDashboardComponent;
//# sourceMappingURL=dashboard.component.js.map