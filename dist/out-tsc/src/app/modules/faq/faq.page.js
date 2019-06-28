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
var client_service_1 = require("../../common/api/client.service");
var faq_service_1 = require("./faq.service");
var title_1 = require("../../services/ux/title");
var router_1 = require("@angular/router");
var faq_component_1 = require("./faq.component");
var FaqPage = /** @class */ (function () {
    function FaqPage(client, service, title, route, router) {
        this.client = client;
        this.service = service;
        this.title = title;
        this.route = route;
        this.router = router;
        this.category = 'all';
        this.inProgress = false;
        this.title.setTitle('FAQ');
    }
    FaqPage.prototype.ngOnInit = function () {
        var _this = this;
        var categoryParam = this.route.snapshot.params.category;
        if (categoryParam) {
            this.inProgress = true;
            this.service.get(categoryParam).then(function (faq) {
                if (faq.length === 0) {
                    _this.router.navigate(['/faq']);
                }
                else {
                    _this.category = categoryParam;
                    _this.faq._category = _this.category;
                }
            });
        }
    };
    FaqPage.prototype.ngAfterViewInit = function () {
        if (!this.inProgress) {
            this.faq._category = this.category;
        }
    };
    __decorate([
        core_1.ViewChild(faq_component_1.FaqComponent),
        __metadata("design:type", faq_component_1.FaqComponent)
    ], FaqPage.prototype, "faq", void 0);
    FaqPage = __decorate([
        core_1.Component({
            selector: 'm-faq--page',
            templateUrl: 'faq.page.html'
        }),
        __metadata("design:paramtypes", [client_service_1.Client,
            faq_service_1.FaqService,
            title_1.OpspotTitle,
            router_1.ActivatedRoute,
            router_1.Router])
    ], FaqPage);
    return FaqPage;
}());
exports.FaqPage = FaqPage;
//# sourceMappingURL=faq.page.js.map