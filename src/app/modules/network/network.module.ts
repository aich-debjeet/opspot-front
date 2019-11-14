import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NetworkComponent }
];

@NgModule({
  declarations: [
    NetworkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    NetworkComponent
  ]
})
export class NetworkModule { }
