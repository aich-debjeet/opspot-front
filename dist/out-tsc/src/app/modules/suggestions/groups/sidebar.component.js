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
var client_1 = require("../../../services/api/client");
var groups_service_1 = require("../../groups/groups-service");
var session_1 = require("../../../services/session");
var GroupSuggestionsSidebarComponent = /** @class */ (function () {
    function GroupSuggestionsSidebarComponent(client, session, service) {
        this.client = client;
        this.session = session;
        this.service = service;
        this.opspot = window.Opspot;
        this.lastOffset = 0;
        this.entities = [];
        this.inProgress = false;
    }
    GroupSuggestionsSidebarComponent.prototype.ngOnInit = function () {
        this.load();
    };
    GroupSuggestionsSidebarComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var limit, response, _i, _a, entity, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        limit = 5;
                        if (this.entities.length)
                            limit = 1;
                        this.lastOffset = this.entities.length ? this.lastOffset + 11 : 0;
                        this.inProgress = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get('api/v2/entities/suggested/groups/all', {
                                limit: limit,
                                offset: this.lastOffset
                            })];
                    case 2:
                        response = _b.sent();
                        for (_i = 0, _a = response.entities; _i < _a.length; _i++) {
                            entity = _a[_i];
                            this.entities.push(entity);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupSuggestionsSidebarComponent.prototype.remove = function (entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    };
    // group section
    /**
     * Check if the group is closed
     */
    GroupSuggestionsSidebarComponent.prototype.isPublic = function (group) {
        if (group.membership !== 2)
            return false;
        return true;
    };
    /**
     * Join a group
     */
    GroupSuggestionsSidebarComponent.prototype.join = function (group) {
        var _this = this;
        this.inProgress = true;
        this.service.join(group)
            .then(function () {
            _this.inProgress = false;
            if (_this.isPublic(group)) {
                group['is:member'] = true;
                return;
            }
            group['is:awaiting'] = true;
        })
            .catch(function (e) {
            var error = e.error;
            switch (e.error) {
                case 'You are banned from this group':
                    error = 'banned';
                    break;
                case 'User is already a member':
                    error = 'already_a_member';
                    break;
                default:
                    error = e.error;
                    break;
            }
            group['is:member'] = false;
            group['is:awaiting'] = false;
            _this.inProgress = false;
        });
    };
    /**
     * Leave a group
     */
    GroupSuggestionsSidebarComponent.prototype.leave = function (group) {
        this.service.leave(group)
            .then(function () {
            group['is:member'] = false;
        })
            .catch(function (e) {
            group['is:member'] = true;
        });
    };
    /**
     * Cancel a group joining request
     */
    GroupSuggestionsSidebarComponent.prototype.cancelRequest = function (group) {
        group['is:awaiting'] = false;
        this.service.cancelRequest(group)
            .then(function (done) {
            group['is:awaiting'] = !done;
        });
    };
    GroupSuggestionsSidebarComponent = __decorate([
        core_1.Component({
            selector: 'm-suggestions__sidebarGroups',
            templateUrl: 'sidebar.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            session_1.Session,
            groups_service_1.GroupsService])
    ], GroupSuggestionsSidebarComponent);
    return GroupSuggestionsSidebarComponent;
}());
exports.GroupSuggestionsSidebarComponent = GroupSuggestionsSidebarComponent;
//# sourceMappingURL=sidebar.component.js.map