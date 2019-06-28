"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var poster_modal_component_1 = require("./poster-modal.component");
var poster_component_1 = require("./poster.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wire_module_1 = require("../../wire/wire.module");
var third_party_networks_module_1 = require("../../third-party-networks/third-party-networks.module");
var common_module_1 = require("../../../common/common.module");
var router_1 = require("@angular/router");
var hashtags_module_1 = require("../../hashtags/hashtags.module");
var angular_text_input_autocomplete_1 = require("angular-text-input-autocomplete");
var PosterModule = /** @class */ (function () {
    function PosterModule() {
    }
    PosterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                common_module_1.CommonModule,
                wire_module_1.WireModule,
                third_party_networks_module_1.ThirdPartyNetworksModule,
                hashtags_module_1.HashtagsModule,
                angular_text_input_autocomplete_1.TextInputAutocompleteModule,
            ],
            declarations: [
                poster_component_1.PosterComponent,
                poster_modal_component_1.ModalPosterComponent
            ],
            exports: [
                poster_component_1.PosterComponent,
                poster_modal_component_1.ModalPosterComponent
            ],
            entryComponents: [
                poster_component_1.PosterComponent,
                poster_modal_component_1.ModalPosterComponent
            ],
        })
    ], PosterModule);
    return PosterModule;
}());
exports.PosterModule = PosterModule;
//# sourceMappingURL=poster.module.js.map