import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import {CommonModule } from '../../common/common.module';
import { FormsModule } from '@angular/forms';

import { BlueStoreRoutingModule } from './blue-store-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { NotificationModule } from '../notifications/notification.module';

@NgModule({
  declarations: [LandingPageComponent, StoreListComponent],
  imports: [
    NgCommonModule,
    BlueStoreRoutingModule,
    CommonModule,
    NotificationModule,
    FormsModule
  ]
})
export class BlueStoreModule { }
