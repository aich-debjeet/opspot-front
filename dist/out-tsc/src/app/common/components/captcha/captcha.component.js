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
var CaptchaComponent = /** @class */ (function () {
    function CaptchaComponent(client) {
        this.client = client;
        this.emit = new core_1.EventEmitter();
        this.inProgress = false;
        this.type = 'sum';
        this.hash = '';
    }
    CaptchaComponent.prototype.ngOnInit = function () {
        this.get();
        this.interval = setInterval(this.get, (1000 * 60 * 4)); //refresh every 4 minutes
    };
    CaptchaComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    CaptchaComponent.prototype.get = function () {
        var _this = this;
        this.client.get('api/v1/captcha')
            .then(function (response) {
            _this.type = response.question.type;
            _this.question = response.question.question;
            _this.nonce = response.question.nonce;
            _this.hash = response.question.hash;
        });
    };
    CaptchaComponent.prototype.validate = function () {
        var payload = { type: this.type, question: this.question, answer: this.answer, nonce: this.nonce, hash: this.hash };
        this.emit.next(JSON.stringify(payload));
        this.client.post('api/v1/captcha', payload)
            .then(function (response) {
            if (response.success)
                console.log('success');
            else
                console.log('error');
        });
    };
    __decorate([
        core_1.Output('answer'),
        __metadata("design:type", core_1.EventEmitter)
    ], CaptchaComponent.prototype, "emit", void 0);
    CaptchaComponent = __decorate([
        core_1.Component({
            selector: 'm-captcha',
            templateUrl: 'captcha.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], CaptchaComponent);
    return CaptchaComponent;
}());
exports.CaptchaComponent = CaptchaComponent;
//# sourceMappingURL=captcha.component.js.map