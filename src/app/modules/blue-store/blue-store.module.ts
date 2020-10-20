import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlueStoreRoutingModule } from './blue-store-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StoreListComponent } from './store-list/store-list.component';

@NgModule({
  declarations: [LandingPageComponent, StoreListComponent],
  imports: [
    CommonModule,
    BlueStoreRoutingModule
  ]
})
export class BlueStoreModule { }
