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
var messenger_component_1 = require("./messenger.component");
var channel_button_component_1 = require("./channel-button/channel-button.component");
var conversation_component_1 = require("./conversation/conversation.component");
var encryption_component_1 = require("./encryption/encryption.component");
var scroll_1 = require("./scroll");
var dockpanes_component_1 = require("./dockpanes/dockpanes.component");
var userlist_component_1 = require("./userlist/userlist.component");
var setup_component_1 = require("./setup/setup.component");
var setup_component_2 = require("./onboarding/setup.component");
var client_service_1 = require("../../common/api/client.service");
var dockpanes_service_1 = require("./dockpanes/dockpanes.service");
var encryption_service_1 = require("./encryption/encryption.service");
var storage_1 = require("../../services/storage");
var session_1 = require("../../services/session");
var MessengerModule = /** @class */ (function () {
    function MessengerModule() {
    }
    MessengerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
            ],
            declarations: [
                messenger_component_1.Messenger,
                channel_button_component_1.MessengerChannelButton,
                conversation_component_1.MessengerConversation,
                encryption_component_1.MessengerEncryption,
                scroll_1.MessengerScrollDirective,
                dockpanes_component_1.MessengerConversationDockpanes,
                userlist_component_1.MessengerUserlist,
                setup_component_1.MessengerSetupChat,
                setup_component_2.MessengerOnboardingSetupComponent,
            ],
            exports: [
                messenger_component_1.Messenger,
                channel_button_component_1.MessengerChannelButton,
                conversation_component_1.MessengerConversation,
                encryption_component_1.MessengerEncryption,
                scroll_1.MessengerScrollDirective,
                dockpanes_component_1.MessengerConversationDockpanes,
                userlist_component_1.MessengerUserlist,
                setup_component_1.MessengerSetupChat,
                setup_component_2.MessengerOnboardingSetupComponent,
            ],
            providers: [
                {
                    provide: dockpanes_service_1.MessengerConversationDockpanesService,
                    useFactory: dockpanes_service_1.MessengerConversationDockpanesService._,
                    deps: [session_1.Session]
                },
                {
                    provide: encryption_service_1.MessengerEncryptionService,
                    useFactory: encryption_service_1.MessengerEncryptionService._,
                    deps: [client_service_1.Client, storage_1.Storage]
                }
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    ], MessengerModule);
    return MessengerModule;
}());
exports.MessengerModule = MessengerModule;
//# sourceMappingURL=messenger.module.js.map