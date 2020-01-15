import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { CommonModule } from '../../../../common/common.module';
import { OpspotAudioComponent } from './audio.component';

@NgModule({
  imports: [
    NgCommonModule,
    CommonModule
  ],
  declarations: [
    OpspotAudioComponent,
  ],
  exports: [
    OpspotAudioComponent,
  ],
})
export class AudioModule {
}
