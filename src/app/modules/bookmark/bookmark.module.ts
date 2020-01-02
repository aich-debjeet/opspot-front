import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';
import { LegacyModule } from '../legacy/legacy.module';
import {CommonModule} from '../../common/common.module';
import { ChannelsModule } from '../channels/channels.module';


const bookmarkRoutes:Routes=[{
  path:'bookmark',component:BookmarkViewComponent
}]


@NgModule({
  declarations: [BookmarkViewComponent],
  imports: [
    CommonModule,
    NgCommonModule,
    LegacyModule,
    ChannelsModule,
    RouterModule.forChild(bookmarkRoutes)
  ]
})
export class BookmarkModule { }
