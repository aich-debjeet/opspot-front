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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_1 = require("../../../services/api");
var rejection_reason_modal_component_1 = require("./modal/rejection-reason-modal.component");
var rejection_reasons_1 = require("./rejection-reasons");
var AdminBoosts = /** @class */ (function () {
    function AdminBoosts(client, route) {
        this.client = client;
        this.route = route;
        this.boosts = [];
        this.type = 'newsfeed';
        this.count = 0;
        this.newsfeed_count = 0;
        this.content_count = 0;
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.reasonModalOpened = false;
        this.statistics = null;
        this.selectedBoost = null;
    }
    AdminBoosts.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['type']) {
                _this.type = params['type'];
            }
            else {
                _this.type = 'newsfeed';
            }
            _this.boosts = [];
            _this.count = 0;
            _this.inProgress = false;
            _this.moreData = true;
            _this.offset = '';
            _this.load()
                .then(function () {
                _this.loadStatistics();
            });
        });
    };
    AdminBoosts.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    AdminBoosts.prototype.load = function () {
        var _this = this;
        if (this.inProgress)
            return;
        this.inProgress = true;
        return this.client.get('api/v1/admin/boosts/' + this.type, { limit: 24, offset: this.offset })
            .then(function (response) {
            if (!response.boosts) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            _this.boosts = _this.boosts.concat(response.boosts);
            _this.count = response.count;
            _this.newsfeed_count = response.newsfeed_count;
            _this.content_count = response.content_count;
            _this.offset = response['load-next'];
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminBoosts.prototype.loadStatistics = function () {
        var _this = this;
        this.statistics = null;
        return this.client.get("api/v1/admin/boosts/analytics/" + this.type)
            .then(function (response) {
            _this.statistics = response;
        })
            .catch(function (e) {
            console.error('[Opspot Admin] Cannot load boost statistics', e);
        });
    };
    AdminBoosts.prototype.accept = function (boost, open, opts) {
        if (boost === void 0) { boost = null; }
        if (open === void 0) { open = false; }
        if (opts === void 0) { opts = { mature: 0 }; }
        if (!boost)
            boost = this.boosts[0];
        boost.rating = open ? 2 : 1;
        if (!opts.mature)
            opts.mature = 0;
        this.client.post('api/v1/admin/boosts/' + this.type + '/' + boost.guid + '/accept', {
            quality: boost.quality,
            rating: boost.rating,
            mature: opts.mature
        });
        this.pop(boost);
    };
    AdminBoosts.prototype.reject = function (boost) {
        if (boost === void 0) { boost = null; }
        if (!boost)
            boost = this.boosts[0];
        this.reasonModalOpened = false;
        this.client.post('api/v1/admin/boosts/' + this.type + '/' + boost.guid + '/reject', { reason: boost.rejection_reason });
        this.pop(boost);
    };
    AdminBoosts.prototype.openReasonsModal = function (boost) {
        if (boost === void 0) { boost = null; }
        if (!boost)
            boost = this.boosts[0];
        this.reasonModalOpened = true;
        this.selectedBoost = boost;
    };
    AdminBoosts.prototype.eTag = function (boost) {
        if (boost === void 0) { boost = null; }
        if (!boost)
            boost = this.boosts[0];
        boost.rejection_reason = this.findReason('Explicit', 'label').code;
        this.reject(boost);
    };
    /**
     * Remove an entity from the list
     */
    AdminBoosts.prototype.pop = function (boost) {
        var i;
        for (i in this.boosts) {
            if (boost === this.boosts[i])
                this.boosts.splice(i, 1);
        }
        if (this.type === 'newsfeed')
            this.newsfeed_count--;
        else if (this.type === 'content')
            this.content_count--;
        if (this.boosts.length < 5)
            this.load();
    };
    AdminBoosts.prototype.onKeyPress = function (e) {
        if (this.reasonModalOpened || e.ctrlKey || e.altKey || e.shiftKey) {
            return;
        }
        e.stopPropagation();
        // numbers
        switch (e.key.toLowerCase()) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                var keyValue = Number.parseInt(e.key);
                this.boosts[0].quality = keyValue > 0 ? keyValue * 10 : 100;
                break;
            case 'arrowleft':
                return this.accept();
            case 'arrowright':
                return this.openReasonsModal();
            case 'e':
                //mark as nsfw and reject
                this.eTag(this.boosts[0]);
                break;
            case 'n':
                //mark as nsfw and accept
                this.accept(this.boosts[0], true);
                break;
            case 'a':
                this.accept();
                break;
            case 'r':
                this.openReasonsModal();
                break;
        }
    };
    // TODO: Please, convert this to a pipe (and maybe add days support)!
    AdminBoosts.prototype._duration = function (duration) {
        var minsDuration = Math.floor(duration / (60000)), mins = minsDuration % 60, hours = Math.floor(minsDuration / 60);
        return hours + ":" + this._padStart('' + mins, 2, '0');
    };
    AdminBoosts.prototype.findReason = function (value, field) {
        if (field === void 0) { field = 'code'; }
        return rejection_reasons_1.rejectionReasons.find(function (item) {
            return item[field] == value;
        });
    };
    AdminBoosts.prototype._padStart = function (str, targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (str.length > targetLength) {
            return String(str);
        }
        else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(str);
        }
    };
    __decorate([
        core_1.ViewChild('reasonModal'),
        __metadata("design:type", rejection_reason_modal_component_1.RejectionReasonModalComponent)
    ], AdminBoosts.prototype, "modal", void 0);
    AdminBoosts = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-boosts',
            host: {
                '(document:keypress)': 'onKeyPress($event)'
            },
            templateUrl: 'boosts.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.ActivatedRoute])
    ], AdminBoosts);
    return AdminBoosts;
}());
exports.AdminBoosts = AdminBoosts;
//# sourceMappingURL=boosts.js.map