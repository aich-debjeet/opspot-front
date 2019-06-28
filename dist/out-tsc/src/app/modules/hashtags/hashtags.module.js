"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var selector_component_1 = require("./selector/selector.component");
var hashtags_selector_component_1 = require("./hashtag-selector-modal/hashtags-selector.component");
var tags_component_1 = require("./tags-input/tags.component");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var angular_text_input_autocomplete_1 = require("angular-text-input-autocomplete");
var topbar_component_1 = require("./topbar/topbar.component");
var topbar_service_1 = require("./service/topbar.service");
var HashtagsModule = /** @class */ (function () {
    function HashtagsModule() {
    }
    HashtagsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                angular_text_input_autocomplete_1.TextInputAutocompleteModule,
            ],
            declarations: [
                selector_component_1.HashtagsSelectorComponent,
                hashtags_selector_component_1.HashtagsSelectorModalComponent,
                tags_component_1.TagsInput,
                topbar_component_1.TopbarHashtagsComponent,
            ],
            exports: [
                selector_component_1.HashtagsSelectorComponent,
                hashtags_selector_component_1.HashtagsSelectorModalComponent,
                tags_component_1.TagsInput,
                topbar_component_1.TopbarHashtagsComponent,
            ],
            providers: [
                topbar_service_1.TopbarHashtagsService,
            ],
            entryComponents: [
                hashtags_selector_component_1.HashtagsSelectorModalComponent
            ]
        })
    ], HashtagsModule);
    return HashtagsModule;
}());
exports.HashtagsModule = HashtagsModule;
//# sourceMappingURL=hashtags.module.js.map