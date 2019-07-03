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
// import { AuthModule } from '../auth/auth.module';

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

  ],
  declarations: [
    LoginForm,
    RegisterForm,
    FbRegisterForm,
    OnboardingForm,
    OnboardingCategoriesSelector,
    Tutorial,
    ForgotPasswordComponent
  ],
  exports: [
    LoginForm,
    RegisterForm,
    FbRegisterForm,
    OnboardingForm,
    OnboardingCategoriesSelector,
    Tutorial,
    ForgotPasswordComponent
  ]
})
export class OpspotFormsModule {
}
