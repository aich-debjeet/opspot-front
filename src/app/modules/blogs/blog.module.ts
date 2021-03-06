import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { ModalsModule } from '../modals/modals.module';
import { AdsModule } from '../ads/ads.module';
import { LegacyModule } from '../legacy/legacy.module';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';


import { BlogListComponent, BlogViewInfinite } from './list.component';
import { BlogEdit } from './generic-view/edit/edit';
import { BlogCard } from './card/card';
import { BlogView } from './view/view';
import { BlogTileComponent } from './tile/tile.component';
import { WireModule } from '../wire/wire.module';
import { CommentsModule } from '../comments/comments.module';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogAllComponent } from './blog-all/blog-all.component';
import { GenericViewComponent } from './generic-view/generic-view.component';
// import { ModalsModule } from '../modals/modals.module';
import { ShareMenuModule } from '../../common/components/share-menu/share-menu.module';
import { TagInputModule } from 'ngx-chips';
// import { OpspotFormsModule } from '../forms/forms.module';


const routes: Routes = [
  { path: 'blog/view/:guid/:title', component: BlogViewInfinite },
  { path: 'blog/view/:guid', component: BlogViewInfinite },
  { path: 'blog/preview/:guid', component: BlogPreviewComponent },
  {
    path: 'blog', component: GenericViewComponent,
    children: [
      { path: '', redirectTo: 'edit/:guid', pathMatch: 'full' },
      { path: 'edit/:guid', component: BlogEdit },
      { path: 'edit/:guid/:groupGuid', component: BlogEdit },
      { path: ':status', component: BlogAllComponent },
      // { path: 'published', component: BlogAllComponent }
    ]
  },
  // { path: 'blog/:filter', component: BlogListComponent },
  // { path: 'blog', redirectTo: '/blog/top', pathMatch: 'full' },
  { path: ':username/blog/:slugid', component: BlogViewInfinite },
  // { path: 'blog/publish', component: BlogAllComponent }
];

@NgModule({
  imports: [
    NgCommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    AdsModule,
    CommentsModule,
    LegacyModule,
    PostMenuModule,
    WireModule,
    HashtagsModule,
    ShareMenuModule,
    TagInputModule
    // OpspotFormsModule
  ],
  declarations: [
    BlogView,
    BlogCard,
    BlogViewInfinite,
    BlogEdit,
    BlogListComponent,
    BlogTileComponent,
    BlogPreviewComponent,
    BlogViewComponent,
    BlogAllComponent,
    GenericViewComponent
  ],
  exports: [
    BlogView,
    BlogCard,
    BlogViewInfinite,
    BlogEdit,
    BlogListComponent,
    BlogTileComponent,
  ],
  entryComponents: [
    BlogCard,
  ]
})
export class BlogModule {
}
