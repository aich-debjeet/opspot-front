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
var title_1 = require("../../../services/ux/title");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(client, router, route, title, session) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.session = session;
        this.error = '';
        this.inProgress = false;
        this.step = 1;
        this.username = '';
        this.code = '';
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Forgot Password');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['code']) {
                _this.setCode(params['code']);
            }
            if (params['username']) {
                _this.username = params['username'];
            }
        });
    };
    ForgotPasswordComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    ForgotPasswordComponent.prototype.request = function (username) {
        var _this = this;
        this.error = '';
        this.inProgress = true;
        this.client.post('api/v1/forgotpassword/request', {
            username: username.value
        })
            .then(function (data) {
            username.value = '';
            _this.inProgress = false;
            _this.step = 2;
        })
            .catch(function (e) {
            _this.inProgress = false;
            if (e.status === 'failed') {
                _this.error = 'There was a problem trying to reset your password. Please try again.';
            }
            if (e.status === 'error') {
                _this.error = e.message;
            }
        });
    };
    ForgotPasswordComponent.prototype.setCode = function (code) {
        this.step = 3;
        this.code = code;
    };
    ForgotPasswordComponent.prototype.validatePassword = function (password) {
        if (/@/.test(password.value)) {
            this.error = '@ is not allowed';
        }
        else {
            this.error = null;
        }
    };
    ForgotPasswordComponent.prototype.reset = function (password) {
        var _this = this;
        if (!this.error) {
            this.client.post('api/v1/forgotpassword/reset', {
                password: password.value,
                code: this.code,
                username: this.username
            })
                .then(function (response) {
                _this.session.login(response.user);
                _this.router.navigate(['/newsfeed']);
            })
                .catch(function (e) {
                _this.error = e.message;
                setTimeout(function () {
                    _this.router.navigate(['/login']);
                }, 2000);
            });
        }
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-forgot-password',
            templateUrl: 'forgot-password.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            session_1.Session])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map