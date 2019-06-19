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
var OnboardingForm = /** @class */ (function () {
    function OnboardingForm(session, client, upload, fb) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.error = '';
        this.inProgress = false;
        this.gender = 'private';
        this.done = new core_1.EventEmitter();
        this.form = fb.group({
            briefdescription: [''],
            dob: [''],
            city: [''],
        });
    }
    OnboardingForm.prototype.submit = function (e) {
        var _this = this;
        e.preventDefault();
        this.inProgress = true;
        var info = this.form.value;
        info.gender = this.gender;
        this.client.post('api/v1/channel/info', info)
            .then(function (data) {
            // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
            _this.inProgress = false;
            _this.done.next(data.user);
        })
            .catch(function (e) {
            console.log(e);
            _this.inProgress = false;
            return;
        });
    };
    OnboardingForm.prototype.addAvatar = function (file) {
        console.log(file);
        this.upload.post('api/v1/channel/avatar', [file], { filekey: 'file' })
            .then(function (response) {
            window.Opspot.user.icontime = Date.now();
        });
    };
    OnboardingForm.prototype.addBanner = function (e) {
        var _this = this;
        var element = e.target ? e.target : e.srcElement;
        var file = element ? element.files[0] : null;
        var reader = new FileReader();
        reader.onloadend = function () {
            _this.banner = typeof reader.result === 'string' ? reader.result : reader.result.toString();
        };
        reader.readAsDataURL(file);
        this.upload.post('api/v1/channel/carousel', [file], { top: 0 });
    };
    OnboardingForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-form-onboarding',
            outputs: ['done'],
            templateUrl: 'onboarding.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, api_1.Upload, forms_1.FormBuilder])
    ], OnboardingForm);
    return OnboardingForm;
}());
exports.OnboardingForm = OnboardingForm;
//# sourceMappingURL=onboarding.js.map