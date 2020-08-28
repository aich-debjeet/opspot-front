import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';

import { PediaRoutingModule } from './pedia-routing.module';
import { PediaInnerComponent } from './pedia-inner/pedia-inner.component';

@NgModule({
  declarations: [PediaInnerComponent],
  imports: [
    NgCommonModule,
    CommonModule,
    PediaRoutingModule
  ]
})
export class PediaModule { }
