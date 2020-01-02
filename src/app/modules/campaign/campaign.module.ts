import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { CampaignComponent } from './campaign.component';
import { CampaignViewComponent } from './view/view.component';

const routes: Route[] = [
  { path: '', redirectTo: 'enrolment', pathMatch: 'full' },
  { path: 'enrolment', component: CampaignViewComponent },
];

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
