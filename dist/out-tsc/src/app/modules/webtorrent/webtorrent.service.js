"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webtorrent_1 = require("webtorrent");
var storage_1 = require("../../services/storage");
var is_mobile_1 = require("../../helpers/is-mobile");
var is_safari_1 = require("../../helpers/is-safari");
exports.MAX_CONNS = 55;
function getInfoHash(value) {
    if (typeof value !== 'string') {
        return value && value.toString ? value.toString() : '???';
    }
    else if (/^[a-f0-9]+$/.test) {
        return value;
    }
    else if (value.indexOf('magnet:') !== 0) {
        return value + " [?]";
    }
    return value.split('?')[1].split('&').find(function (q) { return q.startsWith('xt='); }).substr(3);
}
exports.getInfoHash = getInfoHash;
var log = function (magnetUri) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return console.log.apply(console, ["[WebTorrent " + getInfoHash(magnetUri) + "]"].concat(args));
};
var WebtorrentService = /** @class */ (function () {
    function WebtorrentService(storage) {
        this.storage = storage;
        this.torrentRefs = {};
        this.torrentPurgeTimers = {};
        if (!this.isBrowserSupported() && !this.storage.get('webtorrent:disabled')) {
            this.storage.set('webtorrent:disabled', JSON.stringify(true));
        }
    }
    // Life-cycle
    WebtorrentService.prototype.setUp = function (maxConns) {
        if (maxConns === void 0) { maxConns = exports.MAX_CONNS; }
        if (this.client) {
            this.destroy();
        }
        this.setUpSupport();
        if (this.isSupported() && this.isEnabled()) {
            this.client = new webtorrent_1.default({
                maxConns: maxConns,
                webSeeds: true,
            });
            this.client.on('error', function (err) {
                console.error('Webtorrent client', err);
            });
            // TODO: Setup global event listeners, if needed
        }
        return this;
    };
    WebtorrentService.prototype.destroy = function () {
        var _this = this;
        var client = this.client;
        this.client = void 0;
        this.torrentRefs = {};
        for (var magnetUri in this.torrentPurgeTimers) {
            clearTimeout(this.torrentPurgeTimers[magnetUri]);
            delete this.torrentPurgeTimers[magnetUri];
        }
        if (!client) {
            return Promise.resolve(this);
        }
        return new Promise(function (resolve, reject) {
            client.destroy(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(_this);
                }
            });
        });
    };
    // Enable/Disable; Support
    WebtorrentService.prototype.isEnabled = function () {
        if (!window.Opspot.user)
            return false;
        var enabled = window.Opspot.user.p2p_media_enabled;
        return enabled && this.isBrowserSupported();
    };
    WebtorrentService.prototype.setEnabled = function (enabled) {
        var current = this.isEnabled();
        if (current && !enabled) {
            this.destroy();
        }
        else if (!current && enabled) {
            this.setUp();
        }
        return this;
    };
    WebtorrentService.prototype.setUpSupport = function () {
        this.supported = ('MediaStream' in window) && webtorrent_1.default.WEBRTC_SUPPORT;
        return this;
    };
    WebtorrentService.prototype.isBrowserSupported = function () {
        return !is_mobile_1.default() && !is_safari_1.default();
    };
    WebtorrentService.prototype.isSupported = function () {
        return this.isEnabled() && this.supported;
    };
    WebtorrentService.prototype.isReady = function () {
        return this.isSupported() && !!this.client;
    };
    // Torrent Manager
    WebtorrentService.prototype.add = function (torrentData, infoHash) {
        var _this = this;
        log(infoHash, 'Trying to add');
        if (!this.torrentRefs[infoHash]) {
            this.torrentRefs[infoHash] = 0;
        }
        this.torrentRefs[infoHash]++;
        var current = this.client.get(infoHash);
        if (current) {
            log(infoHash, 'Already exists');
            return Promise.resolve(current);
        }
        return new Promise(function (resolve, reject) {
            log(infoHash, 'Adding new');
            try {
                var torrent = _this.client.add(torrentData, function (torrent) { return resolve(torrent); });
                torrent.on('error', function (err) {
                    console.error('Torrent error', infoHash, err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    WebtorrentService.prototype.remove = function (infoHash) {
        var _this = this;
        log(infoHash, 'Trying to remove');
        if (this.torrentRefs[infoHash] && this.torrentRefs[infoHash] > 0) {
            this.torrentRefs[infoHash]--;
        }
        if (!this.torrentRefs[infoHash]) {
            log(infoHash, 'No references, added to purge timer');
            if (this.torrentPurgeTimers[infoHash]) {
                clearTimeout(this.torrentPurgeTimers[infoHash]);
            }
            this.torrentPurgeTimers[infoHash] = setTimeout(function () { return _this.purge(infoHash); }, 30000);
            this.torrentRefs[infoHash] = 0;
        }
    };
    WebtorrentService.prototype.get = function (infoHash) {
        return this.client.get(infoHash);
    };
    WebtorrentService.prototype.purge = function (infoHash) {
        log(infoHash, 'Trying to purge');
        if (!this.torrentRefs[infoHash]) {
            log(infoHash, 'No references, purging');
            this.client.remove(infoHash);
        }
    };
    // DI
    WebtorrentService._ = function (storage) {
        return new WebtorrentService(storage);
    };
    WebtorrentService._deps = [storage_1.Storage];
    return WebtorrentService;
}());
exports.WebtorrentService = WebtorrentService;
//# sourceMappingURL=webtorrent.service.js.map