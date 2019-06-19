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
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var boost_contract_service_1 = require("../blockchain/contracts/boost-contract.service");
var BoostService = /** @class */ (function () {
    function BoostService(session, client, boostContractService) {
        this.session = session;
        this.client = client;
        this.boostContractService = boostContractService;
    }
    /**
     * Returns a promise with a collection of boosts.
     */
    BoostService.prototype.load = function (type, filter, _a) {
        var _b = _a === void 0 ? {} : _a, limit = _b.limit, offset = _b.offset;
        return this.client.get("api/v2/boost/" + type + "/" + filter, {
            limit: limit || 12,
            offset: offset || ''
        })
            .then(function (_a) {
            var boosts = _a.boosts, loadNext = _a["load-next"];
            return {
                boosts: boosts && boosts.length ? boosts : [],
                loadNext: loadNext || ''
            };
        });
    };
    /**
     * Accepts a P2P boost.
     */
    BoostService.prototype.accept = function (boost) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getBoostType(boost) !== 'p2p') {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(boost.currency == 'tokens')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.boostContractService.accept(boost.guid)];
                    case 2:
                        tx = _a.sent();
                        if (!tx) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3:
                        boost.state = 'accepted';
                        return [4 /*yield*/, this.client.put("api/v2/boost/peer/" + boost.guid)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        e_1 = _a.sent();
                        boost.state = 'created';
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns true if the boost can be accepted by the current user
     */
    BoostService.prototype.canAccept = function (boost) {
        return boost.state === 'created' && this.getBoostType(boost) === 'p2p' && this.isIncoming(boost);
    };
    /**
     * Rejects a P2P boost.
     */
    BoostService.prototype.reject = function (boost) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getBoostType(boost) !== 'p2p') {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(boost.currency == 'tokens')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.boostContractService.reject(boost.guid)];
                    case 2:
                        tx = _a.sent();
                        if (!tx) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3:
                        boost.state = 'rejected';
                        return [4 /*yield*/, this.client.delete("api/v2/boost/peer/" + boost.guid)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        e_2 = _a.sent();
                        boost.state = 'created';
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns true if the boost can be rejected by the current user
     */
    BoostService.prototype.canReject = function (boost) {
        return boost.state === 'created' && this.getBoostType(boost) === 'p2p' && this.isIncoming(boost);
    };
    /**
     * Revokes a boost.
     */
    BoostService.prototype.revoke = function (boost) {
        return __awaiter(this, void 0, void 0, function () {
            var revokeEndpoint, tx, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getBoostType(boost) === 'p2p') {
                            // P2P
                            revokeEndpoint = "api/v2/boost/peer/" + boost.guid + "/revoke";
                        }
                        else {
                            // Network
                            revokeEndpoint = "api/v2/boost/" + boost.handler + "/" + boost.guid + "/revoke";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(boost.currency == 'tokens')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.boostContractService.revoke(boost.guid)];
                    case 2:
                        tx = _a.sent();
                        if (!tx) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3:
                        boost.state = 'revoked';
                        return [4 /*yield*/, this.client.delete(revokeEndpoint)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        e_3 = _a.sent();
                        boost.state = 'created';
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns true if the boost can be revoked by the current user
     */
    BoostService.prototype.canRevoke = function (boost) {
        return boost.state === 'created' && ((this.getBoostType(boost) === 'p2p' && !this.isIncoming(boost)) ||
            (this.getBoostType(boost) !== 'p2p'));
    };
    /**
     * Returns the boost type based on the existance of certain object keys.
     */
    BoostService.prototype.getBoostType = function (boost) {
        if (boost.handler) {
            return boost.handler;
        }
        else if (boost.destination) {
            return 'p2p';
        }
        return false;
    };
    /**
     * Returns if the boost belongs to the current logged in user
     */
    BoostService.prototype.isIncoming = function (boost) {
        return boost.destination.guid === this.session.getLoggedInUser().guid;
    };
    BoostService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, boost_contract_service_1.BoostContractService])
    ], BoostService);
    return BoostService;
}());
exports.BoostService = BoostService;
//# sourceMappingURL=boost.service.js.map