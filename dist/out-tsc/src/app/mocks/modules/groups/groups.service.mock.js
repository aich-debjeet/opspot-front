"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
exports.groupsServiceMock = new function () {
    this.group = new rxjs_1.BehaviorSubject(null);
    this.$group = this.group.asObservable();
};
//# sourceMappingURL=groups.service.mock.js.map