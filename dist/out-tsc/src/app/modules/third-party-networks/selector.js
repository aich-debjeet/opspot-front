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
var third_party_networks_1 = require("../../services/third-party-networks");
var ThirdPartyNetworksSelector = /** @class */ (function () {
    function ThirdPartyNetworksSelector(thirdpartynetworks) {
        this.thirdpartynetworks = thirdpartynetworks;
        this.networks = [];
        this.state = {};
        this.opened = false;
        this.ready = false;
        this.inProgress = false;
        this.networkIconsMap = {
            'facebook': 'facebook-official'
        };
    }
    ThirdPartyNetworksSelector.prototype.ngOnInit = function () {
        for (var network in this.thirdpartynetworks.getIntegrations()) {
            if (this.thirdpartynetworks.hasIntegration(network)) {
                this.networks.push(network);
                this.state[network] = false;
            }
        }
    };
    ThirdPartyNetworksSelector.prototype.toggleOpened = function () {
        var _this = this;
        if (!this.ready) {
            this.inProgress = true;
            this.thirdpartynetworks.getStatus()
                .then(function () {
                _this.inProgress = false;
                _this.ready = true;
            })
                .catch(function (e) {
                console.error('[Third Party Networks/toggleOpened]', e);
                _this.inProgress = false;
            });
        }
        this.opened = !this.opened;
    };
    ThirdPartyNetworksSelector.prototype.toggleState = function (network) {
        var _this = this;
        if (this.inProgress || !this.ready) {
            return;
        }
        if (this.state[network]) {
            this.state[network] = false;
            return;
        }
        this.inProgress = true;
        if (!this.thirdpartynetworks.isConnected(network)) {
            this.thirdpartynetworks.connect(network)
                .then(function () {
                _this.inProgress = false;
                _this.state[network] = true;
            });
            return;
        }
        this.inProgress = false;
        this.state[network] = true;
    };
    ThirdPartyNetworksSelector.prototype.inject = function (data) {
        for (var network in this.state) {
            if (this.state[network]) {
                data[network] = 1;
            }
        }
        return data;
    };
    ThirdPartyNetworksSelector.prototype.getNetworkIconClass = function (network) {
        if (typeof this.networkIconsMap[network] !== 'undefined') {
            return this.networkIconsMap[network];
        }
        return network;
    };
    ThirdPartyNetworksSelector = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-third-party-networks-selector',
            exportAs: 'thirdPartyNetworksSelector',
            templateUrl: 'selector.html',
        }),
        __metadata("design:paramtypes", [third_party_networks_1.ThirdPartyNetworksService])
    ], ThirdPartyNetworksSelector);
    return ThirdPartyNetworksSelector;
}());
exports.ThirdPartyNetworksSelector = ThirdPartyNetworksSelector;
//# sourceMappingURL=selector.js.map