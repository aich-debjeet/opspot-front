"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("../../../services/storage");
var MessengerSounds = /** @class */ (function () {
    function MessengerSounds() {
        this.storage = new storage_1.Storage();
        this.sounds = {
            new: new Audio(window.Opspot.cdn_url + 'src/plugins/Messenger/sounds/newmsg.mp3'),
            send: new Audio(window.Opspot.cdn_url + 'src/plugins/Messenger/sounds/sndmsg.mp3'),
        };
    }
    MessengerSounds.prototype.play = function (sound) {
        if (this.canPlay())
            this.sounds[sound].play();
    };
    MessengerSounds.prototype.canPlay = function () {
        if (this.storage.get('muted'))
            return false;
        return true;
    };
    MessengerSounds.prototype.mute = function () {
        this.storage.set('muted', true);
    };
    MessengerSounds.prototype.unmute = function () {
        this.storage.destroy('muted');
    };
    return MessengerSounds;
}());
exports.MessengerSounds = MessengerSounds;
//# sourceMappingURL=service.js.map