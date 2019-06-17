import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { ModalsModule } from '../modals/modals.module';
import { OpspotFormsModule } from '../forms/forms.module';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout/all', component: LogoutComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
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
    SweetAlert2Module
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    // ForgotPasswordComponent,
  ],
  entryComponents: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    // ForgotPasswordComponent,
  ]
})

export class AuthModule {
}
