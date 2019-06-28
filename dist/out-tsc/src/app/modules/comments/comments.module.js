"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var scroll_1 = require("./scroll");
var common_module_1 = require("../../common/common.module");
var video_module_1 = require("../media/components/video/video.module");
var translate_module_1 = require("../translate/translate.module");
var modals_module_1 = require("../modals/modals.module");
var list_component_1 = require("./list/list.component");
var comment_component_1 = require("./card/comment.component");
var CommentsModule = /** @class */ (function () {
    function CommentsModule() {
    }
    CommentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                common_module_1.CommonModule,
                video_module_1.VideoModule,
                translate_module_1.TranslateModule,
                modals_module_1.ModalsModule,
            ],
            declarations: [
                scroll_1.CommentsScrollDirective,
                comment_component_1.CommentComponent,
                list_component_1.CommentsListComponent,
            ],
            exports: [
                scroll_1.CommentsScrollDirective,
                comment_component_1.CommentComponent,
                list_component_1.CommentsListComponent,
            ],
            providers: [],
        })
    ], CommentsModule);
    return CommentsModule;
}());
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map