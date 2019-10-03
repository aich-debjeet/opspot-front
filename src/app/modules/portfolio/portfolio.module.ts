import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';

// components
import { PortfolioComponent } from './portfolio.component';
import { PortfolioInnerComponent } from './portfolio-inner/portfolio-inner.component';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';

// TODO @abhijeet: handle the other routes
const routes: Routes = [
  { path: 'portfolio/:username', component: PortfolioComponent },
  {
    path: 'portfolio/view/:guid',
    component: PortfolioInnerComponent,
  }
];

@NgModule({
  declarations: [PortfolioComponent,PortfolioInnerComponent],
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    LegacyModule,
    PostMenuModule
  ]
})
export class PortfolioModule { }
