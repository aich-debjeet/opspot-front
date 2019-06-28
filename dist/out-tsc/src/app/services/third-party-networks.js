"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThirdPartyNetworksService = /** @class */ (function () {
    function ThirdPartyNetworksService(client, zone) {
        this.client = client;
        this.zone = zone;
        this.inProgress = false;
        this.siteUrl = '';
        this.status = {};
        this.siteUrl = window.Opspot.site_url;
        this.integrations = window.Opspot.thirdpartynetworks;
    }
    ThirdPartyNetworksService._ = function (client, zone) {
        return new ThirdPartyNetworksService(client, zone);
    };
    // General
    ThirdPartyNetworksService.prototype.getStatus = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (!this.statusReady || refresh) {
            this.statusReady = this.client.get('api/v1/thirdpartynetworks/status')
                .then(function (response) {
                _this.overrideStatus(response.thirdpartynetworks);
            });
        }
        return this.statusReady;
    };
    ThirdPartyNetworksService.prototype.setStatusKey = function (network, value) {
        var _this = this;
        this.getStatus()
            .then(function () {
            _this.status[network] = value;
        });
    };
    ThirdPartyNetworksService.prototype.overrideStatus = function (statusResponse) {
        this.status = statusResponse;
    };
    // Connecting / Disconnecting
    ThirdPartyNetworksService.prototype.connect = function (network) {
        switch (network) {
            case 'facebook':
                return this.connectFb();
            case 'twitter':
                return this.connectTw();
        }
        throw new Error('Unknown Third-Party Network');
    };
    ThirdPartyNetworksService.prototype.disconnect = function (network) {
        switch (network) {
            case 'facebook':
                return this.removeFb();
            case 'twitter':
                return this.removeTw();
        }
        throw new Error('Unknown Third-Party Network');
    };
    // Helper methods
    ThirdPartyNetworksService.prototype.getStatusKey = function (network, key) {
        if (key === void 0) { key = null; }
        if (!this.status || !this.status[network]) {
            return null;
        }
        if (key === null) {
            return this.status[network];
        }
        return this.status[network][key] || null;
    };
    ThirdPartyNetworksService.prototype.isConnected = function (network) {
        return this.getStatusKey(network, 'connected');
    };
    ThirdPartyNetworksService.prototype.getIntegrations = function () {
        return this.integrations;
    };
    ThirdPartyNetworksService.prototype.hasIntegration = function (network) {
        return this.integrations && this.integrations[network];
    };
    ThirdPartyNetworksService.prototype.removeFbLogin = function () {
        var _this = this;
        this.inProgress = true;
        return this.client.delete('api/v1/thirdpartynetworks/facebook/login')
            .then(function () {
            _this.inProgress = false;
            if (window.Opspot.user) {
                window.Opspot.user.signup_method = 'ex-facebook';
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    // === Individual Third-Party Network Integrations
    // @todo: Encapsulate and create classes!
    // Facebook
    ThirdPartyNetworksService.prototype.connectFb = function () {
        var _this = this;
        this.inProgress = true;
        return new Promise(function (resolve, reject) {
            window.onSuccessCallback = function () { return _this.zone.run(function () {
                _this.getStatus(true)
                    .then(function () {
                    resolve();
                    _this.inProgress = false;
                });
            }); };
            window.onErrorCallback = function (reason) { return _this.zone.run(function () {
                _this.inProgress = false;
                reject(reason);
            }); };
            window.open(_this.siteUrl + "api/v1/thirdpartynetworks/facebook/link?no_pages=1", 'Login with Facebook', 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=600, height=400, top=100, left=100');
        });
    };
    ThirdPartyNetworksService.prototype.removeFb = function () {
        var _this = this;
        this.inProgress = true;
        return this.client.delete('api/v1/thirdpartynetworks/facebook')
            .then(function () {
            _this.inProgress = false;
            _this.setStatusKey('facebook', { connected: false });
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    // Twitter
    ThirdPartyNetworksService.prototype.connectTw = function () {
        var _this = this;
        this.inProgress = true;
        return new Promise(function (resolve, reject) {
            window.onSuccessCallback = function () { return _this.zone.run(function () {
                _this.getStatus(true)
                    .then(function () {
                    resolve();
                    _this.inProgress = false;
                });
            }); };
            window.onErrorCallback = function (reason) { return _this.zone.run(function () {
                _this.inProgress = false;
                reject(reason);
            }); };
            window.open(_this.siteUrl + "api/v1/thirdpartynetworks/twitter/link", 'Login with Twitter', 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=600, height=400, top=100, left=100');
        });
    };
    ThirdPartyNetworksService.prototype.removeTw = function () {
        var _this = this;
        this.inProgress = true;
        return this.client.delete('api/v1/thirdpartynetworks/twitter')
            .then(function () {
            _this.inProgress = false;
            _this.setStatusKey('twitter', { connected: false });
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    return ThirdPartyNetworksService;
}());
exports.ThirdPartyNetworksService = ThirdPartyNetworksService;
//# sourceMappingURL=third-party-networks.js.map