import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { ReportCreatorComponent } from './creator/creator.component';
import { ReportConsoleComponent } from './console/console.component';
import { CommentsModule } from '../comments/comments.module';
import { ProfileReportComponent } from './profile-report/profile-report.component';


@NgModule({
  imports: [
    FormsModule,
    NgCommonModule,
    RouterModule,
    CommonModule,
    LegacyModule,
    CommentsModule,
  ],
  declarations: [
    ReportCreatorComponent,
    ReportConsoleComponent,
    ProfileReportComponent
  ],
  exports: [
    ReportConsoleComponent
  ],
  entryComponents: [
    ReportCreatorComponent,
    ProfileReportComponent
  ]
})

export class ReportModule {
}
