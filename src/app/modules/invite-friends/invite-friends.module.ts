import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InviteFriendsComponent } from './invite-friends.component';

const routes: Routes = [
  {
    path: 'invite',
    component: InviteFriendsComponent,
  }
];

@NgModule({
  declarations: [
    InviteFriendsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    InviteFriendsComponent
  ],
  entryComponents: [
    InviteFriendsComponent
  ]
})
export class InviteFriendsModule { }