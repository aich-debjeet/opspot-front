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
var client_service_1 = require("../../../common/api/client.service");
var PlusVerifyComponent = /** @class */ (function () {
    function PlusVerifyComponent(client, cd, fb) {
        this.client = client;
        this.cd = cd;
        this.fb = fb;
        this.open = true;
        this.inProgress = false;
        this.closed = new core_1.EventEmitter(true);
    }
    PlusVerifyComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            link1: ['', forms_1.Validators.required],
            link2: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required]
        });
    };
    PlusVerifyComponent.prototype.submit = function (e) {
        var _this = this;
        this.inProgress = true;
        this.detectChanges();
        this.client.post('api/v1/plus/verify', this.form.value)
            .then(function (response) {
            _this.inProgress = false;
            _this.open = false;
            _this.closed.next(true);
            _this.detectChanges();
        })
            .catch(function () {
            _this.inProgress = false;
            _this.detectChanges();
        });
    };
    PlusVerifyComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PlusVerifyComponent.prototype, "closed", void 0);
    PlusVerifyComponent = __decorate([
        core_1.Component({
            selector: 'm-plus--verify',
            templateUrl: 'verify.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef, forms_1.FormBuilder])
    ], PlusVerifyComponent);
    return PlusVerifyComponent;
}());
exports.PlusVerifyComponent = PlusVerifyComponent;
//# sourceMappingURL=verify.component.js.map