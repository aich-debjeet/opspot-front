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
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var navigation_1 = require("../../services/navigation");
var Pages = /** @class */ (function () {
    function Pages(titleService, client, navigation, route) {
        this.titleService = titleService;
        this.client = client;
        this.navigation = navigation;
        this.route = route;
        this.title = '';
        this.body = '';
        this.path = '';
        this.header = false;
        this.headerTop = 0;
        this.pages = [];
        this.page = '';
    }
    Pages.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('...');
        this.setUpMenu();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['page']) {
                _this.page = params['page'];
                _this.load();
            }
        });
    };
    Pages.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    Pages.prototype.load = function () {
        var _this = this;
        this.client.get('api/v1/admin/pages/' + this.page)
            .then(function (response) {
            _this.title = response.title;
            _this.body = response.body;
            _this.path = response.path;
            _this.header = response.header;
            _this.headerTop = response.headerTop;
            _this.titleService.setTitle(_this.title);
            _this.bodyElement.nativeElement.innerHTML = _this.body;
        });
    };
    Pages.prototype.setUpMenu = function () {
        this.pages = this.navigation.getItems('footer');
    };
    __decorate([
        core_1.ViewChild('body', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], Pages.prototype, "bodyElement", void 0);
    Pages = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'pages.html'
        }),
        __metadata("design:paramtypes", [title_1.OpspotTitle,
            api_1.Client,
            navigation_1.Navigation,
            router_1.ActivatedRoute])
    ], Pages);
    return Pages;
}());
exports.Pages = Pages;
//# sourceMappingURL=pages.js.map