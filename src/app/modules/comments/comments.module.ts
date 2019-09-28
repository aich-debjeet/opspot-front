import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommentsScrollDirective } from './scroll';
import { CommonModule } from '../../common/common.module';
import { VideoModule } from '../media/components/video/video.module';
import { TranslateModule } from '../translate/translate.module';
import { ModalsModule } from '../modals/modals.module';
import { CommentsListComponent } from './list/list.component';
import { CommentComponent } from './card/comment.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentListComponent } from './comment-list/comment-list.component';

@NgModule({
  imports: [
    NgCommonModule,
    FormsModule,
    RouterModule,
    CommonModule,
    VideoModule,
    TranslateModule,
    ModalsModule,
  ],
  declarations: [
    CommentsScrollDirective,
    CommentComponent,
    CommentsListComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
  exports: [
    CommentsScrollDirective,
    CommentComponent,
    CommentsListComponent,
    CommentListComponent,
    CommentCardComponent,
  ],
  providers: [],
})
export class CommentsModule {
}
