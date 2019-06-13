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
var router_1 = require("@angular/router");
var session_1 = require("../../../services/session");
var api_1 = require("../../../services/api");
var third_party_networks_1 = require("../../../services/third-party-networks");
var SettingsGeneralComponent = /** @class */ (function () {
    function SettingsGeneralComponent(session, element, client, route, router, thirdpartynetworks) {
        this.session = session;
        this.element = element;
        this.client = client;
        this.route = route;
        this.router = router;
        this.thirdpartynetworks = thirdpartynetworks;
        this.error = '';
        this.changed = false;
        this.saved = false;
        this.inProgress = false;
        this.guid = '';
        this.mature = false;
        this.enabled_mails = true;
        this.languages = [];
        this.language = 'en';
        this.selectedCategories = [];
        this.openSessions = 1;
        this.opspot = window.Opspot;
        this.getCategories();
    }
    SettingsGeneralComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languages = [];
        for (var code in this.opspot.languages) {
            if (this.opspot.languages.hasOwnProperty(code)) {
                this.languages.push({
                    code: code,
                    name: this.opspot.languages[code],
                });
            }
        }
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['guid'] && params['guid'] === _this.session.getLoggedInUser().guid) {
                _this.load(true);
            }
            else {
                _this.load(false);
            }
            if (params['card'] && params['card'] !== '') {
                var el = _this.element.nativeElement.querySelector('.m-settings--' + params['card']);
                if (el) {
                    window.scrollTo(0, el.offsetTop - 64); // 64 comes from the topbar's height
                }
            }
        });
    };
    SettingsGeneralComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    SettingsGeneralComponent.prototype.load = function (remote) {
        var _this = this;
        if (remote === void 0) { remote = false; }
        if (!remote) {
            var user = this.session.getLoggedInUser();
            this.name = user.name;
        }
        this.client.get('api/v1/settings/' + this.guid)
            .then(function (response) {
            console.log('LOAD', response.channel);
            _this.email = response.channel.email;
            _this.mature = !!parseInt(response.channel.mature, 10);
            _this.enabled_mails = !parseInt(response.channel.disabled_emails, 10);
            _this.language = response.channel.language || 'en';
            _this.selectedCategories = response.channel.categories || [];
            _this.openSessions = response.channel.open_sessions || 1;
            _this.thirdpartynetworks.overrideStatus(response.thirdpartynetworks);
            if (window.Opspot.user) {
                window.Opspot.user.mature = _this.mature;
            }
            if (_this.selectedCategories.length > 0) {
                _this.selectedCategories.forEach(function (item, index, array) {
                    var i = _this.categories.findIndex(function (i) { return i.id === item; });
                    if (i !== -1)
                        _this.categories[i].selected = true;
                });
            }
        });
    };
    SettingsGeneralComponent.prototype.canSubmit = function () {
        if (!this.changed)
            return false;
        if (this.password && !this.password1 || this.password && !this.password2)
            return false;
        if (this.password1 && !this.password) {
            this.error = 'You must enter your current password';
            return false;
        }
        if (this.password1 !== this.password2) {
            this.error = 'Your new passwords do not match';
            return false;
        }
        this.error = '';
        return true;
    };
    SettingsGeneralComponent.prototype.change = function () {
        this.changed = true;
        this.saved = false;
    };
    SettingsGeneralComponent.prototype.save = function () {
        var _this = this;
        if (!this.canSubmit())
            return;
        this.inProgress = true;
        this.client.post('api/v1/settings/' + this.guid, {
            name: this.name,
            email: this.email,
            password: this.password,
            new_password: this.password2,
            mature: this.mature ? 1 : 0,
            disabled_emails: this.enabled_mails ? 0 : 1,
            language: this.language,
            categories: this.selectedCategories
        })
            .then(function (response) {
            _this.changed = false;
            _this.saved = true;
            _this.error = '';
            _this.password = '';
            _this.password1 = '';
            _this.password2 = '';
            if (window.Opspot.user) {
                window.Opspot.user.mature = _this.mature ? 1 : 0;
                if (window.Opspot.user.name !== _this.name) {
                    window.Opspot.user.name = _this.name;
                }
            }
            if (_this.language !== window.Opspot['language']) {
                window.location.reload(true);
            }
            _this.inProgress = false;
        }).catch(function (e) {
            _this.inProgress = false;
            _this.changed = false;
            _this.error = e.message;
        });
    };
    // Third Party Networks
    SettingsGeneralComponent.prototype.connectFb = function () {
        var _this = this;
        this.thirdpartynetworks.connect('facebook')
            .then(function () {
            _this.load();
        });
    };
    SettingsGeneralComponent.prototype.connectTw = function () {
        var _this = this;
        this.thirdpartynetworks.connect('twitter')
            .then(function () {
            _this.load();
        });
    };
    SettingsGeneralComponent.prototype.removeFbLogin = function () {
        this.thirdpartynetworks.removeFbLogin();
    };
    SettingsGeneralComponent.prototype.removeFb = function () {
        this.thirdpartynetworks.disconnect('facebook');
    };
    SettingsGeneralComponent.prototype.removeTw = function () {
        this.thirdpartynetworks.disconnect('twitter');
    };
    SettingsGeneralComponent.prototype.getCategories = function () {
        this.categories = [];
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
                selected: false
            });
        }
        this.categories.sort(function (a, b) { return a.label > b.label ? 1 : -1; });
    };
    SettingsGeneralComponent.prototype.onCategoryClick = function (category) {
        category.selected = !category.selected;
        if (category.selected) {
            this.selectedCategories.push(category.id);
        }
        else {
            this.selectedCategories.splice(this.selectedCategories.indexOf(category.id), 1);
        }
        this.changed = true;
        this.saved = false;
    };
    SettingsGeneralComponent.prototype.closeAllSessions = function () {
        this.router.navigate(['/logout/all']);
    };
    SettingsGeneralComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-settings--general',
            templateUrl: 'general.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            core_1.ElementRef,
            api_1.Client,
            router_1.ActivatedRoute,
            router_1.Router,
            third_party_networks_1.ThirdPartyNetworksService])
    ], SettingsGeneralComponent);
    return SettingsGeneralComponent;
}());
exports.SettingsGeneralComponent = SettingsGeneralComponent;
//# sourceMappingURL=general.component.js.map