"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentServiceMock = new function () {
    var _this = this;
    this.container = null;
    this.accessId = null;
    this.hidden = false;
    this.mature = false;
    this.hasFile = false;
    this.progress = 0;
    this.preview = '';
    this.getMime = '';
    this.rich = false;
    this.meta = {};
    this.preview = '';
    this.blur = false;
    this.load = jasmine.createSpy('load').and.stub();
    this.setContainer = jasmine.createSpy('setContainer').and.callFake(function (container) {
        _this.container = container;
    });
    this.getContainer = jasmine.createSpy('getContainer').and.callFake(function () {
        return _this.container;
    });
    this.setAccessId = jasmine.createSpy('setAccessId').and.callFake(function (accessId) {
        _this.accessId = accessId;
    });
    this.setHidden = jasmine.createSpy('setHidden').and.callFake(function (hidden) {
        _this.hidden = hidden;
    });
    this.isHidden = jasmine.createSpy('isHidden').and.callFake(function () {
        return _this.hidden;
    });
    this.setMature = jasmine.createSpy('setMature').and.callFake(function (mature) {
        _this.mature = mature;
    });
    this.isMature = jasmine.createSpy('isMature').and.callFake(function () {
        return !!_this.mature;
    });
    this.toggleMature = jasmine.createSpy('toggleMature').and.callFake(function () {
        _this.mature = !!_this.mature ? 0 : 1;
    });
    this.upload = jasmine.createSpy('upload').and.stub();
    this.remove = jasmine.createSpy('remove').and.stub();
    this.has = jasmine.createSpy('has').and.callFake(function () {
    });
    this.hasFile = jasmine.createSpy('hasFile').and.callFake(function () {
        return _this.hasFile;
    });
    this.getUploadProgress = jasmine.createSpy('getUploadProgress').and.callFake(function () {
        return _this.progress;
    });
    this.getPreview = jasmine.createSpy('getPreview').and.stub();
    this.getMime = jasmine.createSpy('getMime').and.stub();
    this.isRich = jasmine.createSpy('isRich').and.callFake(function () {
        return _this.rich;
    });
    this.getMeta = jasmine.createSpy('getMeta').and.stub();
    this.exportMeta = jasmine.createSpy('exportMeta').and.returnValue({});
    this.resetRich = jasmine.createSpy('resetRich').and.stub();
    this.preview = jasmine.createSpy('preview').and.stub();
    this.parseMaturity = jasmine.createSpy('parseMaturity').and.stub();
    this.isForcefullyShown = jasmine.createSpy('isForcefullyShown').and.stub();
    this.shouldBeBlurred = jasmine.createSpy('shouldBeBlurred').and.callFake(function () {
        return _this.blur;
    });
    this.checkFileType = jasmine.createSpy('checkFileType').and.stub();
};
//# sourceMappingURL=attachment-service-mock.spec.js.map