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
var recaptcha_component_1 = require("../../../modules/captcha/recaptcha/recaptcha.component");
var experiments_service_1 = require("../../experiments/experiments.service");
var RegisterForm = /** @class */ (function () {
    function RegisterForm(session, client, fb, zone, experiments) {
        this.session = session;
        this.client = client;
        this.zone = zone;
        this.experiments = experiments;
        this.errorMessage = '';
        this.twofactorToken = '';
        this.hideLogin = false;
        this.inProgress = false;
        this.takenUsername = false;
        this.showFbForm = false;
        this.opspot = window.Opspot;
        this.done = new core_1.EventEmitter();
        this.form = fb.group({
            username: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            password2: ['', forms_1.Validators.required],
            tos: [false],
            exclusive_promotions: [false],
            captcha: [''],
            Homepage121118: experiments.getExperimentBucket('Homepage121118'),
        });
    }
    RegisterForm.prototype.ngOnInit = function () {
        if (this.reCaptcha) {
            this.reCaptcha.reset();
        }
    };
    RegisterForm.prototype.register = function (e) {
        var _this = this;
        e.preventDefault();
        this.errorMessage = '';
        if (!this.form.value.tos) {
            this.errorMessage = 'To create an account you need to accept terms and conditions.';
            return;
        }
        //re-enable cookies
        document.cookie = 'disabled_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        if (this.form.value.password !== this.form.value.password2) {
            if (this.reCaptcha) {
                this.reCaptcha.reset();
            }
            this.errorMessage = 'Passwords must match.';
            return;
        }
        this.form.value.referrer = this.referrer;
        this.inProgress = true;
        this.client.post('api/v1/register', this.form.value)
            .then(function (data) {
            // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
            _this.inProgress = false;
            _this.session.login(data.user);
            _this.done.next(data.user);
        })
            .catch(function (e) {
            console.log(e);
            _this.inProgress = false;
            if (_this.reCaptcha) {
                _this.reCaptcha.reset();
            }
            if (e.status === 'failed') {
                //incorrect login details
                _this.errorMessage = 'RegisterException::AuthenticationFailed';
                _this.session.logout();
            }
            else if (e.status === 'error') {
                //two factor?
                _this.errorMessage = e.message;
                _this.session.logout();
            }
            else {
                _this.errorMessage = "Sorry, there was an error. Please try again.";
            }
            return;
        });
    };
    RegisterForm.prototype.validateUsername = function () {
        var _this = this;
        if (this.form.value.username) {
            this.client.get('api/v1/register/validate/' + this.form.value.username)
                .then(function (data) {
                if (data.exists) {
                    _this.form.controls.username.setErrors({ 'exists': true });
                    _this.errorMessage = data.message;
                    _this.takenUsername = true;
                }
                else {
                    _this.takenUsername = false;
                    _this.errorMessage = '';
                }
            })
                .catch(function (e) {
                console.log(e);
            });
        }
    };
    RegisterForm.prototype.setCaptcha = function (code) {
        this.form.patchValue({ captcha: code });
    };
    RegisterForm.prototype.validationTimeoutHandler = function () {
        clearTimeout(this.usernameValidationTimeout);
        this.usernameValidationTimeout = setTimeout(this.validateUsername.bind(this), 500);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RegisterForm.prototype, "referrer", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RegisterForm.prototype, "done", void 0);
    __decorate([
        core_1.ViewChild('reCaptcha'),
        __metadata("design:type", recaptcha_component_1.ReCaptchaComponent)
    ], RegisterForm.prototype, "reCaptcha", void 0);
    RegisterForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-form-register',
            templateUrl: 'register.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            forms_1.FormBuilder,
            core_1.NgZone,
            experiments_service_1.ExperimentsService])
    ], RegisterForm);
    return RegisterForm;
}());
exports.RegisterForm = RegisterForm;
//# sourceMappingURL=register.js.map