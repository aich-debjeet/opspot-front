import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';
import { BluestoreComponent } from './bluestore.component';
import { Routes, RouterModule } from '@angular/router';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { CommentsModule } from '../comments/comments.module';
import { LegacyModule } from '../legacy/legacy.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VideoModule } from '../../modules/media/components/video/video.module';
import { WireModule } from '../wire/wire.module';
import { TranslateModule } from '../translate/translate.module';
import { ModalsModule } from '../modals/modals.module';
import { ShareMenuModule } from '../../common/components/share-menu/share-menu.module';
import { MessengerModule } from '../messenger/messenger.module';


// TODO @gayatri: handle all other requests
const blueStoreRoutes: Routes = [
  {
    path: 'item/:guid',
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
    SlickCarouselModule,
    VideoModule,
    WireModule,
    TranslateModule,
    ModalsModule,
    ShareMenuModule,
    MessengerModule
  ]
})
export class BluestoreModule { }
