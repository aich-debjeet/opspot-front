import { NgModule, NO_ERRORS_SCHEMA ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '../../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreComponent } from './explore.component';
import { ExploreVideoComponent } from './explore-video/explore-video.component';
import { ExploreImageComponent } from './explore-image/explore-image.component';
import { ExploreBlogsComponent } from './explore-blogs/explore-blogs.component';
import { ExploreAudioComponent } from './explore-audio/explore-audio.component';
import { ExploreAllComponent} from './explore-all/explore-all.component';
import { NguCarouselModule } from '@ngu/carousel';


const exploreRoutes: Routes = [
    { path: 'explore', component: ExploreComponent }
  ];

  @NgModule({
    imports: [
      NgCommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(exploreRoutes),
      CommonModule,
      NguCarouselModule,
    ],
    declarations: [
        ExploreVideoComponent,
        ExploreImageComponent,
        ExploreBlogsComponent,
        ExploreAudioComponent,
        ExploreComponent,
        ExploreAllComponent,
    ],
    providers: [
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
  })
  export class ExploreModule {
  }