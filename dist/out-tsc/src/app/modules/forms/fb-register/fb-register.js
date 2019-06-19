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
var FbRegisterForm = /** @class */ (function () {
    function FbRegisterForm(session, client, fb) {
        this.session = session;
        this.client = client;
        this.opspot = window.Opspot;
        this.errorMessage = '';
        this.inProgress = false;
        this.done = new core_1.EventEmitter();
        this.form = fb.group({
            username: [this.session.getLoggedInUser().username, forms_1.Validators.required]
        });
    }
    FbRegisterForm.prototype.complete = function (e) {
        var _this = this;
        e.preventDefault();
        this.errorMessage = '';
        this.inProgress = true;
        this.client.post('api/v1/thirdpartynetworks/facebook/complete-register', this.form.value)
            .then(function (data) {
            _this.inProgress = false;
            _this.opspot.user.username = _this.form.value.username;
            // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
            _this.done.next(true);
        })
            .catch(function (e) {
            console.log(e);
            _this.inProgress = false;
            _this.errorMessage = e.message;
            return;
        });
    };
    FbRegisterForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-form-fb-register',
            outputs: ['done'],
            templateUrl: 'fb-register.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, forms_1.FormBuilder])
    ], FbRegisterForm);
    return FbRegisterForm;
}());
exports.FbRegisterForm = FbRegisterForm;
//# sourceMappingURL=fb-register.js.map