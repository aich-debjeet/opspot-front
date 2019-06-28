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
var client_service_1 = require("../../../common/api/client.service");
var AffiliateLinkComponent = /** @class */ (function () {
    function AffiliateLinkComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.user = window.Opspot.user;
        this.showOnboarding = false;
        this.link = '';
        this.encodedLink = '';
        this.link = this.opspot.site_url + 'register;referrer=' + this.user.username;
        this.encodedLink = encodeURI(this.link);
    }
    AffiliateLinkComponent.prototype.openWindow = function (url) {
        window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
    };
    AffiliateLinkComponent.prototype.openEmail = function () {
        window.location.href = 'mailto:?subject=Join%20me%20on%20opspot&body=Join me on Opspot ' + this.encodedLink;
    };
    AffiliateLinkComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    AffiliateLinkComponent = __decorate([
        core_1.Component({
            selector: 'm-affiliate--link',
            templateUrl: 'link.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], AffiliateLinkComponent);
    return AffiliateLinkComponent;
}());
exports.AffiliateLinkComponent = AffiliateLinkComponent;
//# sourceMappingURL=link.component.js.map