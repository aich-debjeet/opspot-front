import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InviteFriendsComponent } from './invite-friends.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: InviteFriendsComponent }
];

@NgModule({
  declarations: [
    InviteFriendsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TagInputModule
  ],
  exports: [
    InviteFriendsComponent
  ],
  entryComponents: [
    InviteFriendsComponent
  ]
})
export class InviteFriendsModule { }