import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { ImageCropperModule } from 'ngx-image-cropper';

import { OPSPOT_PIPES } from './pipes/pipes';

import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarMarkersComponent } from './layout/sidebar/markers.component';
import { TopbarNavigationComponent } from './layout/topbar/navigation.component';
import { SidebarNavigationComponent } from './layout/sidebar/navigation.component';
import { TopbarOptionsComponent } from './layout/topbar/options.component';

import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfiniteScroll } from './components/infinite-scroll/infinite-scroll';
import { CountryInputComponent } from './components/forms/country-input/country-input.component';
import { DateInputComponent } from './components/forms/date-input/date-input.component';
import { CityFinderComponent } from './components/forms/city-finder/city-finder.component';
import { StateInputComponent } from './components/forms/state-input/state-input.component';
import { ReadMoreDirective } from './read-more/read-more.directive';
import { ReadMoreButtonComponent } from './read-more/button.component';
import { ChannelBadgesComponent } from './components/badges/badges.component';

import { Scheduler } from './components/scheduler/scheduler';
import { Modal } from './components/modal/modal.component';
import { OpspotRichEmbed } from './components/rich-embed/rich-embed';

import { MDL_DIRECTIVES } from './directives/material';
import { AutoGrow } from './directives/autogrow';
import { InlineAutoGrow } from './directives/inline-autogrow';
import { Emoji } from './directives/emoji';
import { Hovercard } from './directives/hovercard';
import { ScrollLock } from './directives/scroll-lock';
import { TagsLinks } from './directives/tags';
import { Tooltip } from './directives/tooltip';
import { OpspotAvatar } from './components/avatar/avatar';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { Textarea } from './components/editors/textarea.component';
import { TagcloudComponent } from './components/tagcloud/tagcloud.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

import { DynamicHostDirective } from './directives/dynamic-host.directive';
import { OpspotCard } from './components/card/card.component';
import { OpspotButton } from './components/button/button.component';
import { OverlayModalComponent } from './components/overlay-modal/overlay-modal.component';

