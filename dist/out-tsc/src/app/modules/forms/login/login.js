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
var forms_1 = require("@angular/forms");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var LoginForm = /** @class */ (function () {
    function LoginForm(session, client, fb, zone) {
        this.session = session;
        this.client = client;
        this.zone = zone;
        this.errorMessage = '';
        this.twofactorToken = '';
        this.hideLogin = false;
        this.inProgress = false;
        this.opspot = window.Opspot;
        this.done = new core_1.EventEmitter();
        this.doneRegistered = new core_1.EventEmitter();
        this.form = fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    }
    LoginForm.prototype.login = function () {
        var _this = this;
        if (this.inProgress)
            return;
        //re-enable cookies
        document.cookie = 'disabled_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.errorMessage = '';
        this.inProgress = true;
        this.client.post('api/v1/authenticate', { username: this.form.value.username, password: this.form.value.password })
            .then(function (data) {
            // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
            _this.inProgress = false;
            _this.session.login(data.user);
            _this.done.next(data.user);
        })
            .catch(function (e) {
            _this.inProgress = false;
            if (e.status === 'failed') {
                //incorrect login details
                _this.errorMessage = 'LoginException::AuthenticationFailed';
                _this.session.logout();
            }
            else if (e.status === 'error') {
                if (e.message === 'LoginException:BannedUser' || e.message === 'LoginException::AttemptsExceeded') {
                    _this.session.logout();
                }
                //two factor?
                _this.twofactorToken = e.message;
                _this.hideLogin = true;
            }
            else {
                _this.errorMessage = 'LoginException::Unknown';
            }
        });
    };
    LoginForm.prototype.twofactorAuth = function (code) {
        var _this = this;
        this.client.post('api/v1/twofactor/authenticate', { token: this.twofactorToken, code: code.value })
            .then(function (data) {
            _this.session.login(data.user);
            _this.done.next(data.user);
        })
            .catch(function (e) {
            _this.errorMessage = e.message;
            _this.twofactorToken = '';
            _this.hideLogin = false;
        });
    };
    LoginForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-form-login',
            outputs: ['done', 'doneRegistered'],
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, forms_1.FormBuilder, core_1.NgZone])
    ], LoginForm);
    return LoginForm;
}());
exports.LoginForm = LoginForm;
//# sourceMappingURL=login.js.map