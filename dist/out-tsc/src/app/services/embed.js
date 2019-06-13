"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbedService = /** @class */ (function () {
    function EmbedService() {
    }
    EmbedService._ = function () {
        return new EmbedService();
    };
    EmbedService.prototype.getIframeFromObject = function (object) {
        if (typeof object !== 'object') {
            return '';
        }
        var embeddable = ['object:video'];
        if (embeddable.indexOf(object.type + ":" + object.subtype) > -1) {
            return this.getIframe(object.guid);
        }
        if (object.custom_type === 'video') {
            return this.getIframe(object.custom_data.guid);
        }
        return '';
    };
    EmbedService.prototype.getIframe = function (guid, opts) {
        if (opts === void 0) { opts = {}; }
        if (!guid) {
            return '';
        }
        var width = opts.width || 640, height = opts.height || 320;
        return "<iframe src=\"" + this.getUrl(guid) + "\" width=\"" + width + "\" height=\"" + height + "\" frameborder=\"0\" allowfullscreen=\"1\"></iframe>";
    };
    EmbedService.prototype.getUrl = function (guid) {
        return window.Opspot.site_url + "api/v1/embed/" + guid;
    };
    return EmbedService;
}());
exports.EmbedService = EmbedService;
//# sourceMappingURL=embed.js.map