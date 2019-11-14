import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NetworkComponent } from './network.component';
import { NetworkUserlist } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', component: NetworkComponent }
];

@NgModule({
  declarations: [
    NetworkComponent,
    NetworkUserlist
  ],
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    NetworkComponent
  ]
})
export class NetworkModule { }
