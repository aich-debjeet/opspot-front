import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';


const bookmarkRoutes:Routes=[{
  path:'bookmark',component:BookmarkViewComponent
}]


@NgModule({
  declarations: [BookmarkViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bookmarkRoutes)
  ]
})
export class BookmarkModule { }
