import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsoredListsComponent } from './sponsored-lists/sponsored-lists.component';

const routes: Routes = [
  {
    path:'',
    component:SponsoredListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsoredRoutingModule { }
