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
var api_1 = require("../../../../../../services/api");
var session_1 = require("../../../../../../services/session");
var attachment_1 = require("../../../../../../services/attachment");
var ImageCard = /** @class */ (function () {
    function ImageCard(session, client, attachment) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(ImageCard.prototype, "object", {
        set: function (value) {
            this.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    ImageCard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-card-image',
            host: {
                'class': 'mdl-card mdl-shadow--2dp'
            },
            inputs: ['object'],
            templateUrl: 'image.html',
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, attachment_1.AttachmentService])
    ], ImageCard);
    return ImageCard;
}());
exports.ImageCard = ImageCard;
//# sourceMappingURL=image.js.map