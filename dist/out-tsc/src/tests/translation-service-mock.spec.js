"use strict";
// TODO actually implement these mocks when necessary for testing
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationServiceMock = new function () {
    this.getLanguages = jasmine.createSpy('getLanguages').and.stub();
    this.getUserDefaultLanguage = jasmine.createSpy('getUserDefaultLanguage').and.stub();
    this.purgeLanguagesCache = jasmine.createSpy('purgeLanguagesCache').and.stub();
    this.getLanguageName = jasmine.createSpy('getLanguageName').and.stub();
    this.isTranslatable = jasmine.createSpy('isTranslatable').and.stub();
    this.translate = jasmine.createSpy('translate').and.stub();
};
//# sourceMappingURL=translation-service-mock.spec.js.map