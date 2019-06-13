"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RichEmbedService = /** @class */ (function () {
    function RichEmbedService(client) {
        this.client = client;
    }
    RichEmbedService._ = function (client) {
        return new RichEmbedService(client);
    };
    // Soundcloud
    RichEmbedService.prototype.soundcloud = function (url, maxheight) {
        if (maxheight === void 0) { maxheight = 320; }
        return this.client.get('api/v1/newsfeed/oembed/soundcloud', {
            url: url,
            maxheight: maxheight
        });
    };
    return RichEmbedService;
}());
exports.RichEmbedService = RichEmbedService;
//# sourceMappingURL=rich-embed.js.map