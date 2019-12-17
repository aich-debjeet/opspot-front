import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';
import { LegacyModule } from '../legacy/legacy.module';
import {CommonModule} from '../../common/common.module';


const bookmarkRoutes:Routes=[{
  path:'bookmark',component:BookmarkViewComponent
}]


@NgModule({
  declarations: [BookmarkViewComponent],
  imports: [
    CommonModule,
    NgCommonModule,
    LegacyModule,
    RouterModule.forChild(bookmarkRoutes)
  ]
})
export class BookmarkModule { }
