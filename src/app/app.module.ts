import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaptchaModule } from './modules/captcha/captcha.module';
import { TextMaskModule } from 'angular2-text-mask';

import { Opspot } from './app.component';

import {
  OPSPOT_APP_ROUTING_DECLARATIONS,
  OpspotAppRoutes,
  OpspotAppRoutingProviders
} from './router/app';

import { OPSPOT_DECLARATIONS } from './declarations';
import { OPSPOT_PLUGIN_DECLARATIONS } from './plugin-declarations';
import { OPSPOT_PROVIDERS } from './services/providers';
import { OPSPOT_PLUGIN_PROVIDERS } from './plugin-providers';

import { CommonModule } from './common/common.module';
import { MonetizationModule } from './modules/monetization/monetization.module';
import { WalletModule } from './modules/wallet/wallet.module';
// import { CheckoutModule } from './modules/checkout/checkout.module';
import { PlusModule } from './modules/plus/plus.module';

import { AdsModule } from './modules/ads/ads.module';
import { BoostModule } from './modules/boost/boost.module';
import { WireModule } from './modules/wire/wire.module';
import { ReportModule } from './modules/report/report.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { OpspotFormsModule } from './modules/forms/forms.module';
import { LegacyModule } from './modules/legacy/legacy.module';
import { ModalsModule } from './modules/modals/modals.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ThirdPartyNetworksModule } from './modules/third-party-networks/third-party-networks.module';
import { TranslateModule } from './modules/translate/translate.module';
import { SettingsModule } from './modules/settings/settings.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { NotificationModule } from './modules/notifications/notification.module';

import { GroupsModule } from './modules/groups/groups.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { NetworkModule } from './modules/network/network.module';
import { PostMenuModule } from './common/components/post-menu/post-menu.module';
import { ShareMenuModule } from './common/components/share-menu/share-menu.module';
import { BanModule } from './modules/ban/ban.module';
import { BlogModule } from './modules/blogs/blog.module';
import { SearchModule } from './modules/search/search.module';
import { MessengerModule } from './modules/messenger/messenger.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { NewsfeedModule } from './modules/newsfeed/newsfeed.module';
import { MediaModule } from './modules/media/media.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { BlockchainMarketingModule } from './modules/blockchain/marketing/marketing.module';
import { CommentsModule } from './modules/comments/comments.module';
import { NodesMarketingModule } from './modules/nodes/nodes.module';
import { HelpdeskModule } from './modules/helpdesk/helpdesk.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { CanaryModule } from './modules/canary/canary.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { BluestoreModule } from './modules/bluestore/bluestore.module';
import { ShowtimezModule } from './modules/showtimez/showtimez.module';
import { ExploreModule } from './modules/explore/explore.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { BigEventModule } from './modules/big-event/big-event.module';



@NgModule({
  bootstrap: [Opspot],
  declarations: [
    Opspot,
    OPSPOT_APP_ROUTING_DECLARATIONS,
    OPSPOT_DECLARATIONS,
    OPSPOT_PLUGIN_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(OpspotAppRoutes),
    CaptchaModule,
    CommonModule,
    WalletModule,
    // CheckoutModule,
    MonetizationModule,
    PlusModule,
    AdsModule,
    BoostModule,
    WireModule,
    ReportModule,
    BanModule,
    ThirdPartyNetworksModule,
    LegacyModule,
    TranslateModule,
    SettingsModule,
    ModalsModule,
    PaymentsModule,
    OpspotFormsModule,
    OnboardingModule,
    NotificationModule,
    GroupsModule,
    BlogModule,
    PostMenuModule,
    ShareMenuModule,
    SearchModule,
    MessengerModule,
    HomepageModule,
    NewsfeedModule,
    MediaModule,
    AuthModule,
    BlockchainModule,
    BlockchainMarketingModule,
    NodesMarketingModule,
    CommentsModule,
    HelpdeskModule,
    MobileModule,
    CanaryModule,
    // last due to :username route
    ChannelsModule,
    BookmarkModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    BsDatepickerModule.forRoot(),
    NetworkModule,
    OpportunityModule,
    TextMaskModule,
    BluestoreModule,
    ShowtimezModule,
    ExploreModule,
    PortfolioModule,
    BigEventModule,
    OrganizationModule
  ],
  providers: [
    OpspotAppRoutingProviders,
    OPSPOT_PROVIDERS,
    OPSPOT_PLUGIN_PROVIDERS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpspotModule {}