import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule} from '@angular/common';
import { BigEventCreate } from './create/big-event-create';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BigEventView } from './view/big-event-view';
import { CommonModule } from '../../common/common.module';



// TODO @gayatri: handle all other requests
const bigeventRoutes: Routes = [
  {
    path: 'event/create',
    component: BigEventCreate,
  },
  {
    path: 'events/view/:guid',
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
    BigEventView
  ],
  imports: [
    CommonModule,
    NgCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(bigeventRoutes),
    BsDatepickerModule.forRoot(),
    TextMaskModule,

  ]
})
export class BigEventModule { }
