import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegacyModule } from '../legacy/legacy.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CommonModule } from '../../common/common.module';
import { SuggestionsSlider } from './slider/slider.component';
import { SuggestionsSidebar } from './channel/sidebar.component';
import { GroupSuggestionsSidebarComponent } from './groups/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    NgCommonModule,
    RouterModule,
    LegacyModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  declarations: [
    SuggestionsSlider,
    SuggestionsSidebar,
    GroupSuggestionsSidebarComponent,
  ],
  exports: [
    SuggestionsSlider,
    SuggestionsSidebar,
    GroupSuggestionsSidebarComponent,
  ],
})
export class SuggestionsModule {
}