import { ChartComponent } from './components/chart/chart.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { AdminActionsButtonComponent } from './components/button/admin-actions/admin-actions.component';
import { InlineEditorComponent } from './components/editors/inline-editor.component';
import { AttachmentService } from "../services/attachment";
import { MaterialBoundSwitchComponent } from './components/material/bound-switch.component';
import { IfFeatureDirective } from './directives/if-feature.directive';
import { OpspotEmoji } from './components/emoji/emoji';
import { CategoriesSelectorComponent } from './components/categories/selector/selector.component';
import { CategoriesSelectedComponent } from './components/categories/selected/selected.component';
import { TreeComponent } from './components/tree/tree.component';
import { AnnouncementComponent } from './components/announcements/announcement.component';
import { OpspotTokenSymbolComponent } from './components/cypto/token-symbol.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { PhoneInputCountryComponent } from './components/phone-input/country.component';
import { Session } from '../services/session';
import { Client, Upload } from '../services/api';
import { OpspotHttpClient } from './api/client.service';
import { SafeToggleComponent } from './components/safe-toggle/safe-toggle.component';
import { NotificationsToasterComponent } from '../modules/notifications/toaster.component';
import { ThumbsUpButton } from './components/thumbs/thumbs-up.component';
import { ThumbsDownButton } from './components/thumbs/thumbs-down.component';
import { DismissableNoticeComponent } from './components/notice/notice.component';
import { AnalyticsImpressions } from './components/analytics/impressions';
import { LineGraph } from './components/graphs/line-graph';
import { PieGraph } from './components/graphs/pie-graph';
import { GraphSVG } from './components/graphs/svg';
import { GraphPoints } from './components/graphs/points';
import { DynamicFormComponent } from './components/forms/dynamic-form/dynamic-form.component';
import {NgxCroppieModule} from 'ngx-croppie';
import { UpdateMarkersService } from './services/update-markers.service';
import { SocketsService } from '../services/sockets';
import { HttpClient } from "@angular/common/http";
import { AndroidAppDownloadComponent } from "./components/android-app-download-button/button.component";
import { ImageCroperComponent } from './components/image-croper/image-croper.component';
import { ReadMoreComponent } from './components/read-more/readmore.component';
import { OpspotWidgetComponent } from './components/opspot-widget/opspot-widget.component';
import { OpspotWidgetSliderComponent } from './components/opspot-widget-slider/opspot-widget-slider.component';
import { OpportunityListCardComponent } from './components/opportunity-list-card/opportunity-list-card.component';
import { MasonryContainerComponent } from './components/masonry-container/masonry-container.component';
import { PostCard } from '../modules/legacy/components/cards/post-card/post-card';
import { ShowtimeWidgetComponent } from './components/showtime-widget/showtime-widget.component';
import { ShowtimeListCardComponent } from './components/showtime-list-card/showtime-list-card.component';
import { MyjourneyWidgetComponent } from './components/myjourney-widget/myjourney-widget.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ActivityWidgetComponent } from './components/activity-widget/activity-widget.component';
import { MyjourneyListCardComponent } from './components/myjourney-list-card/myjourney-list-card';
import { BoostPostCard } from '../modules/legacy/components/cards/boost-post-card/boost-post-card';
import { CapitalizeFirstPipePipe } from './pipes/capitalize-first-pipe.pipe';
import { PostCardTitle } from '../modules/legacy/components/cards/post-title-card/post-tile-card';
import { NoRightClickDirective } from './directives/no-right-click.directive';
import { NgxImgCropperComponent } from './components/ngx-img-cropper/ngx-img-cropper.component';

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCroppieModule,
    NgxMasonryModule,
    SlickCarouselModule,
    ImageCropperModule
  ],
  declarations: [
    OPSPOT_PIPES,
    TopbarComponent,
    SidebarMarkersComponent,
    TopbarNavigationComponent,
    SidebarNavigationComponent,
    TopbarOptionsComponent,

    TooltipComponent,
    FooterComponent,
    InfiniteScroll,
    CountryInputComponent,
    DateInputComponent,
    StateInputComponent,
    CityFinderComponent,
    Scheduler,
    Modal,
    ReadMoreDirective,
    ReadMoreButtonComponent,
    ChannelBadgesComponent,
    OpspotRichEmbed,
    TagcloudComponent,
    DropdownComponent,

    AutoGrow,
    InlineAutoGrow,
    Emoji,
    OpspotEmoji,
    Hovercard,
    ScrollLock,
    TagsLinks,
    Tooltip,
    MDL_DIRECTIVES,
    DateSelectorComponent,
    OpspotAvatar,
    CaptchaComponent,
    Textarea,
    InlineEditorComponent,

    DynamicHostDirective,
    OpspotCard,
    OpspotButton,
    PostCard,
    BoostPostCard,
    PostCardTitle,

    ChartComponent,
    OverlayModalComponent,

    AdminActionsButtonComponent,

    MaterialBoundSwitchComponent,

    IfFeatureDirective,

    CategoriesSelectorComponent,
    CategoriesSelectedComponent,
    TreeComponent,

    AnnouncementComponent,
    OpspotTokenSymbolComponent,
    PhoneInputComponent,
    PhoneInputCountryComponent,
    SafeToggleComponent,
    ThumbsUpButton,
    ThumbsDownButton,
    DismissableNoticeComponent,
    AnalyticsImpressions,
    LineGraph,
    PieGraph,
    GraphSVG,
    GraphPoints,
    DynamicFormComponent,
    AndroidAppDownloadComponent,
    ImageCroperComponent,
    ReadMoreComponent,
    OpspotWidgetComponent,
    OpspotWidgetSliderComponent,
    OpportunityListCardComponent,
    MasonryContainerComponent,
    ShowtimeWidgetComponent,
    ShowtimeListCardComponent,
    MyjourneyWidgetComponent,
    ActivityWidgetComponent,
    MyjourneyListCardComponent,
    CapitalizeFirstPipePipe,
    NoRightClickDirective,
    NgxImgCropperComponent
  ],
  exports: [
    OPSPOT_PIPES,

    TopbarComponent,
    SidebarNavigationComponent,
    TopbarOptionsComponent,

    TooltipComponent,
    FooterComponent,
    InfiniteScroll,
    CountryInputComponent,
    DateInputComponent,
    CityFinderComponent,
    StateInputComponent,
    Scheduler,
    Modal,
    ReadMoreDirective,
    ReadMoreButtonComponent,
    ChannelBadgesComponent,
    OpspotRichEmbed,
    TagcloudComponent,
    DropdownComponent,

    AutoGrow,
    InlineAutoGrow,
    OpspotEmoji,
    Emoji,
    Hovercard,
    ScrollLock,
    TagsLinks,
    Tooltip,
    MDL_DIRECTIVES,
    DateSelectorComponent,
    OpspotAvatar,
    CaptchaComponent,
    Textarea,
    InlineEditorComponent,
    NoRightClickDirective,
    DynamicHostDirective,
    OpspotCard,
    OpspotButton,
    PostCard,
    BoostPostCard,
    PostCardTitle,

    ChartComponent,
    OverlayModalComponent,

    AdminActionsButtonComponent,

    MaterialBoundSwitchComponent,

    IfFeatureDirective,

    CategoriesSelectorComponent,
    CategoriesSelectedComponent,
    TreeComponent,

    SidebarMarkersComponent,

    AnnouncementComponent,
    OpspotTokenSymbolComponent,
    PhoneInputComponent,
    SafeToggleComponent,
    ThumbsUpButton,
    ThumbsDownButton,
    DismissableNoticeComponent,
    AnalyticsImpressions,
    GraphSVG,
    GraphPoints,
    LineGraph,
    PieGraph,
    DynamicFormComponent,
    AndroidAppDownloadComponent,
    ImageCroperComponent,
    ReadMoreComponent,
    OpspotWidgetComponent,
    OpspotWidgetSliderComponent,
    OpportunityListCardComponent,
    ShowtimeListCardComponent,
    ShowtimeWidgetComponent,
    MasonryContainerComponent,
    MyjourneyWidgetComponent,
    ActivityWidgetComponent,
    MyjourneyListCardComponent,
    NgxImgCropperComponent
    
  ],
  providers: [
    {
      provide: AttachmentService,
      useFactory: AttachmentService._,
      deps: [Session, Client, Upload]
    },
    {
      provide: UpdateMarkersService,
      useFactory: (_http, _session, _sockets) => { return new UpdateMarkersService(_http, _session, _sockets); },
      deps: [ OpspotHttpClient, Session, SocketsService ],
    },
    {
      provide: OpspotHttpClient,
      useFactory: OpspotHttpClient._,
      deps: [HttpClient]
    },
  ],
  entryComponents: [
    NotificationsToasterComponent,
    // PostCardTitle
  ]
})

export class CommonModule {}