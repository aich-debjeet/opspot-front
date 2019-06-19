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
var api_1 = require("../../services/api");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../services/session");
var RewardsComponent = /** @class */ (function () {
    function RewardsComponent(session, client, route, router, title) {
        var _this = this;
        this.session = session;
        this.client = client;
        this.route = route;
        this.router = router;
        this.title = title;
        this.loading = true;
        this.inProgress = false;
        this.tshirtSizes = [
            'Small',
            'Medium',
            'Large',
            'Extra Large'
        ];
        if (localStorage.getItem('redirect'))
            localStorage.removeItem('redirect');
        this.loggedIn = this.session.isLoggedIn();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['uuid']) {
                _this.uuid = params['uuid'];
            }
        });
        this.client.get('api/v1/rewards/data', { uuid: this.uuid }).then(function (res) {
            _this.loading = false;
            if (res.hasOwnProperty('valid') && !res.valid) {
                _this.router.navigate(['/']);
            }
            else {
                _this.requiresTShirtSize = res.requiresTShirtSize;
                _this.requiresCellPhone = res.requiresCellPhone;
                _this.rewards = res.rewards;
                _this.name = res.name;
            }
        });
    }
    RewardsComponent.prototype.ngOnInit = function () {
        this.title.setTitle("Claim your Rewards");
    };
    RewardsComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    RewardsComponent.prototype.onClaim = function () {
        var _this = this;
        if (this.inProgress)
            return;
        this.inProgress = true;
        var options = {
            'uuid': this.uuid,
            'user_guid': this.session.getLoggedInUser().guid,
            'tshirtSize': this.tshirtSize,
            'address': this.address
        };
        this.client.post('api/v1/rewards/claim', options).then(function (res) {
            alert('Thank you. Your rewards have been claimed.');
            _this.router.navigate(['/newsfeed']);
        }).catch(function (error) {
            _this.inProgress = false;
            console.error('error! ', error);
        });
    };
    RewardsComponent.prototype.onLogin = function () {
        localStorage.setItem('redirect', '/claim-rewards/' + this.uuid);
        this.router.navigate(['/login']);
    };
    RewardsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-rewards-component',
            templateUrl: 'rewards.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, router_1.ActivatedRoute, router_1.Router, platform_browser_1.Title])
    ], RewardsComponent);
    return RewardsComponent;
}());
exports.RewardsComponent = RewardsComponent;
//# sourceMappingURL=rewards.js.map