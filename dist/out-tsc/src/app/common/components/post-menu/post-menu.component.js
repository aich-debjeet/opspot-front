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
var session_1 = require("../../../services/session");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var client_1 = require("../../../services/api/client");
var creator_component_1 = require("../../../modules/report/creator/creator.component");
var service_1 = require("../../../modules/modals/signup/service");
var PostMenuComponent = /** @class */ (function () {
    function PostMenuComponent(session, client, cd, overlayModal, signupModal) {
        this.session = session;
        this.client = client;
        this.cd = cd;
        this.overlayModal = overlayModal;
        this.signupModal = signupModal;
        this.optionSelected = new core_1.EventEmitter();
        this.canDelete = false;
        this.isTranslatable = false;
        this.askForCategoriesWhenFeaturing = false;
        this.featuredCategory = 'not-selected';
        this.asyncFollow = false;
        this.asyncFollowInProgress = false;
        this.asyncBlockInProgress = false;
        this.asyncBlock = false;
        this.opened = false;
        this.shareToggle = false;
        this.deleteToggle = false;
        this.featureToggle = false;
        this.categories = [];
        this.initCategories();
    }
    PostMenuComponent.prototype.initCategories = function () {
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
            });
        }
    };
    PostMenuComponent.prototype.cardMenuHandler = function () {
        this.opened = !this.opened;
        this.asyncFollowFetch();
        this.asyncBlockFetch();
    };
    PostMenuComponent.prototype.asyncFollowFetch = function () {
        var _this = this;
        if (this.asyncFollow || this.asyncFollowInProgress) {
            return;
        }
        this.asyncFollowInProgress = true;
        this.detectChanges();
        this.client.get("api/v2/notifications/follow/" + this.entity.guid)
            .then(function (response) {
            _this.asyncFollowInProgress = false;
            _this.asyncFollow = true;
            _this.entity['is:following'] = !!response.postSubscription.following;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.asyncFollowInProgress = false;
            _this.detectChanges();
        });
    };
    PostMenuComponent.prototype.follow = function () {
        var _this = this;
        this.entity['is:following'] = true;
        this.client.put("api/v2/notifications/follow/" + this.entity.guid)
            .then(function (response) {
            if (response.done) {
                _this.entity['is:following'] = true;
                _this.detectChanges();
                return;
            }
            throw new Error('E_NOT_DONE');
        })
            .catch(function (e) {
            _this.entity['is:following'] = false;
            _this.detectChanges();
        });
        this.selectOption('follow');
    };
    PostMenuComponent.prototype.unfollow = function () {
        var _this = this;
        this.entity['is:following'] = false;
        this.client.delete("api/v2/notifications/follow/" + this.entity.guid)
            .then(function (response) {
            if (response.done) {
                _this.entity['is:following'] = false;
                _this.detectChanges();
                return;
            }
            throw new Error('E_NOT_DONE');
        })
            .catch(function (e) {
            _this.entity['is:following'] = true;
            _this.detectChanges();
        });
        this.selectOption('unfollow');
    };
    PostMenuComponent.prototype.asyncBlockFetch = function () {
        var _this = this;
        if (this.asyncBlock || this.asyncBlockInProgress) {
            return;
        }
        this.asyncBlockInProgress = true;
        this.detectChanges();
        //Owner
        this.client.get("api/v1/block/" + this.entity.ownerObj.guid)
            .then(function (response) {
            _this.asyncBlockInProgress = false;
            _this.asyncBlock = response.blocked;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.asyncBlockInProgress = false;
            _this.detectChanges();
        });
    };
    PostMenuComponent.prototype.unBlock = function () {
        var _this = this;
        this.client.delete('api/v1/block/' + this.entity.ownerObj.guid, {})
            .then(function (response) {
            _this.asyncBlock = false;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.asyncBlock = true;
            _this.detectChanges();
        });
        this.selectOption('block');
    };
    PostMenuComponent.prototype.block = function () {
        var _this = this;
        this.client.put('api/v1/block/' + this.entity.ownerObj.guid, {})
            .then(function (response) {
            _this.asyncBlock = true;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.asyncBlock = false;
            _this.detectChanges();
        });
        this.selectOption('block');
    };
    PostMenuComponent.prototype.share = function () {
        this.shareToggle = true;
        this.selectOption('share');
    };
    PostMenuComponent.prototype.feature = function () {
        var _this = this;
        if (this.askForCategoriesWhenFeaturing && !this.featureToggle) {
            this.featureToggle = true;
            return;
        }
        this.entity.featured = true;
        this.client.put('api/v1/admin/feature/' + this.entity.guid + '/' + this.featuredCategory)
            .catch(function () {
            _this.entity.featured = false;
            _this.detectChanges();
        });
        this.selectOption('feature');
    };
    PostMenuComponent.prototype.unFeature = function () {
        var _this = this;
        this.entity.featured = false;
        this.client.delete('api/v1/admin/feature/' + this.entity.guid)
            .catch(function () {
            _this.entity.featured = true;
            _this.detectChanges();
        });
        this.selectOption('unfeature');
    };
    PostMenuComponent.prototype.delete = function () {
        this.deleteToggle = false;
        this.selectOption('delete');
    };
    PostMenuComponent.prototype.report = function () {
        console.warn(this.user, this.entity, this.session.getLoggedInUser().guid, this.entity.ownerObj.guid);
        this.overlayModal.create(creator_component_1.ReportCreatorComponent, this.entity)
            .present();
        this.selectOption('report');
    };
    PostMenuComponent.prototype.setExplicit = function (explicit) {
        this.selectOption(explicit ? 'set-explicit' : 'remove-explicit');
    };
    PostMenuComponent.prototype.monetize = function () {
        var _this = this;
        if (this.entity.monetized)
            return this.unMonetize();
        this.entity.monetized = true;
        this.client.put('api/v1/monetize/' + this.entity.guid, {})
            .catch(function (e) {
            _this.entity.monetized = false;
        });
    };
    PostMenuComponent.prototype.unMonetize = function () {
        var _this = this;
        this.entity.monetized = false;
        this.client.delete('api/v1/monetize/' + this.entity.guid, {})
            .catch(function (e) {
            _this.entity.monetized = true;
        });
    };
    PostMenuComponent.prototype.subscribe = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            this.signupModal.setSubtitle('You need to have a channel in order to subscribe').open();
            return false;
        }
        this.user.subscribed = true;
        this.client.post('api/v1/subscribe/' + this.user.guid, {})
            .then(function (response) {
            if (response && response.error) {
                throw 'error';
            }
            _this.user.subscribed = true;
        })
            .catch(function (e) {
            _this.user.subscribed = false;
            alert('You can\'t subscribe to this user.');
        });
    };
    PostMenuComponent.prototype.unSubscribe = function () {
        var _this = this;
        this.user.subscribed = false;
        this.client.delete('api/v1/subscribe/' + this.user.guid, {})
            .then(function (response) {
            _this.user.subscribed = false;
        })
            .catch(function (e) {
            _this.user.subscribed = true;
        });
    };
    PostMenuComponent.prototype.selectOption = function (option) {
        this.optionSelected.emit(option);
        this.opened = false;
        this.detectChanges();
    };
    PostMenuComponent.prototype.onModalClose = function () {
        this.featureToggle = false;
    };
    PostMenuComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
    };
    PostMenuComponent.prototype.setRating = function (rating) {
        var _this = this;
        this.client.post("api/v1/admin/rating/" + this.entity.guid + "/" + rating, {})
            .then(function (response) {
            _this.entity.rating = rating;
            _this.detectChanges();
        });
        this.selectOption('rating');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponent.prototype, "entity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PostMenuComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PostMenuComponent.prototype, "optionSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PostMenuComponent.prototype, "canDelete", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PostMenuComponent.prototype, "isTranslatable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PostMenuComponent.prototype, "askForCategoriesWhenFeaturing", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponent.prototype, "user", void 0);
    PostMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-post-menu',
            templateUrl: 'post-menu.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [session_1.Session, client_1.Client, core_1.ChangeDetectorRef, overlay_modal_1.OverlayModalService, service_1.SignupModalService])
    ], PostMenuComponent);
    return PostMenuComponent;
}());
exports.PostMenuComponent = PostMenuComponent;
//# sourceMappingURL=post-menu.component.js.map