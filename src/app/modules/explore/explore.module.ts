import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '../../common/common.module';
import { ExploreComponent } from './explore.component';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NotificationModule} from '../notifications/notification.module'

const exploreRoutes: Routes = [
  { path: '', component: ExploreComponent }
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(exploreRoutes),
    CommonModule,
    NotificationModule,
    FormsModule,
    SlickCarouselModule,
  ],
  declarations: [ExploreComponent],
  providers: [],
  exports: [
    ExploreComponent
  ],
  entryComponents: [ExploreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExploreModule {}
