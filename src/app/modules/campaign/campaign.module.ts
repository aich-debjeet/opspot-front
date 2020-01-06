import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { CampaignComponent } from './campaign.component';
import { EnrolmentViewComponent } from './view/view.component';
import { EnrolmentFormComponent } from './form/form.component';
import { EnrolmentInvoiceComponent } from './invoice/invoice.component';

const routes: Route[] = [
  // to be redirected to the active campaign
  { path: '', redirectTo: 'enrolment', pathMatch: 'full' },
  { path: 'enrolment', component: EnrolmentViewComponent },
  { path: 'invoice', component: EnrolmentInvoiceComponent },
];

@NgModule({
  declarations: [
    CampaignComponent,
    EnrolmentViewComponent,
    EnrolmentFormComponent,
    EnrolmentInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
