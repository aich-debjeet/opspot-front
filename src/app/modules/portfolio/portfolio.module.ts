import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { CommonModule } from '../../common/common.module';

// components
import { PortfolioComponent } from './portfolio.component';


const porfolioRoutes: Routes = [
  { path: 'porfolio', component: PortfolioComponent }
];

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    NgCommonModule,
    RouterModule.forChild(porfolioRoutes),
    CommonModule
  ]
})
export class PortfolioModule { }
