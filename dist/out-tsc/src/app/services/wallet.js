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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_1 = require("./api");
var session_1 = require("./session");
var sockets_1 = require("./sockets");
var WalletService = /** @class */ (function () {
    function WalletService(session, client, sockets) {
        var _this = this;
        this.session = session;
        this.client = client;
        this.sockets = sockets;
        this.points = null;
        this.apiInProgress = false;
        this.pointsEmitter = new core_1.EventEmitter();
        this.getBalance();
        this.session.isLoggedIn(function (is) {
            if (is) {
                _this.getBalance(true);
            }
            else {
                _this.points = null;
                _this.sync();
            }
        });
        this.listen();
    }
    WalletService._ = function (session, client, sockets) {
        return new WalletService(session, client, sockets);
    };
    WalletService.prototype.onPoints = function () {
        return this.pointsEmitter;
    };
    WalletService.prototype.delta = function (points) {
        if (this.points === undefined) {
            return;
        }
        if (points === 0) {
            return;
        }
        this.points += points;
        this.sync(points);
    };
    /**
     * Increment the wallet
     */
    WalletService.prototype.increment = function (points) {
        if (points === void 0) { points = 1; }
        this.delta(+points);
    };
    /**
     * Decrement the wallet
     */
    WalletService.prototype.decrement = function (points) {
        if (points === void 0) { points = 1; }
        this.delta(-points);
    };
    /**
     * Return the balance
     */
    WalletService.prototype.getBalance = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (!window.Opspot.wallet || refresh) {
            this.points = null;
            this.apiInProgress = true;
            return this.client.get("api/v1/blockchain/wallet/balance")
                .then(function (_a) {
                var balance = _a.balance;
                _this.apiInProgress = false;
                if (typeof balance === 'undefined') {
                    _this.points = null;
                }
                else {
                    _this.points = balance;
                }
                _this.sync();
                return _this.points;
            })
                .catch(function (e) {
                _this.apiInProgress = false;
                _this.points = null;
                _this.sync();
                return null;
            });
        }
        else if (this.points === null) {
            this.points = window.Opspot.wallet.balance;
            this.sync();
            return Promise.resolve(this.points);
        }
    };
    WalletService.prototype.sync = function (points) {
        this.pointsEmitter.emit({ batch: points, total: this.points });
    };
    // real-time
    WalletService.prototype.listen = function () {
        var _this = this;
        this.pointsTxSubscription = this.sockets.subscribe('pointsTx', function (points, entity_guid, description) {
            if (_this.apiInProgress) {
                return;
            }
            _this.delta(points);
        });
    };
    // @todo: when? implement at some global ngOnDestroy()
    WalletService.prototype.unListen = function () {
        if (this.pointsTxSubscription) {
            this.pointsTxSubscription.unsubscribe();
        }
    };
    WalletService = __decorate([
        __param(0, core_1.Inject(session_1.Session)), __param(1, core_1.Inject(api_1.Client)), __param(2, core_1.Inject(sockets_1.SocketsService)),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, sockets_1.SocketsService])
    ], WalletService);
    return WalletService;
}());
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.js.map