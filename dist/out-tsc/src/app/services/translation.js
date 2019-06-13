"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_1 = require("./api");
var storage_1 = require("./storage");
var TranslationService = /** @class */ (function () {
    function TranslationService(clientService, storage) {
        this.clientService = clientService;
        this.storage = storage;
        this.defaultLanguage = 'en'; // TODO: Set to get translated names (when i18n is in place)
        this.load();
    }
    TranslationService._ = function (client, storage) {
        return new TranslationService(client, storage);
    };
    TranslationService.prototype.getLanguages = function () {
        var _this = this;
        if (!this.languagesReady) {
            var cached = this.storage.get("translation:languages:" + this.defaultLanguage);
            if (cached) {
                cached = JSON.parse(cached);
            }
            if (cached && cached.length > 0) {
                this.languagesReady = Promise.resolve(cached);
            }
            else {
                this.languagesReady = this.clientService.get("api/v1/translation/languages", { target: this.defaultLanguage })
                    .then(function (response) {
                    if (!response.languages) {
                        throw new Error('No languages array');
                    }
                    _this.storage.set("translation:languages:" + _this.defaultLanguage, JSON.stringify(response.languages));
                    _this.storage.set("translation:userDefault", response.userDefault);
                    return response.languages;
                })
                    .catch(function (e) { return []; });
            }
        }
        return this.languagesReady;
    };
    TranslationService.prototype.getUserDefaultLanguage = function () {
        var _this = this;
        return this.getLanguages()
            .then(function () {
            var lang = _this.storage.get("translation:userDefault");
            if (lang === 'null') {
                // Some users have the default language cache tainted
                lang = null;
            }
            return lang;
        });
    };
    TranslationService.prototype.purgeLanguagesCache = function () {
        this.languagesReady = void 0;
        this.storage.set("translation:languages:" + this.defaultLanguage, '');
        this.storage.set("translation:userDefault", null);
    };
    TranslationService.prototype.getLanguageName = function (query) {
        if (!query) {
            return Promise.resolve('None');
        }
        return this.getLanguages()
            .then(function (languages) {
            var result = 'Unknown';
            languages.forEach(function (language) {
                if (language.language === query) {
                    result = language.name;
                }
            });
            return result;
        });
    };
    TranslationService.prototype.isTranslatable = function (entity) {
        if (typeof entity !== 'object') {
            return false;
        }
        if (!entity.guid) {
            return false;
        }
        // Message should exist and have content
        if (typeof entity.message !== 'undefined' && entity.message) {
            return true;
        }
        else if (entity.type === 'comment' && entity.description) {
            return true;
        }
        else if (entity.custom_type &&
            ((typeof entity.title !== 'undefined' && entity.title) ||
                (typeof entity.blurb !== 'undefined' && entity.blurb))) {
            return true;
        }
        return false;
    };
    TranslationService.prototype.translate = function (guid, language) {
        var _this = this;
        return this.clientService.get("api/v1/translation/translate/" + guid, { target: language })
            .then(function (response) {
            // Optimistically set default language
            if (!_this.storage.get("translation:userDefault")) {
                _this.storage.set("translation:userDefault", language);
            }
            if (response.purgeLanguagesCache) {
                _this.purgeLanguagesCache();
            }
            if (!response.translation) {
                throw new Error('No translation available');
            }
            return response.translation;
        });
    };
    TranslationService.prototype.load = function () {
        this.getLanguages(); // Initial caching
    };
    TranslationService = __decorate([
        __param(0, core_1.Inject(api_1.Client)),
        __param(1, core_1.Inject(storage_1.Storage)),
        __metadata("design:paramtypes", [api_1.Client,
            storage_1.Storage])
    ], TranslationService);
    return TranslationService;
}());
exports.TranslationService = TranslationService;
//# sourceMappingURL=translation.js.map