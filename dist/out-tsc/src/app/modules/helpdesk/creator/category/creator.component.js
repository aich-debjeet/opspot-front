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
var router_1 = require("@angular/router");
var CategoryCreatorComponent = /** @class */ (function () {
    function CategoryCreatorComponent(client, router, route) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.categories = [];
        this.error = null;
        this.category = {
            title: '',
            parent_uuid: null,
        };
    }
    CategoryCreatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadCategories();
        this.route.params.subscribe(function (params) {
            if (params['uuid'] && params['uuid'] !== 'new') {
                _this.load(params['uuid']);
            }
        });
    };
    CategoryCreatorComponent.prototype.trackCategories = function (index, category) {
        return category.uuid;
    };
    CategoryCreatorComponent.prototype.loadCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("api/v2/helpdesk/categories", { limit: 200, recursive: true })];
                    case 1:
                        response = _a.sent();
                        this.categories = this.categoriesToArray(response.categories);
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
    CategoryCreatorComponent.prototype.categoriesToArray = function (categories) {
        var catArray = [];
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var category = categories_1[_i];
            catArray.push(category);
            var cat = category;
            while (cat.parent) {
                catArray.unshift(cat.parent);
                cat = cat.parent;
            }
        }
        // unique
        return catArray.filter(function (item, index, array) { return array.findIndex(function (value) { return value.uuid === item.uuid; }) === index; });
    };
    CategoryCreatorComponent.prototype.renderBranch = function (category) {
        // first get the whole branch
        var branch = [];
        var cat = category;
        while (cat) {
            branch.push(cat);
            cat = cat.parent;
        }
        var text = [];
        for (var i = branch.length - 1; i >= 0; --i) {
            text.push(branch[i].title);
        }
        return text.join(' > ');
    };
    CategoryCreatorComponent.prototype.selectCategory = function (category) {
        this.category.parent_uuid = category.uuid;
    };
    CategoryCreatorComponent.prototype.load = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("api/v2/helpdesk/categories/category/" + uuid)];
                    case 1:
                        response = _a.sent();
                        this.category = response.category;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryCreatorComponent.prototype.validate = function () {
        this.error = null;
        if (!this.category.title) {
            this.error = 'You must provide a title';
        }
        if (this.error) {
            throw new Error();
        }
    };
    CategoryCreatorComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            this.validate();
                        }
                        catch (e) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post('api/v2/admin/helpdesk/categories', __assign({}, this.category))];
                    case 2:
                        _a.sent();
                        this.router.navigate(['/help']);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        this.error = e_3;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryCreatorComponent = __decorate([
        core_1.Component({
            selector: 'm-helpdesk--category-creator',
            templateUrl: 'creator.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            router_1.Router,
            router_1.ActivatedRoute])
    ], CategoryCreatorComponent);
    return CategoryCreatorComponent;
}());
exports.CategoryCreatorComponent = CategoryCreatorComponent;
//# sourceMappingURL=creator.component.js.map