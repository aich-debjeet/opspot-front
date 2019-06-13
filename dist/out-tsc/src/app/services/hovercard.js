"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HovercardService = /** @class */ (function () {
    function HovercardService(client, cache) {
        this.client = client;
        this.cache = cache;
        this.shown = false;
        this.guid = '';
        this.data = null;
        this.anchor = {
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto'
        };
        this.sticky = false;
    }
    HovercardService._ = function (client, cache) {
        return new HovercardService(client, cache);
    };
    HovercardService.prototype.show = function (guid, elem, anchor) {
        var _this = this;
        if (!guid) {
            return;
        }
        this.shown = true;
        this.unstick();
        this.setAnchor(elem, anchor);
        if (this.guid === guid) {
            return;
        }
        this.guid = guid;
        var data = this.cache.get("hovercard-" + this.guid);
        if (data === false) {
            // Still fetching
            return;
        }
        else if (data) {
            this.data = data;
            return;
        }
        this.cache.set("hovercard-" + this.guid, false);
        var currentGuid = this.guid; // Cache parameter scoping (`this` might change)
        this.client.get("api/v1/entities/entity/" + this.guid, {})
            .then(function (response) {
            if (response.entity) {
                _this.cache.set("hovercard-" + currentGuid, response.entity);
                if (_this.guid === response.entity.guid) {
                    _this.data = response.entity;
                }
            }
            else {
                _this.cache.set("hovercard-" + currentGuid, undefined);
            }
        })
            .catch(function (e) {
            _this.cache.set("hovercard-" + currentGuid, undefined);
        });
    };
    HovercardService.prototype.hide = function (guid) {
        if (this.guid !== guid || this.sticky) {
            return;
        }
        this.guid = '';
        this.shown = false;
        this.data = null;
    };
    HovercardService.prototype.stick = function (guid) {
        if (this.guid !== guid) {
            return;
        }
        this.sticky = true;
    };
    HovercardService.prototype.unstick = function () {
        this.sticky = false;
    };
    HovercardService.prototype.setAnchor = function (elem, anchor) {
        if (!elem.getClientRects().length) {
            // dettached DOM element
            return;
        }
        var rect = elem.getBoundingClientRect();
        if (!rect.width && !rect.height) {
            // display: none
            return;
        }
        var doc = elem.ownerDocument.documentElement, docW = doc.clientWidth, docH = doc.clientHeight, top = rect.top + window.pageYOffset - doc.clientTop, left = rect.left + window.pageXOffset - doc.clientLeft, right = left + rect.width, bottom = top + rect.height, yPadding = 4;
        if (anchor.indexOf('left') !== -1) {
            this.anchor.left = 'auto';
            this.anchor.right = docW - left + yPadding;
        }
        else { // right: default
            this.anchor.right = 'auto';
            this.anchor.left = right + yPadding;
        }
        if (anchor.indexOf('bottom') !== -1) {
            this.anchor.top = 'auto';
            this.anchor.bottom = docH - top - rect.height;
        }
        else { // top: default
            this.anchor.bottom = 'auto';
            this.anchor.top = top;
        }
    };
    return HovercardService;
}());
exports.HovercardService = HovercardService;
//# sourceMappingURL=hovercard.js.map