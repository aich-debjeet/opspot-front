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
var blob_download_1 = require("../../../utils/blob-download");
var api_1 = require("../../../services/api");
var AdminReportsDownload = /** @class */ (function () {
    /**
     * constructor
     * @param client Client
     */
    function AdminReportsDownload(client) {
        this.client = client;
        this.reports = null;
        this.downloading = false;
        this.error = '';
        this.selectedReport = 0;
        this.with_titles = false;
        var d = new Date();
        d.setHours(23, 59, 59);
        var endDate = d.toISOString();
        d.setDate(d.getDate() - 1);
        d.setHours(0, 0, 0);
        var startDate = d.toISOString();
        // Reports definition
        this.reports = [
            {
                name: 'Token Sale',
                endpoint: 'api/v2/blockchain/transactions/reports',
                report: 'TokenSaleEvent',
                options: { type: 'text/csv;charset=utf-8;' },
                file_name: 'toke_sale_event.csv',
                params: {
                    from: {
                        label: 'From',
                        value: startDate,
                        type: 'date',
                        map: function (v) { return Math.floor((new Date(v)).getTime() / 1000); } // format the output
                    },
                    to: {
                        label: 'To',
                        value: endDate,
                        type: 'date',
                        map: function (v) { return Math.floor((new Date(v)).getTime() / 1000); } // format the output
                    },
                }
            },
            {
                name: 'Eth Price',
                endpoint: 'api/v2/blockchain/transactions/reports',
                report: 'EthereumPrice',
                options: { type: 'text/csv;charset=utf-8;' },
                file_name: 'eth_price.csv',
                params: {
                    from: {
                        label: 'From',
                        value: startDate,
                        type: 'date',
                        map: function (v) { return Math.floor((new Date(v)).getTime() / 1000); } // format the output
                    },
                    to: {
                        label: 'To',
                        value: endDate,
                        type: 'date',
                        map: function (v) { return Math.floor((new Date(v)).getTime() / 1000); } // format the output
                    },
                    resolution: {
                        label: 'Resolution',
                        value: 300,
                        type: 'select',
                        options: [
                            { label: '5 minutes', value: 300 },
                            { label: '15 minutes', value: 900 },
                            { label: '30 minutes', value: 1800 },
                            { label: '2 hours', value: 7200 },
                            { label: '4 hours', value: 14400 },
                            { label: '1 day', value: 86400 }
                        ],
                    },
                }
            },
            {
                name: 'Boost Tokens',
                endpoint: 'api/v2/blockchain/transactions/reports',
                report: 'BoostTokens',
                options: { type: 'text/csv;charset=utf-8;' },
                file_name: 'boost_tokens.csv',
                params: {
                    from: {
                        label: 'From',
                        value: startDate,
                        type: 'date',
                        map: function (v) {
                            var date = new Date(v);
                            return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000);
                        }
                    },
                    to: {
                        label: 'To',
                        value: endDate,
                        type: 'date',
                        map: function (v) {
                            var date = new Date(v);
                            return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59) / 1000);
                        }
                    },
                }
            },
            {
                name: 'Plus Tokens',
                endpoint: 'api/v2/blockchain/transactions/reports',
                report: 'PlusTokens',
                options: { type: 'text/csv;charset=utf-8;' },
                file_name: 'plus_tokens.csv',
                params: {
                    from: {
                        label: 'From',
                        value: startDate,
                        type: 'date',
                        map: function (v) {
                            var date = new Date(v);
                            return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000);
                        }
                    },
                    to: {
                        label: 'To',
                        value: endDate,
                        type: 'date',
                        map: function (v) {
                            var date = new Date(v);
                            return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59) / 1000);
                        }
                    },
                }
            },
        ];
    }
    AdminReportsDownload.prototype.ngOnInit = function () { };
    AdminReportsDownload.prototype.ngOnDestroy = function () { };
    /**
     * Download report
     */
    AdminReportsDownload.prototype.download = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedReport, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedReport = this.reports[this.selectedReport];
                        params.report = selectedReport.report;
                        if (this.with_titles) {
                            params._titles = true;
                        }
                        this.downloading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getRaw(selectedReport.endpoint, params)];
                    case 2:
                        res = _a.sent();
                        blob_download_1.blobDownload(res._body, selectedReport.options, selectedReport.file_name);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.error = e_1.message || 'Download Error';
                        return [3 /*break*/, 4];
                    case 4:
                        this.downloading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set selected report
     * @param r string
     */
    AdminReportsDownload.prototype.setReport = function (r) {
        this.selectedReport = r;
    };
    AdminReportsDownload = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-admin--reports-download',
            templateUrl: 'reports-download.html',
        })
        /**
         * Admin Reports Download
         */
        ,
        __metadata("design:paramtypes", [api_1.Client])
    ], AdminReportsDownload);
    return AdminReportsDownload;
}());
exports.AdminReportsDownload = AdminReportsDownload;
//# sourceMappingURL=reports-download.js.map