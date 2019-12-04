import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule} from '@angular/common';

import { ShareMenuComponent } from './share-menu.component';
import { ModalsModule } from '../../../modules/modals/modals.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '../../common.module';

@NgModule({
  imports: [
    CommonModule,
    NgCommonModule,
    FormsModule,
    ModalsModule
  ],
  exports: [ ShareMenuComponent ],
  declarations: [ ShareMenuComponent ],
  providers: [],
  entryComponents: [ ShareMenuComponent ]
})
export class ShareMenuModule {
}
