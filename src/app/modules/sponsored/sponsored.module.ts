import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsoredRoutingModule } from './sponsored-routing.module';
import { SponsoredListsComponent } from './sponsored-lists/sponsored-lists.component';

@NgModule({
  declarations: [SponsoredListsComponent],
  imports: [
    CommonModule,
    SponsoredRoutingModule
  ]
})
export class SponsoredModule { }
