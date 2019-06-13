"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function base64ToBlob(encodedString) {
    var byteString = atob(encodedString);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var byteArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer]);
}
exports.default = base64ToBlob;
//# sourceMappingURL=base64-to-blob.js.map