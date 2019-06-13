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
var api_1 = require("../../../../services/api");
var CommentButton = /** @class */ (function () {
    function CommentButton(client) {
        this.client = client;
    }
    Object.defineProperty(CommentButton.prototype, "_object", {
        set: function (value) {
            this.object = value;
        },
        enumerable: true,
        configurable: true
    });
    CommentButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-comment',
            inputs: ['_object: object'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <a class=\"mdl-color-text--blue-grey-500\" [ngClass]=\"{'selected': object['comments:count'] > 0 }\">\n      <i class=\"material-icons\">chat_bubble</i>\n      <span class=\"opspot-counter\" *ngIf=\"object['comments:count'] > 0\">{{object['comments:count'] | number}}</span>\n    </a>\n  "
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], CommentButton);
    return CommentButton;
}());
exports.CommentButton = CommentButton;
//# sourceMappingURL=comment.js.map