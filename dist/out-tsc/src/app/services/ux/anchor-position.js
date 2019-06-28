"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnchorPosition = /** @class */ (function () {
    function AnchorPosition() {
    }
    AnchorPosition.getFixed = function (element, anchor) {
        if (!element.getClientRects().length) {
            // dettached DOM element
            return false;
        }
        var rect = element.getBoundingClientRect();
        if (typeof rect.top === 'undefined') {
            return false;
        }
        var result = {
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto'
        };
        if (anchor.indexOf('right') > -1) {
            result.right = window.innerWidth - rect.right;
        }
        else { // Default: 'left'
            result.left = rect.left;
        }
        if (anchor.indexOf('top') > -1) {
            result.bottom = window.innerHeight - rect.top;
        }
        else { // Default: 'bottom'
            result.top = rect.top + rect.height;
        }
        return result;
    };
    return AnchorPosition;
}());
exports.AnchorPosition = AnchorPosition;
//# sourceMappingURL=anchor-position.js.map