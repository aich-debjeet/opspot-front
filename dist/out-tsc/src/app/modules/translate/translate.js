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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var translation_1 = require("../../services/translation");
var Translate = /** @class */ (function () {
    function Translate(translationService, changeDetectorRef) {
        this.translationService = translationService;
        this.changeDetectorRef = changeDetectorRef;
        this.onTranslateInit = new core_1.EventEmitter();
        this.onTranslate = new core_1.EventEmitter();
        this.onTranslateError = new core_1.EventEmitter();
        this.languagesInProgress = false;
        this.languagesError = false;
        this.preferredLanguages = [];
        this.languages = [];
        this.open = false;
        this.entity = {};
        this.translateEvent = new core_1.EventEmitter();
        this.translatable = false;
        this.translation = {
            translated: false,
            target: '',
            error: false,
            message: '',
            title: '',
            description: '',
            body: '',
            source: ''
        };
    }
    Object.defineProperty(Translate.prototype, "_open", {
        set: function (value) {
            var wasOpened = !this.open && value;
            this.open = value;
            if (wasOpened && !this.translation.translated) {
                this.onOpen();
            }
            else if (wasOpened) {
                this.changeDefaultLanguage();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Translate.prototype, "_entity", {
        set: function (value) {
            this.entity = value;
            this.translatable = this.translationService.isTranslatable(this.entity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Translate.prototype, "_translateEvent", {
        set: function (value) {
            var _this = this;
            if (this.translateEventSubscription) {
                this.translateEventSubscription.unsubscribe();
            }
            this.translateEvent = value;
            if (!value) {
                return;
            }
            this.translateEventSubscription = this.translateEvent.subscribe(function ($event) {
                _this.translate($event);
            });
        },
        enumerable: true,
        configurable: true
    });
    Translate.prototype.ngOnInit = function () {
        var _this = this;
        this.languagesInProgress = true;
        this.translationService.getLanguages()
            .then(function (languages) {
            _this.languagesInProgress = false;
            _this.parseLanguages(languages);
            _this.changeDetectorRef.markForCheck();
        })
            .catch(function (e) {
            _this.languagesInProgress = false;
            _this.languagesError = true;
            _this.changeDetectorRef.markForCheck();
            console.error('TranslateModal::onInit', e);
        });
    };
    Translate.prototype.ngOnDestroy = function () {
        if (this.translateEventSubscription) {
            this.translateEventSubscription.unsubscribe();
        }
    };
    Translate.prototype.onOpen = function () {
        var _this = this;
        this.translationService.getUserDefaultLanguage()
            .then(function (lang) {
            if (lang) {
                _this.select(lang);
            }
        });
    };
    Translate.prototype.changeDefaultLanguage = function () {
        this.translationService.purgeLanguagesCache();
        this.open = true;
    };
    Translate.prototype.parseLanguages = function (allLanguages) {
        var _this = this;
        this.preferredLanguages = [];
        this.languages = [];
        allLanguages.forEach(function (language) {
            if (language.isPreferred) {
                _this.preferredLanguages.push(language);
            }
            else {
                _this.languages.push(language);
            }
        });
    };
    Translate.prototype.select = function (language) {
        if (!language) {
            return;
        }
        var $event = {
            entity: this.entity,
            selected: language
        };
        this.onTranslateInit.emit($event);
        this.changeDetectorRef.markForCheck();
        this.translate($event);
    };
    Translate.prototype.translate = function ($event) {
        var _this = this;
        if ($event === void 0) { $event = {}; }
        if (!$event.selected) {
            return;
        }
        this.open = false;
        if (!this.translationService.isTranslatable(this.entity)) {
            return;
        }
        this.translation.target = '';
        this.translationService.getLanguageName($event.selected)
            .then(function (name) {
            _this.translation.target = name;
            _this.changeDetectorRef.markForCheck();
        });
        this.translationInProgress = true;
        this.translationService.translate(this.entity.guid, $event.selected)
            .then(function (translation) {
            _this.translationInProgress = false;
            _this.translation.source = null;
            for (var field in translation) {
                _this.translation.translated = true;
                _this.translation[field] = translation[field].content;
                if (_this.translation.source === null && translation[field].source) {
                    _this.translation.source = '';
                    _this.translationService.getLanguageName(translation[field].source)
                        .then(function (name) {
                        _this.translation.source = name;
                        _this.changeDetectorRef.markForCheck();
                    });
                }
            }
            _this.onTranslate.emit({
                entity: _this.entity,
                translation: _this.translation,
                selected: $event.selected
            });
            _this.changeDetectorRef.markForCheck();
        })
            .catch(function (e) {
            _this.translationInProgress = false;
            _this.translation.error = true;
            _this.onTranslateError.emit({
                entity: _this.entity,
                selected: $event.selected
            });
            _this.changeDetectorRef.markForCheck();
            console.error('translate()', e);
        });
    };
    Translate.prototype.hideTranslation = function () {
        if (!this.translation.translated) {
            return;
        }
        this.open = false;
        this.translation.translated = false;
        this.changeDetectorRef.markForCheck();
    };
    Translate = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-translate',
            inputs: ['_open: open', '_entity: entity', '_translateEvent: translateEvent'],
            outputs: ['onTranslateInit', 'onTranslate', 'onTranslateError'],
            exportAs: 'translate',
            templateUrl: 'translate.html'
        }),
        __metadata("design:paramtypes", [translation_1.TranslationService,
            core_1.ChangeDetectorRef])
    ], Translate);
    return Translate;
}());
exports.Translate = Translate;
//# sourceMappingURL=translate.js.map