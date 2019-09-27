import { NgModule } from '@angular/core';
import { HashtagsSelectorComponent } from './selector/selector.component';
import { HashtagsSelectorModalComponent } from './hashtag-selector-modal/hashtags-selector.component';
import { TagsInput } from './tags-input/tags.component';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';
import { FormsModule } from '@angular/forms';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { TopbarHashtagsComponent } from './topbar/topbar.component';
import { TopbarHashtagsService } from './service/topbar.service';
import { SkillsTag } from './skills.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    NgCommonModule,
    CommonModule,
    FormsModule,
    TextInputAutocompleteModule,
    TagInputModule,

  ],
  declarations: [
    HashtagsSelectorComponent,
    HashtagsSelectorModalComponent,
    TagsInput,
    TopbarHashtagsComponent,
    SkillsTag
  ],
  exports: [
    HashtagsSelectorComponent,
    HashtagsSelectorModalComponent,
    TagsInput,
    TopbarHashtagsComponent,
    SkillsTag

  ],
  providers: [
    TopbarHashtagsService,
  ],
  entryComponents: [
    HashtagsSelectorModalComponent
  ]
})
export class HashtagsModule {
}
