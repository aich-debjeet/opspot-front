"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.newsfeedServiceMock = new function () {
    var _this = this;
    this.onReloadFeed = new core_1.EventEmitter();
    this.reloadFeed = function () {
        _this.onReloadFeed.emit();
    };
};
//# sourceMappingURL=newsfeed-service.mock.js.map