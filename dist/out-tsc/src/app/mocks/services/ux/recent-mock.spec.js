"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentServiceMock = new function () {
    var _this = this;
    this.storage = {
        data: [],
        get: function (key) {
            return _this.storage.data[key];
        },
        set: function (key, value) {
            _this.storage.data[key] = value;
        }
    };
    // static reference
    this._ = jasmine.createSpy('_').and.stub();
    // public methods
    this.store = jasmine.createSpy('store').and.stub();
    this.fetch = jasmine.createSpy('fetch').and.stub();
    this.splice = jasmine.createSpy('splice').and.stub();
    // private methods
    this.read = jasmine.createSpy('read').and.stub();
    this.write = jasmine.createSpy('write').and.stub();
};
//# sourceMappingURL=recent-mock.spec.js.map