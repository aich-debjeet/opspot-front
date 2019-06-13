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
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent() {
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.updateFields();
    };
    DynamicFormComponent.prototype.updateFields = function () {
        var _this = this;
        this.fieldDefinitions =
            Object.keys(this.fields)
                .map(function (prop) {
                return Object.assign({}, { key: prop }, _this.fields[prop]);
            });
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.fields); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new forms_1.FormControl(this.fields[prop].value || '', this.mapValidators(this.fields[prop].validation));
        }
        this.form = new forms_1.FormGroup(formGroup);
    };
    DynamicFormComponent.prototype.ngOnChanges = function (changes) {
        var fields = changes.fields;
        console.log(fields);
        this.updateFields();
    };
    DynamicFormComponent.prototype.ngAfterViewChecked = function () {
        window.componentHandler.upgradeDom();
    };
    DynamicFormComponent.prototype.mapValidators = function (validators) {
        var formValidators = [];
        if (validators) {
            for (var _i = 0, _a = Object.keys(validators); _i < _a.length; _i++) {
                var validation = _a[_i];
                switch (validation) {
                    case 'required':
                        formValidators.push(forms_1.Validators.required);
                        break;
                    case 'min':
                        formValidators.push(forms_1.Validators.min(validators[validation]));
                        break;
                    case 'max':
                        formValidators.push(forms_1.Validators.max(validators[validation]));
                        break;
                }
            }
        }
        return formValidators;
    };
    DynamicFormComponent.prototype.getValues = function () {
        var values = Object.assign({}, this.form.value);
        // map values if necessary
        for (var _i = 0, _a = Object.keys(this.fields); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (this.fields[prop].map && values[prop]) {
                values[prop] = this.fields[prop].map(values[prop]);
            }
        }
        return values;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicFormComponent.prototype, "fields", void 0);
    DynamicFormComponent = __decorate([
        core_1.Component({
            selector: 'm-dynamic-form',
            templateUrl: './dynamic-form.component.html',
            styleUrls: ['./dynamic-form.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map