import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigEventComponent } from './big-event.component';
import { Routes, RouterModule } from '@angular/router';


// TODO @gayatri: handle all other requests
const bigeventRoutes: Routes = [
  {
    path: 'event/create',
    component: BigEventComponent,
  }
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
]

@NgModule({
  declarations: [BigEventComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bigeventRoutes),

  ]
})
export class BigEventModule { }
