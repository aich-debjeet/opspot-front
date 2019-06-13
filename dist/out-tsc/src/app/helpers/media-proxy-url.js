"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mediaProxyUrl(url, size) {
    if (size === void 0) { size = 1920; }
    if (!url || typeof url !== 'string') {
        return url;
    }
    var encodedUrl = encodeURIComponent(url);
    return window.Opspot.cdn_url + "api/v2/media/proxy?size=" + size + "&src=" + encodedUrl;
}
exports.default = mediaProxyUrl;
//# sourceMappingURL=media-proxy-url.js.map