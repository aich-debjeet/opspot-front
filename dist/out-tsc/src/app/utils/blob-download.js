"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function blobDownload(body, options, filename) {
    var blob = new Blob([body], options);
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    }
    else {
        var link = document.createElement('a');
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
exports.blobDownload = blobDownload;
//# sourceMappingURL=blob-download.js.map