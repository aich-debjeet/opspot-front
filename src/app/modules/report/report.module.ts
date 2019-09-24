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
import { CreatorSuccessComponent } from './creator/creator-success/creator-success.component';
import { ProfileReportSuccessComponent } from './profile-report/profile-report-success/profile-report-success.component';


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
    ProfileReportComponent,
    CreatorSuccessComponent,
    ProfileReportSuccessComponent
  ],
  exports: [
    ReportConsoleComponent
  ],
  entryComponents: [
    ReportCreatorComponent,
    ProfileReportComponent,
    CreatorSuccessComponent,
    ProfileReportSuccessComponent
  ]
})

export class ReportModule {
}
