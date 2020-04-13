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
import { AboutUsComponent } from './about-us/about-us.component';
import { RickyKejComponent } from './ricky-kej/ricky-kej.component';
import { BrodcastComponent } from './ricky-kej/brodcast/brodcast.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout/all', component: LogoutComponent },
  { path: 'logout', component: LogoutComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'register', redirectTo: 'login' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path:'about', component: AboutUsComponent},
  { path: 'rickyKej', component: RickyKejComponent}
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
    OpspotFormsModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AboutUsComponent,
    RickyKejComponent,
    BrodcastComponent,
    // ForgotPasswordComponent,
  ],
  entryComponents: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AboutUsComponent,
    BrodcastComponent
    // ForgotPasswordComponent,
  ],exports:[
    LoginComponent,
  ]
})

export class AuthModule {
}