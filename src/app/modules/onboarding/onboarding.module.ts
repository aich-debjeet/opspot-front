import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { TokenOnboardingModule } from '../wallet/tokens/onboarding/onboarding.module';
import { MessengerModule } from '../messenger/messenger.module';
import { OnboardingCardComponent } from './card/card.component';
import { OnboardingFeedComponent } from './feed.component';
import { OnboardingService } from './onboarding.service';
import { OnboardingModalComponent } from './modal.component';
import { ChannelOnboardingService } from "./channel/onboarding.service";
import { WelcomeOnboardingComponent } from "./channel/welcome/welcome.component";
import { TopicsOnboardingComponent } from "./channel/topics/topics.component";
import { ChannelOnboardingComponent } from "./channel/onboarding.component";
import { SubscriptionsOnboardingComponent } from "./channel/subscriptions/subscriptions.component";
import { ChannelsTileComponent } from "../channels/tile/tile.component";
import { GroupsOnboardingComponent } from "./channel/groups/groups.component";
import { GroupsTileComponent } from "../groups/tile/tile.component";
import { ChannelSetupOnboardingComponent } from "./channel/channel/channel.component";
import { TokenRewardsOnboardingComponent } from "./channel/rewards/rewards.component";
import { Client } from "../../services/api/client";
import { SuggestionsModule } from "../suggestions/suggestions.module";
import { Session } from "../../services/session";
import { ProfessionsOnboardingComponent } from './channel/professions/professions.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  imports: [
    NgCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
    CommonModule,
    TokenOnboardingModule,
    MessengerModule,
    SuggestionsModule,
    TagInputModule
  ],
  declarations: [
    OnboardingCardComponent,
    OnboardingFeedComponent,
    OnboardingModalComponent,
    ChannelOnboardingComponent,
    WelcomeOnboardingComponent,
    TopicsOnboardingComponent,
    SubscriptionsOnboardingComponent,
    GroupsOnboardingComponent,
    ChannelSetupOnboardingComponent,
    TokenRewardsOnboardingComponent,
    ProfessionsOnboardingComponent,
  ],
  providers: [
    OnboardingService,
    {
      provide: ChannelOnboardingService,
      deps: [Client, Session],
      useFactory: ChannelOnboardingService._
    },
  ],
  exports: [
    OnboardingCardComponent,
    OnboardingFeedComponent,
    ChannelOnboardingComponent,
  ],
  entryComponents: [
    OnboardingModalComponent,
    WelcomeOnboardingComponent,
    TopicsOnboardingComponent,
    SubscriptionsOnboardingComponent,
    ChannelsTileComponent,
    GroupsTileComponent,
    GroupsOnboardingComponent,
    ChannelSetupOnboardingComponent,
    TokenRewardsOnboardingComponent,
    ProfessionsOnboardingComponent
  ],
})
export class OnboardingModule {
}
