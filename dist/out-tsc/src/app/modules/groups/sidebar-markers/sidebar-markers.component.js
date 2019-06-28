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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var update_markers_service_1 = require("../../../common/services/update-markers.service");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var GroupsSidebarMarkersComponent = /** @class */ (function () {
    function GroupsSidebarMarkersComponent(client, session, updateMarkers) {
        this.client = client;
        this.session = session;
        this.updateMarkers = updateMarkers;
        this.inProgress = false;
        this.markers = [];
        this.groups = [];
    }
    GroupsSidebarMarkersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        this.$updateMarker = this.updateMarkers.markers.subscribe(function (markers) {
                            if (!markers)
                                return;
                            var _loop_1 = function (i) {
                                var entity_guid = _this.groups[i].guid;
                                _this.groups[i].hasGathering$ = rxjs_1.interval(1000).pipe(operators_1.throttle(function () { return rxjs_1.interval(2000); }), //only allow once per 2 seconds
                                operators_1.startWith(0), operators_1.map(function () { return markers.filter(function (marker) { return marker.entity_guid == entity_guid
                                    && marker.marker == 'gathering-heartbeat'
                                    && marker.updated_timestamp > (Date.now() / 1000) - 60; } //1 minute tollerance
                                ).length > 0; }));
                                _this.groups[i].hasMarker = markers.filter(function (marker) { return marker.entity_guid == _this.groups[i].guid
                                    && marker.read_timestamp < marker.updated_timestamp
                                    && marker.marker != 'gathering-heartbeat'; }).length > 0;
                            };
                            for (var i in _this.groups) {
                                _loop_1(i);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsSidebarMarkersComponent.prototype.ngOnDestroy = function () {
        this.$updateMarker.unsubscribe();
    };
    GroupsSidebarMarkersComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        return [4 /*yield*/, this.client.get('api/v1/groups/member')];
                    case 1:
                        response = _a.sent();
                        this.groups = response.entities;
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsSidebarMarkersComponent = __decorate([
        core_1.Component({
            selector: 'm-group--sidebar-markers',
            templateUrl: 'sidebar-markers.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            session_1.Session,
            update_markers_service_1.UpdateMarkersService])
    ], GroupsSidebarMarkersComponent);
    return GroupsSidebarMarkersComponent;
}());
exports.GroupsSidebarMarkersComponent = GroupsSidebarMarkersComponent;
//# sourceMappingURL=sidebar-markers.component.js.map