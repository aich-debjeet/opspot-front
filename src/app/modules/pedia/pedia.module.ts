import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PediaRoutingModule } from './pedia-routing.module';
import { PediaInnerComponent } from './pedia-inner/pedia-inner.component';

@NgModule({
  declarations: [PediaInnerComponent],
  imports: [
    CommonModule,
    PediaRoutingModule
  ]
})
export class PediaModule { }
