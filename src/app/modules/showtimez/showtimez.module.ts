import { NgModule } from '@angular/core';
import { ShowtimezComponent } from './showtimez.component';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';
import { Routes, RouterModule } from '@angular/router';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { CommentsModule } from '../comments/comments.module';
import { WireModule } from '../wire/wire.module';
import { LegacyModule } from '../legacy/legacy.module';
import { TranslateModule } from '../translate/translate.module';
import { ModalsModule } from '../modals/modals.module';
import { ShareMenuModule } from '../../common/components/share-menu/share-menu.module';
import { MessengerModule } from '../messenger/messenger.module';

// TODO @gayatri: handle all other requests
const showtimeRoutes: Routes = [
  {
    path: 'showtime/view/:guid',
    component: ShowtimezComponent,
  }
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
]

@NgModule({
  declarations: [ShowtimezComponent],
  imports: [
    CommonModule,
    NgCommonModule,
    RouterModule.forChild(showtimeRoutes),
    PostMenuModule,
    CommentsModule,
    WireModule,
    LegacyModule,
    TranslateModule,
    ModalsModule,
    ShareMenuModule,
    MessengerModule
  ]
})
export class ShowtimezModule { }
