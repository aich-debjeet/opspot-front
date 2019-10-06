import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '../../common/common.module';
import { ExploreComponent } from './explore.component';
import { FormsModule } from '@angular/forms';

const exploreRoutes: Routes = [
  { path: 'explore', component: ExploreComponent }
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(exploreRoutes),
    CommonModule,
    FormsModule
  ],
  declarations: [ExploreComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExploreModule {}
