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
var forms_1 = require("@angular/forms");
var api_1 = require("../../../services/api");
var RevenueConsoleComponent = /** @class */ (function () {
    function RevenueConsoleComponent(client, cd, fb, router) {
        this.client = client;
        this.cd = cd;
        this.fb = fb;
        this.router = router;
    }
    RevenueConsoleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-revenue--console',
            templateUrl: 'console.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            core_1.ChangeDetectorRef,
            forms_1.FormBuilder, router_1.Router])
    ], RevenueConsoleComponent);
    return RevenueConsoleComponent;
}());
exports.RevenueConsoleComponent = RevenueConsoleComponent;
//# sourceMappingURL=console.component.js.map