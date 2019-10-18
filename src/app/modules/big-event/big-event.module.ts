import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigEventCreate } from './create/big-event-create';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BigEventView } from './view/big-event-view';


// TODO @gayatri: handle all other requests
const bigeventRoutes: Routes = [
  {
    path: 'event/create',
    component: BigEventCreate,
  },
  {
    path: 'event/view/:eventId',
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(bigeventRoutes),
    BsDatepickerModule.forRoot(),
    TextMaskModule,

  ]
})
export class BigEventModule { }
