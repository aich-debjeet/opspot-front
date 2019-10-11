import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';
import { BluestoreComponent } from './bluestore.component';
import { Routes, RouterModule } from '@angular/router';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { CommentsModule } from '../comments/comments.module';
import { LegacyModule } from '../legacy/legacy.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// TODO @gayatri: handle all other requests
const blueStoreRoutes: Routes = [
  {
    path: 'item/view/:guid',
    component: BluestoreComponent,
  }
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
]

@NgModule({
  declarations: [BluestoreComponent],
  imports: [
    CommonModule,
    NgCommonModule,
    RouterModule.forChild(blueStoreRoutes),
    PostMenuModule,
    CommentsModule,
    LegacyModule,
    SlickCarouselModule
  ]
})
export class BluestoreModule { }
