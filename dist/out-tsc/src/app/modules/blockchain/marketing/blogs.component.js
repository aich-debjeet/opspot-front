"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BlockchainMarketingBlogsComponent = /** @class */ (function () {
    function BlockchainMarketingBlogsComponent() {
        this.blogs = [
            {
                guid: "871791809876131840",
                title: "How to buy OPSPOT tokens",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/871791809876131840/1533585765',
                header_bg: true,
            },
            {
                guid: "871789298595016704",
                title: "How to buy ETH on Coinbase",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/871789298595016704/1533585765',
                header_bg: true,
            },
            {
                guid: "871787065656385536",
                title: "How to buy ETH on Gemini",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/871787065656385536/1533585765',
                header_bg: true,
            },
            {
                guid: "871783126122799104",
                title: "How to setup your wallet with MetaMask",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/871783126122799104/1533585765',
                header_bg: true,
            },
            {
                guid: "871784584725569536",
                title: "How to setup your wallet without MetaMask",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/871784584725569536/1533585765',
                header_bg: true,
            },
            {
                guid: "826188573910073344",
                title: "Crypto launch, new apps, and more",
                ownerObj: {
                    name: "Opspot",
                    username: "opspot",
                    guid: "100000000000000519",
                },
                thumbnail_src: window.Opspot.cdn_url + 'fs/v1/banners/826188573910073344/1533585765',
                header_bg: true,
            },
        ];
    }
    BlockchainMarketingBlogsComponent.prototype.ngOnInit = function () {
    };
    BlockchainMarketingBlogsComponent = __decorate([
        core_1.Component({
            selector: 'm-blockchain--marketing--blogs',
            templateUrl: 'blogs.component.html'
        })
    ], BlockchainMarketingBlogsComponent);
    return BlockchainMarketingBlogsComponent;
}());
exports.BlockchainMarketingBlogsComponent = BlockchainMarketingBlogsComponent;
//# sourceMappingURL=blogs.component.js.map