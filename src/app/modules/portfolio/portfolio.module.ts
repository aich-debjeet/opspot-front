import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { FormsModule } from '@angular/forms';

// components
import { PortfolioComponent } from './portfolio.component';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';

const routes: Routes = [
  { path: 'portfolio/:username', component: PortfolioComponent }
];

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    LegacyModule,
    PostMenuModule,
    FormsModule
  ]
})
export class PortfolioModule { }
