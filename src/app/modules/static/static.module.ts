import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StaticComponent } from './static.component';
import { CommunityGuidelinesComponent } from './community-guidelines/community-guidelines.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { CopyrightPolicyComponent } from './copyright-policy/copyright-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermUseComponent } from './term-use/term-use.component';
import { EnrollmentTermsComponent } from './enrollment-terms/enrollment-terms.component';
import { BluestoreTermsComponent } from './bluestore-terms/bluestore-terms.component';
import { ArtNirbharTermsComponent } from './art-nirbhar-terms/art-nirbhar-terms.component';

export const routes: Routes = [
  { path: '', redirectTo: 'terms' },
  // { path: '', component: StaticComponent },
  {
    path: '',
    component: StaticComponent,
    children: [
      { path: 'community', component: CommunityGuidelinesComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent },
      { path: 'copyright-policy', component: CopyrightPolicyComponent },
      { path: 'enrollment', component: EnrollmentTermsComponent},
      { path: 'terms_blue', component:BluestoreTermsComponent},
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms', component: TermUseComponent },
      { path: 'terms_art', component: ArtNirbharTermsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    StaticComponent,
    CommunityGuidelinesComponent,
    CookiePolicyComponent,
    CopyrightPolicyComponent,
    PrivacyPolicyComponent,
    TermUseComponent,
    EnrollmentTermsComponent,
    BluestoreTermsComponent,
    ArtNirbharTermsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StaticModule { }
