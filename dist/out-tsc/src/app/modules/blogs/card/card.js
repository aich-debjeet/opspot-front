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
var session_1 = require("../../../services/session");
var attachment_1 = require("../../../services/attachment");
var list_options_1 = require("../../../services/list-options");
var BlogCard = /** @class */ (function () {
    function BlogCard(session, attachment) {
        this.session = session;
        this.attachment = attachment;
        this.access = list_options_1.ACCESS;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(BlogCard.prototype, "_blog", {
        set: function (value) {
            if (!value.thumbnail_src || !value.header_bg)
                value.thumbnail_src = 'assets/videos/earth-1/earth-1.png';
            this.blog = value;
        },
        enumerable: true,
        configurable: true
    });
    BlogCard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-card-blog',
            inputs: ['_blog : object'],
            templateUrl: 'card.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, attachment_1.AttachmentService])
    ], BlogCard);
    return BlogCard;
}());
exports.BlogCard = BlogCard;
//# sourceMappingURL=card.js.map