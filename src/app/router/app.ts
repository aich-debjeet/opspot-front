import { Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { Capture } from '../controllers/capture/capture';
import { Discovery } from '../controllers/discovery/discovery';
import { Admin } from '../controllers/admin/admin';
import { Pages } from '../controllers/pages/pages';

import { ChannelComponent } from '../modules/channels/channel.component';
/**
 * TODO: Load these automagically from gulp
 */

import { CanDeactivateGuardService } from '../services/can-deactivate-guard';
import { RewardsComponent } from '../controllers/rewards/rewards';
import { ProfileEditComponent } from '../modules/channels/profile-edit/profile-edit.component';
import { GeneralComponent } from '../modules/channels/profile-edit/general/general.component';
import { WorkComponent } from '../modules/channels/profile-edit/work/work.component';
import { AboutComponent } from '../modules/channels/profile-edit/about/about.component';
import { ContactComponent } from '../modules/channels/profile-edit/contact/contact.component';
import { EducationComponent } from '../modules/channels/profile-edit/education/education.component';
import { AwardsComponent } from '../modules/channels/profile-edit/awards/awards.component';
import { DataExtractionComponent } from '../modules/data-extraction/data-extraction.component';


export const OpspotAppRoutes: Routes = [
  { path: 'capture', redirectTo: 'media/images/suggested' },

  // redirectTo: 'media/:type/:filter
  { path: 'discovery/suggested/channels', redirectTo: 'channels/suggested' },
  { path: 'discovery/trending/channels', redirectTo: 'channels/suggested' },
  { path: 'discovery/all/channels', redirectTo: 'channels/suggested' },

  { path: 'discovery/suggested/:type', redirectTo: 'media/:type/suggested' },
  { path: 'discovery/trending/:type', redirectTo: 'media/:type/suggested' },
  { path: 'discovery/all/:type', redirectTo: 'media/:type/suggested' },
  { path: 'discovery/owner/:type', redirectTo: 'media/:type/my' },

  { path: 'discovery/suggested', redirectTo: 'channels/suggested' },
  { path: 'discovery/trending', redirectTo: 'media/images/suggested' },
  { path: 'discovery/featured', redirectTo: 'channels/suggested' },

  /* /Legacy routes */

  { path: 'admin/:filter/:type', component: Admin },
  { path: 'admin/:filter', component: Admin },

  { path: 'p/:page', component: Pages },

  { path: 'claim-rewards/:uuid', component: RewardsComponent },
  { path: 'dataextract', component: DataExtractionComponent },
  {
    path: 'profile',
    component: ProfileEditComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralComponent },
      { path: 'work', component: WorkComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'education', component: EducationComponent },
      { path: 'awards', component: AwardsComponent }
    ]
  },
  {
    path: 'invite',
    loadChildren: './modules/invite-friends/invite-friends.module#InviteFriendsModule'
  },
  {
    path: 'campaign',
    loadChildren: './modules/campaign/campaign.module#CampaignModule'
  },
  {
    path:'explore',
    loadChildren: './modules/explore/explore.module#ExploreModule'
  },
  {
    path: 'static',
    loadChildren: './modules/static/static.module#StaticModule'
  },
  {
    path: ':username/:filter',
    component: ChannelComponent
  },
  {
    path: ':username',
    component: ChannelComponent,
    canDeactivate: [CanDeactivateGuardService]
  },
];

export const OpspotAppRoutingProviders: any[] = [
  { provide: APP_BASE_HREF, useValue: '/' }
];
export const OPSPOT_APP_ROUTING_DECLARATIONS: any[] = [
  Capture,
  Discovery,
  Admin,
  Pages,
  RewardsComponent
];
