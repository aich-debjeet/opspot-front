import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EnrolmentDashboardViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: EnrolmentDashboardViewComponent }
];

@NgModule({
  declarations: [
    EnrolmentDashboardViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
