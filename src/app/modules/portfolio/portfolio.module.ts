import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { CommonModule } from '../../common/common.module';

// components
import { PortfolioComponent } from './portfolio.component';

// TODO @abhijeet: handle the other routes
const portfolioRoutes: Routes = [
  { path: 'portfolio/:username', component: PortfolioComponent }
];

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    NgCommonModule,
    RouterModule.forChild(portfolioRoutes),
    CommonModule
  ]
})
export class PortfolioModule { }
