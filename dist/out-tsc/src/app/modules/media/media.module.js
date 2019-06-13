"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_module_1 = require("../../common/common.module");
var legacy_module_1 = require("../legacy/legacy.module");
var modals_module_1 = require("../modals/modals.module");
var forms_module_1 = require("../forms/forms.module");
var wire_module_1 = require("../wire/wire.module");
var post_menu_module_1 = require("../../common/components/post-menu/post-menu.module");
var video_module_1 = require("./components/video/video.module");
var list_component_1 = require("./videos/list.component");
var tile_component_1 = require("./videos/tile.component");
var list_component_2 = require("./images/list.component");
var tile_component_2 = require("./images/tile.component");
var view_component_1 = require("./view/view.component");
var edit_component_1 = require("./edit/edit.component");
var theatre_component_1 = require("./view/views/theatre.component");
var grid_component_1 = require("./view/views/grid.component");
var recommended_component_1 = require("./view/recommended/recommended.component");
var thumbnail_selector_component_1 = require("./components/thumbnail-selector.component");
var comments_module_1 = require("../comments/comments.module");
var hashtags_module_1 = require("../hashtags/hashtags.module");
var routes = [
    { path: 'media/videos/:filter', component: list_component_1.MediaVideosListComponent },
    { path: 'media/videos', redirectTo: '/media/videos/top', pathMatch: 'full' },
    { path: 'media/images/:filter', component: list_component_2.MediaImagesListComponent },
    { path: 'media/images', redirectTo: '/media/images/top', pathMatch: 'full' },
    { path: 'media/edit/:guid', component: edit_component_1.MediaEditComponent },
    { path: 'media/:container/:guid', component: view_component_1.MediaViewComponent },
    { path: 'media/:guid', component: view_component_1.MediaViewComponent },
    /* Legacy routes */
    { path: 'archive/view/:container/:guid', component: view_component_1.MediaViewComponent },
    { path: 'archive/view/:guid', component: view_component_1.MediaViewComponent },
    { path: 'archive/edit/:guid', component: edit_component_1.MediaEditComponent },
];
var MediaModule = /** @class */ (function () {
    function MediaModule() {
    }
    MediaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                comments_module_1.CommentsModule,
                legacy_module_1.LegacyModule,
                modals_module_1.ModalsModule,
                forms_module_1.OpspotFormsModule,
                wire_module_1.WireModule,
                post_menu_module_1.PostMenuModule,
                video_module_1.VideoModule,
                hashtags_module_1.HashtagsModule,
            ],
            declarations: [
                list_component_1.MediaVideosListComponent,
                tile_component_1.MediaVideosTileComponent,
                list_component_2.MediaImagesListComponent,
                tile_component_2.MediaImagesTileComponent,
                edit_component_1.MediaEditComponent,
                view_component_1.MediaViewComponent,
                theatre_component_1.MediaTheatreComponent,
                grid_component_1.MediaGridComponent,
                recommended_component_1.MediaViewRecommendedComponent,
                thumbnail_selector_component_1.ThumbnailSelectorComponent,
            ],
            entryComponents: [
                list_component_1.MediaVideosListComponent,
                list_component_2.MediaImagesListComponent,
                edit_component_1.MediaEditComponent,
                view_component_1.MediaViewComponent,
            ]
        })
    ], MediaModule);
    return MediaModule;
}());
exports.MediaModule = MediaModule;
//# sourceMappingURL=media.module.js.map