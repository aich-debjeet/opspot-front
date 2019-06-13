"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("../../../services/storage");
var MessengerEncryptionService = /** @class */ (function () {
    function MessengerEncryptionService(client, storage) {
        this.client = client;
        this.storage = storage;
        this.reKeying = false;
        this.on = false;
        this.setup = false;
    }
    MessengerEncryptionService._ = function (client) {
        return new MessengerEncryptionService(client, new storage_1.Storage());
    };
    MessengerEncryptionService.prototype.isOn = function () {
        //if(!this.on){
        this.on = !!this.storage.get('encryption-unlocked');
        //}
        return this.on;
    };
    MessengerEncryptionService.prototype.unlock = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.post('api/v2/messenger/keys/unlock', { password: password })
                .then(function (response) {
                _this.storage.set('encryption-unlocked', true);
                _this.on = true;
                resolve();
            })
                .catch(function () {
                reject();
            });
        });
    };
    MessengerEncryptionService.prototype.isSetup = function () {
        //TODO: this won't work on nativescript, so move away from window var.
        //if(!this.setup){
        this.setup = window.Opspot.user.chat;
        //}
        return this.setup;
    };
    MessengerEncryptionService.prototype.doSetup = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.post('api/v2/messenger/keys/setup', { password: password, download: false })
                .then(function (response) {
                _this.storage.set('encryption-unlocked', true);
                _this.setup = true;
                _this.on = true;
                resolve();
            })
                .catch(function () {
                reject();
            });
        });
    };
    MessengerEncryptionService.prototype.rekey = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.post('api/v2/messenger/keys/setup', { password: password, download: false })
                .then(function (response) {
                _this.storage.set('encryption-unlocked', true);
                _this.setup = true;
                _this.on = true;
                _this.reKeying = false;
                resolve();
            })
                .catch(function () {
                reject();
            });
        });
    };
    MessengerEncryptionService.prototype.logout = function () {
        this.storage.destroy('encryption-unlocked');
        this.on = false;
    };
    return MessengerEncryptionService;
}());
exports.MessengerEncryptionService = MessengerEncryptionService;
//# sourceMappingURL=encryption.service.js.map