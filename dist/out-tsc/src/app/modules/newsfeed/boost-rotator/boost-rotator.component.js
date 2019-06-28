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
var scroll_1 = require("../../../services/ux/scroll");
var api_1 = require("../../../services/api");
var storage_1 = require("../../../services/storage");
var session_1 = require("../../../services/session");
var router_1 = require("@angular/router");
var newsfeed_service_1 = require("../services/newsfeed.service");
var newsfeed_boost_service_1 = require("../newsfeed-boost.service");
var settings_service_1 = require("../../settings/settings.service");
var NewsfeedBoostRotatorComponent = /** @class */ (function () {
    function NewsfeedBoostRotatorComponent(session, router, client, scroll, newsfeedService, settingsService, storage, element, service, cd) {
        var _this = this;
        this.session = session;
        this.router = router;
        this.client = client;
        this.scroll = scroll;
        this.newsfeedService = newsfeedService;
        this.settingsService = settingsService;
        this.storage = storage;
        this.element = element;
        this.service = service;
        this.cd = cd;
        this.boosts = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.running = false;
        this.paused = false;
        this.interval = 3;
        this.currentPosition = 0;
        this.lastTs = Date.now();
        this.rating = 2; //default to Safe Mode Off
        this.ratingMenuToggle = false;
        this.plus = false;
        this.disabled = false;
        this.subscriptions = [
            this.settingsService.ratingChanged.subscribe(function (event) { return _this.onRatingChanged(event); }),
            this.service.enableChanged.subscribe(function (event) { return _this.onEnableChanged(event); }),
            this.service.pauseChanged.subscribe(function (event) { return _this.onPauseChanged(event); }),
            this.service.explicitChanged.subscribe(function (event) { return _this.onExplicitChanged(event); })
        ];
    }
    NewsfeedBoostRotatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rating = this.session.getLoggedInUser().boost_rating;
        this.plus = this.session.getLoggedInUser().plus;
        this.disabled = !this.service.isBoostEnabled();
        this.load();
        this.scroll_listener = this.scroll.listenForView().subscribe(function () { return _this.isVisible(); });
        this.paused = this.service.isBoostPaused();
    };
    /**
     * Load newsfeed
     */
    NewsfeedBoostRotatorComponent.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.inProgress) {
                return reject(false);
            }
            _this.inProgress = true;
            if (_this.storage.get('boost:offset:rotator')) {
                _this.offset = _this.storage.get('boost:offset:rotator');
            }
            var show = 'all';
            if (!_this.channel || !_this.channel.merchant) {
                show = 'points';
            }
            _this.client.get('api/v1/boost/fetch/newsfeed', {
                limit: 10,
                rating: _this.rating,
                offset: _this.offset,
                show: show
            })
                .then(function (response) {
                if (!response.boosts) {
                    _this.inProgress = false;
                    return reject(false);
                }
                _this.boosts = _this.boosts.concat(response.boosts);
                if (_this.boosts.length >= 40) {
                    _this.boosts.splice(0, 20);
                    _this.currentPosition = 0;
                }
                if (!_this.running) {
                    _this.recordImpression(_this.currentPosition, true);
                    _this.start();
                    _this.isVisible();
                }
                _this.offset = response['load-next'];
                _this.storage.set('boost:offset:rotator', _this.offset);
                _this.inProgress = false;
                return resolve(true);
            })
                .catch(function (e) {
                _this.inProgress = false;
                return reject();
            });
        });
    };
    NewsfeedBoostRotatorComponent.prototype.onExplicitChanged = function (value) {
        this.load();
    };
    NewsfeedBoostRotatorComponent.prototype.onPauseChanged = function (value) {
        console.warn('on pause changed');
        this.paused = value;
    };
    NewsfeedBoostRotatorComponent.prototype.onRatingChanged = function (rating) {
        this.rating = rating;
        this.boosts = [];
        this.load();
    };
    NewsfeedBoostRotatorComponent.prototype.ratingMenuHandler = function () {
        this.ratingMenuToggle = !this.ratingMenuToggle;
    };
    NewsfeedBoostRotatorComponent.prototype.start = function () {
        var _this = this;
        if (this.rotator)
            window.clearInterval(this.rotator);
        this.running = true;
        this.rotator = setInterval(function (e) {
            if (_this.paused) {
                return;
            }
            _this.next();
            //this.recordImpression(this.currentPosition);
        }, this.interval * 1000);
    };
    NewsfeedBoostRotatorComponent.prototype.isVisible = function () {
        var bounds = this.element.nativeElement.getBoundingClientRect();
        if (bounds.top > 0) {
            //console.log('[rotator]: in view', this.rotator);
            if (!this.running)
                this.start();
        }
        else {
            console.log('[rotator]: out of view', this.rotator);
            if (this.running) {
                this.running = false;
                window.clearInterval(this.rotator);
            }
        }
    };
    NewsfeedBoostRotatorComponent.prototype.recordImpression = function (position, force) {
        //ensure was seen for at least 1 second
        if ((Date.now() > this.lastTs + 1000 || force) && this.boosts[position].boosted_guid) {
            this.newsfeedService.recordView(this.boosts[position], true, this.channel);
        }
        this.lastTs = Date.now();
        window.localStorage.setItem('boost-rotator-offset', this.boosts[position].boosted_guid);
    };
    NewsfeedBoostRotatorComponent.prototype.active = function () {
        this.isVisible();
    };
    NewsfeedBoostRotatorComponent.prototype.inActive = function () {
        this.running = false;
        window.clearInterval(this.rotator);
    };
    NewsfeedBoostRotatorComponent.prototype.mouseOver = function () {
        this.running = false;
        window.clearInterval(this.rotator);
    };
    NewsfeedBoostRotatorComponent.prototype.mouseOut = function () {
        this.isVisible();
    };
    NewsfeedBoostRotatorComponent.prototype.prev = function () {
        if (this.currentPosition <= 0) {
            this.currentPosition = this.boosts.length - 1;
        }
        else {
            this.currentPosition--;
        }
        this.recordImpression(this.currentPosition, false);
    };
    NewsfeedBoostRotatorComponent.prototype.next = function () {
        var _this = this;
        this.activities.toArray()[this.currentPosition].hide();
        if (this.currentPosition + 1 > this.boosts.length - 1) {
            //this.currentPosition = 0;
            this.load()
                .then(function () {
                _this.currentPosition++;
            })
                .catch(function () {
                _this.currentPosition = 0;
            });
        }
        else {
            this.currentPosition++;
        }
        this.recordImpression(this.currentPosition, false);
    };
    NewsfeedBoostRotatorComponent.prototype.onEnableChanged = function (value) {
        this.disabled = !value;
        this.detectChanges();
    };
    NewsfeedBoostRotatorComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    NewsfeedBoostRotatorComponent.prototype.ngOnDestroy = function () {
        if (this.rotator)
            window.clearInterval(this.rotator);
        this.scroll.unListen(this.scroll_listener);
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.ViewChildren('activities'),
        __metadata("design:type", core_1.QueryList)
    ], NewsfeedBoostRotatorComponent.prototype, "activities", void 0);
    NewsfeedBoostRotatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-newsfeed--boost-rotator',
            host: {
                '(window:blur)': 'inActive()',
                '(window:focus)': 'active()',
                '(mouseover)': 'mouseOver()',
                '(mouseout)': 'mouseOut()'
            },
            inputs: ['interval', 'channel'],
            templateUrl: 'boost-rotator.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            router_1.Router,
            api_1.Client,
            scroll_1.ScrollService,
            newsfeed_service_1.NewsfeedService,
            settings_service_1.SettingsService,
            storage_1.Storage,
            core_1.ElementRef,
            newsfeed_boost_service_1.NewsfeedBoostService,
            core_1.ChangeDetectorRef])
    ], NewsfeedBoostRotatorComponent);
    return NewsfeedBoostRotatorComponent;
}());
exports.NewsfeedBoostRotatorComponent = NewsfeedBoostRotatorComponent;
//# sourceMappingURL=boost-rotator.component.js.map