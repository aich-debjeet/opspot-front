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
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var onboarding_service_1 = require("../../onboarding/channel/onboarding.service");
var storage_1 = require("../../../services/storage");
var ChannelSidebar = /** @class */ (function () {
    function ChannelSidebar(client, upload, session, onboardingService, storage) {
        var _this = this;
        this.client = client;
        this.upload = upload;
        this.session = session;
        this.onboardingService = onboardingService;
        this.storage = storage;
        this.opspot = window.Opspot;
        this.filter = 'feed';
        this.isLocked = false;
        this.editing = false;
        this.errorMessage = '';
        this.amountOfTags = 0;
        this.tooManyTags = false;
        this.onboardingProgress = -1;
        this.changeEditing = new core_1.EventEmitter();
        //@todo make a re-usable city selection module to avoid duplication here
        this.cities = [];
        if (onboardingService && onboardingService.onClose)
            onboardingService.onClose.subscribe(function (progress) {
                _this.onboardingProgress = -1;
                _this.checkProgress();
            });
    }
    ChannelSidebar.prototype.ngOnInit = function () {
        this.checkProgress();
    };
    ChannelSidebar.prototype.checkProgress = function () {
        var _this = this;
        this.onboardingService.checkProgress().then(function () {
            _this.onboardingProgress = _this.onboardingService.completedPercentage;
        });
    };
    ChannelSidebar.prototype.showOnboarding = function () {
        this.onboardingService.onOpen.emit();
    };
    ChannelSidebar.prototype.shouldShowOnboardingProgress = function () {
        return this.session.isLoggedIn() &&
            this.session.getLoggedInUser().guid === this.user.guid &&
            !this.storage.get('onboarding_hide') &&
            this.onboardingProgress !== -1 &&
            this.onboardingProgress !== 100;
    };
    ChannelSidebar.prototype.hideOnboardingForcefully = function () {
        this.storage.set('onboarding_hide', '1');
    };
    ChannelSidebar.prototype.isOwner = function () {
        return this.session.getLoggedInUser().guid === this.user.guid;
    };
    ChannelSidebar.prototype.toggleEditing = function () {
        if (this.tooManyTags) {
            return;
        }
        this.changeEditing.next(!this.editing);
    };
    ChannelSidebar.prototype.upload_avatar = function (file) {
        var self = this;
        this.upload.post('api/v1/channel/avatar', [file], { filekey: 'file' })
            .then(function (response) {
            self.user.icontime = Date.now();
            if (window.Opspot.user)
                window.Opspot.user.icontime = Date.now();
        });
    };
    ChannelSidebar.prototype.findCity = function (q) {
        var _this = this;
        if (this.searching) {
            clearTimeout(this.searching);
        }
        this.searching = setTimeout(function () {
            _this.client.get('api/v1/geolocation/list', { q: q })
                .then(function (response) {
                _this.cities = response.results;
            });
        }, 100);
    };
    ChannelSidebar.prototype.setCity = function (row) {
        this.cities = [];
        if (row.address.city) {
            this.user.city = row.address.city;
        }
        if (row.address.town)
            this.user.city = row.address.town;
        if (window.Opspot)
            window.Opspot.user.city = this.user.city;
        this.client.post('api/v1/channel/info', {
            coordinates: row.lat + ',' + row.lon,
            city: window.Opspot.user.city
        });
    };
    ChannelSidebar.prototype.onTagsChange = function (tags) {
        this.amountOfTags = tags.length;
        if (this.amountOfTags > 5) {
            this.errorMessage = "You can only select up to 5 hashtags";
            this.tooManyTags = true;
        }
        else {
            this.tooManyTags = false;
            this.user.tags = tags;
            if (this.errorMessage === "You can only select up to 5 hashtags") {
                this.errorMessage = '';
            }
        }
    };
    ChannelSidebar.prototype.onTagsAdded = function (tags) { };
    ChannelSidebar.prototype.onTagsRemoved = function (tags) { };
    ChannelSidebar.prototype.setSocialProfile = function (value) {
        this.user.social_profiles = value;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChannelSidebar.prototype, "changeEditing", void 0);
    ChannelSidebar = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channel--sidebar',
            inputs: ['user', 'editing'],
            templateUrl: 'sidebar.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            api_1.Upload,
            session_1.Session,
            onboarding_service_1.ChannelOnboardingService,
            storage_1.Storage])
    ], ChannelSidebar);
    return ChannelSidebar;
}());
exports.ChannelSidebar = ChannelSidebar;
//# sourceMappingURL=sidebar.js.map