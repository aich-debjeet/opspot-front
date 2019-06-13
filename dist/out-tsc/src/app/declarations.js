"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_1 = require("./controllers/admin/analytics/analytics");
var reports_download_1 = require("./controllers/admin/reports-download/reports-download");
var boosts_1 = require("./controllers/admin/boosts/boosts");
var pages_1 = require("./controllers/admin/pages/pages");
var reports_1 = require("./controllers/admin/reports/reports");
var monetization_1 = require("./controllers/admin/monetization/monetization");
var programs_component_1 = require("./controllers/admin/programs/programs.component");
var payouts_component_1 = require("./controllers/admin/payouts/payouts.component");
var featured_1 = require("./controllers/admin/featured/featured");
var tagcloud_component_1 = require("./controllers/admin/tagcloud/tagcloud.component");
var verify_component_1 = require("./controllers/admin/verify/verify.component");
var rejection_reason_modal_component_1 = require("./controllers/admin/boosts/modal/rejection-reason-modal.component");
var interactions_component_1 = require("./controllers/admin/interactions/interactions.component");
var table_component_1 = require("./controllers/admin/interactions/table/table.component");
var purchases_component_1 = require("./controllers/admin/purchases/purchases.component");
var withdrawals_component_1 = require("./controllers/admin/withdrawals/withdrawals.component");
exports.OPSPOT_DECLARATIONS = [
    // Components
    table_component_1.InteractionsTableComponent,
    // Controllers; Controller-based directives
    analytics_1.AdminAnalytics,
    interactions_component_1.AdminInteractions,
    rejection_reason_modal_component_1.RejectionReasonModalComponent,
    boosts_1.AdminBoosts,
    pages_1.AdminPages,
    reports_1.AdminReports,
    monetization_1.AdminMonetization,
    programs_component_1.AdminPrograms,
    payouts_component_1.AdminPayouts,
    featured_1.AdminFeatured,
    tagcloud_component_1.AdminTagcloud,
    verify_component_1.AdminVerify,
    purchases_component_1.AdminPurchasesComponent,
    withdrawals_component_1.AdminWithdrawals,
    reports_download_1.AdminReportsDownload,
];
//# sourceMappingURL=declarations.js.map