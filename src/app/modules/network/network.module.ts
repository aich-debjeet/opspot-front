import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NetworkComponent } from './network.component';
import { NetworkUserlist } from './userlist/userlist.component';
import { NetworkConversation } from './conversation/conversation.component';
import { NetworkConversationService } from './conversation.service';
import { Session } from './../../services/session';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: NetworkComponent }
];

@NgModule({
  declarations: [
    NetworkComponent,
    NetworkUserlist,
    NetworkConversation
  ],
  imports: [
    NgCommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    NetworkComponent
  ],
  providers: [
    {
      provide: NetworkConversationService,
      useFactory: NetworkConversationService._,
      deps: [Session]
    },
  ]
})
export class NetworkModule { }
