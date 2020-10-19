import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlueStoreRoutingModule } from './blue-store-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    BlueStoreRoutingModule
  ]
})
export class BlueStoreModule { }
