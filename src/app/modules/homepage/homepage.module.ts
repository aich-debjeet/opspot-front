import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { ModalsModule } from '../modals/modals.module';
import { OpspotFormsModule } from '../forms/forms.module';

import { HomepageComponent } from './homepage.component';
import { MarketingModule } from '../marketing/marketing.module';
import { ExperimentsModule } from '../experiments/experiments.module';
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    NgFormsModule,
    ReactiveFormsModule,
    CommonModule,
    LegacyModule,
    ModalsModule,
    OpspotFormsModule,
    MarketingModule,
    ExperimentsModule,
    AuthModule
  ],
  declarations: [
    HomepageComponent,
  ],
  entryComponents: [
    HomepageComponent
  ]
})

export class HomepageModule {
}
