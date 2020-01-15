import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { NgxIntlTelInputModule }  from 'ngx-intl-tel-input';

import { LoginForm } from './login/login';
import { RegisterForm } from './register/register';
import { FbRegisterForm } from './fb-register/fb-register';
import { OnboardingForm } from './onboarding/onboarding';
import { OnboardingCategoriesSelector } from './categories-selector/categories-selector';
import { Tutorial } from './tutorial/tutorial';
import { CaptchaModule } from '../captcha/captcha.module';
import { ExperimentsModule } from '../experiments/experiments.module';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { OpportunityFormComponent } from './opportunity-form/opportunity-form.component';
import { ShowtimezFormComponent } from './showtimez-form/showtimez-form.component';
import { BlueStoreFormComponent } from './blue-store-form/blue-store-form.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import { MyJourneyFormComponent } from './my-journey-form/my-journey-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PostFormComponent } from './post-form/post-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
// import { AuthModule } from '../auth/auth.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { PaywallMessageComponent } from './post-form/paywall-message.component';

@NgModule({
  imports: [
    NgCommonModule,
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule,
    CaptchaModule,
    ExperimentsModule,
    NgxIntlTelInputModule,
    TextMaskModule,
    BsDatepickerModule.forRoot(),
    NgOtpInputModule
  ],
  declarations: [
    LoginForm,
    RegisterForm,
    FbRegisterForm,
    OnboardingForm,
    OnboardingCategoriesSelector,
    Tutorial,
    ForgotPasswordComponent,
    OpportunityFormComponent,
    ShowtimezFormComponent,
    BlueStoreFormComponent,
    PortfolioFormComponent,
    MyJourneyFormComponent,
    PostFormComponent,
    PaywallMessageComponent
  ],
  exports: [
    LoginForm,
    RegisterForm,
    FbRegisterForm,
    OnboardingForm,
    OnboardingCategoriesSelector,
    Tutorial,
    ForgotPasswordComponent,
    OpportunityFormComponent,
    ShowtimezFormComponent,
    BlueStoreFormComponent,
    PortfolioFormComponent,
    MyJourneyFormComponent,
    PostFormComponent
  ],
  entryComponents: [
    OpportunityFormComponent,
    BlueStoreFormComponent,
    ShowtimezFormComponent,
    PostFormComponent,
    PaywallMessageComponent
  ]
})
export class OpspotFormsModule {
}