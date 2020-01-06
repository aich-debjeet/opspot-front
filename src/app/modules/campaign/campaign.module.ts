import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { CampaignComponent } from './campaign.component';
import { EnrolmentViewComponent } from './view/view.component';
import { EnrolmentFormComponent } from './form/form.component';

const routes: Route[] = [
  // to be redirected to the active campaign
  { path: '', redirectTo: 'enrolment', pathMatch: 'full' },
  { path: 'enrolment', component: EnrolmentViewComponent },
];

@NgModule({
  declarations: [
    CampaignComponent,
    EnrolmentViewComponent,
    EnrolmentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
