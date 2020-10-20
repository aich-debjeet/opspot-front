import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
  {
    path:'',
    component:LandingPageComponent,
    children:[
      {
        path:'marketLists',
        component:StoreListComponent
      }
    ]
  },
  //   {
  //   path:'marketLists',
  //   component:StoreListComponent
  // },
  // {
  //   path:'',
  //   redirectTo:'bluestore',
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlueStoreRoutingModule { }
