import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule} from '@angular/common';
import { BigEventCreate } from './create/big-event-create';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BigEventView } from './view/big-event-view';
import { CommonModule } from '../../common/common.module';
import { BigEventForm } from './form/big-event-form';
import { BigEventEdit } from './edit/big-event-edit';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { LegacyModule } from '../legacy/legacy.module';
import { WireModule } from '../wire/wire.module';
import { ModalsModule } from '../modals/modals.module';
import { CommentsModule } from '../comments/comments.module';
import { ShareMenuModule } from '../../common/components/share-menu/share-menu.module';
import { TranslateModule } from '../translate/translate.module';
import { MessengerModule } from '../messenger/messenger.module';




// TODO @gayatri: handle all other requests
const bigeventRoutes: Routes = [
  {
    path: 'event/create',
    component: BigEventCreate,
  },
  {
    path: 'event/edit/:guid',
    component: BigEventEdit,
  },
  {
    path: 'event/view/:guid',
    component: BigEventView,
  }
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
]

@NgModule({
  declarations: [
    BigEventCreate,
    BigEventView,
    BigEventForm,
    BigEventEdit
  ],
  imports: [
    CommonModule,
    NgCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(bigeventRoutes),
    BsDatepickerModule.forRoot(),
    TextMaskModule,
    PostMenuModule,
    LegacyModule,
    WireModule,
    ModalsModule,
    CommentsModule,
    ShareMenuModule,
    TranslateModule,
    MessengerModule
  ]
})
export class BigEventModule { }
