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
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Route[] = [
  // to be redirected to the active campaign
  // { path: '', redirectTo: 'enrolment', pathMatch: 'full' },
  { path: 'create', component: CreateCampaignComponent },
  { path: 'dashboard/:guid', component: DashboardComponent },
  { path: 'edit/:guid', component: EditCampaignComponent },
  { path: ':guid', component: EnrolmentViewComponent },
  { path: 'invoice/:campaignGuid/:enrollGuid', component: EnrolmentInvoiceComponent },
  
];

@NgModule({
  declarations: [
    CampaignComponent,
    EnrolmentViewComponent,
    EnrolmentFormComponent,
    EnrolmentInvoiceComponent,
    CreateCampaignComponent,
    EditCampaignComponent,
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    NgCommonModule,
    CommonModule,
    ReactiveFormsModule,
    NotificationModule,
    TextMaskModule,
    TagInputModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class CampaignModule { }
