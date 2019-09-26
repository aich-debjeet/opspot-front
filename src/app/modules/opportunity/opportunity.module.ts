import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { CommonModule } from '../../common/common.module';
import { OpportunityComponent } from './opportunity.component';
import { Routes, RouterModule } from '@angular/router';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { CommentsModule } from '../comments/comments.module';
import { WireModule } from '../wire/wire.module';
import { LegacyModule } from '../legacy/legacy.module';

const opportunityRoutes: Routes = [
  {
    path: 'opportunity/view/:guid',
    component: OpportunityComponent,
  }
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
]

@NgModule({
  declarations: [OpportunityComponent],
  imports:[
    CommonModule,
    NgCommonModule,
    RouterModule.forChild(opportunityRoutes),
    // PostMenuComponent
    PostMenuModule,
    CommentsModule,
    WireModule,
    LegacyModule
  ]
})
export class OpportunityModule { }
