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
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var checkout_module_1 = require("../checkout/checkout.module");
var faq_module_1 = require("../faq/faq.module");
var creator_component_1 = require("./creator/creator.component");
var creator_component_2 = require("./payments-creator/creator.component");
var button_component_1 = require("./button/button.component");
var channel_component_1 = require("./channel/channel.component");
var table_component_1 = require("./channel/table/table.component");
var overview_component_1 = require("./channel/overview/overview.component");
var rewards_component_1 = require("./creator/rewards/rewards.component");
var threshold_input_component_1 = require("./threshold-input/threshold-input.component");
var console_component_1 = require("./console/console.component");
var ledger_component_1 = require("./console/ledger.component");
var supporter_component_1 = require("./console/supporter/supporter.component");
var settings_component_1 = require("./console/settings/settings.component");
var wire_lock_screen_component_1 = require("./lock-screen/wire-lock-screen.component");
var wire_service_1 = require("./wire.service");
var marketing_component_1 = require("./marketing.component");
var overview_component_2 = require("./console/overview/overview.component");
var wire_console_rewards_inputs_component_1 = require("./console/rewards-table/inputs/wire-console-rewards-inputs.component");
var rewards_component_2 = require("./console/rewards-table/rewards.component");
var wireRoutes = [
    { path: 'wire', component: marketing_component_1.WireMarketingComponent }
];
var WireModule = /** @class */ (function () {
    function WireModule() {
    }
    WireModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild(wireRoutes),
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                faq_module_1.FaqModule,
            ],
            declarations: [
                wire_lock_screen_component_1.WireLockScreenComponent,
                creator_component_1.WireCreatorComponent,
                button_component_1.WireButtonComponent,
                channel_component_1.WireChannelComponent,
                table_component_1.WireChannelTableComponent,
                overview_component_1.WireChannelOverviewComponent,
                rewards_component_1.WireCreatorRewardsComponent,
                threshold_input_component_1.WireThresholdInputComponent,
                wire_console_rewards_inputs_component_1.WireConsoleRewardsInputsComponent,
                rewards_component_2.WireConsoleRewardsComponent,
                creator_component_2.WirePaymentsCreatorComponent,
                console_component_1.WireConsoleComponent,
                ledger_component_1.WireConsoleLedgerComponent,
                supporter_component_1.WireConsoleSupporterComponent,
                settings_component_1.WireConsoleSettingsComponent,
                marketing_component_1.WireMarketingComponent,
                overview_component_2.WireConsoleOverviewComponent
            ],
            providers: [
                wire_service_1.WireService
            ],
            exports: [
                wire_lock_screen_component_1.WireLockScreenComponent,
                button_component_1.WireButtonComponent,
                channel_component_1.WireChannelComponent,
                overview_component_1.WireChannelOverviewComponent,
                threshold_input_component_1.WireThresholdInputComponent,
                ledger_component_1.WireConsoleLedgerComponent,
                supporter_component_1.WireConsoleSupporterComponent,
                wire_console_rewards_inputs_component_1.WireConsoleRewardsInputsComponent,
                rewards_component_2.WireConsoleRewardsComponent,
                settings_component_1.WireConsoleSettingsComponent,
                overview_component_2.WireConsoleOverviewComponent,
            ],
            entryComponents: [
                creator_component_1.WireCreatorComponent,
                console_component_1.WireConsoleComponent,
                marketing_component_1.WireMarketingComponent,
                creator_component_2.WirePaymentsCreatorComponent,
                wire_lock_screen_component_1.WireLockScreenComponent,
                wire_console_rewards_inputs_component_1.WireConsoleRewardsInputsComponent,
            ]
        })
    ], WireModule);
    return WireModule;
}());
exports.WireModule = WireModule;
//# sourceMappingURL=wire.module.js.map