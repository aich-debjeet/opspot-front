import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '../../common/common.module';

import { CampaignComponent } from './campaign.component';
import { EnrolmentViewComponent } from './view/view.component';
import { EnrolmentFormComponent } from './form/form.component';
import { EnrolmentInvoiceComponent } from './invoice/invoice.component';
import { NotificationModule } from '../notifications/notification.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';

const routes: Route[] = [
  // to be redirected to the active campaign
  // { path: '', redirectTo: 'enrolment', pathMatch: 'full' },
  { path: 'create', component: CreateCampaignComponent },
  { path: 'edit/:guid', component: EditCampaignComponent },
  { path: ':guid', component: EnrolmentViewComponent },
  { path: 'invoice/:campaignGuid/:enrollGuid', component: EnrolmentInvoiceComponent },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
];

@NgModule({
  declarations: [
    CampaignComponent,
    EnrolmentViewComponent,
    EnrolmentFormComponent,
    EnrolmentInvoiceComponent,
    CreateCampaignComponent,
    EditCampaignComponent,
  ],
  imports: [
    FormsModule,
    NgCommonModule,
    CommonModule,
    ReactiveFormsModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
