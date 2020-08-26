import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PediaInnerComponent } from './pedia-inner/pedia-inner.component';

const routes: Routes = [
  {
    path:'pedia/:info', component: PediaInnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PediaRoutingModule { }
