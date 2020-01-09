import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    EnrolmentInvoiceComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
