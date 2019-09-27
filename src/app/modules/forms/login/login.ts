import { Component, EventEmitter, NgZone, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';



@Component({
  moduleId: module.id,
  selector: 'opspot-form-login',
  outputs: ['done', 'doneRegistered'],
  templateUrl: 'login.html',
  styleUrls:['login.scss']
   
})

export class LoginForm {
  errorMessage: string = '';
  twofactorToken: string = '';
  hideLogin: boolean = false;
  inProgress: boolean = false;
  referrer: string;
  opspot = window.Opspot;
  form: FormGroup;
  loginHide: boolean = true;
  invalidUser: boolean = false;
  @Output()vwLogin=new EventEmitter()
  submitted=false;
  done: EventEmitter<any> = new EventEmitter();
  doneRegistered: EventEmitter<any> = new EventEmitter();
  regBtn=true
  constructor(public session: Session, public client: Client, fb: FormBuilder, private zone: NgZone) {

    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  showRegister(){
    this.loginHide=!this.loginHide;
    this.vwLogin.emit(true)
    this.regBtn=!this.regBtn;
  }
  get f(){
    return this.form.controls
  }
  login() {
    this.submitted=true;
    if (this.inProgress)
      return;

    //re-enable cookies
    document.cookie = 'disabled_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    this.errorMessage = '';
    this.invalidUser = false;
    this.inProgress = true;
    this.client.post('api/v1/authenticate', { username: this.form.value.username.trim(), password: this.form.value.password })
      .then((data: any) => {
        // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
        this.inProgress = false;
        this.session.login(data.user);
        this.done.next(data.user);
      })
      .catch((e) => {

        this.inProgress = false;
        this.invalidUser = true;
        if (e.status === 'failed') {
          //incorrect login details
          this.errorMessage = 'Invalid username or password';
          this.session.logout();
        } else if (e.status === 'error') {
          if (e.message === 'LoginException:BannedUser' || e.message === 'LoginException::AttemptsExceeded') {
            this.session.logout();
            this.errorMessage = 'User has exceeded the maximum number of attempts';
          }
          //two factor?
          // this.twofactorToken = e.message;
          // this.hideLogin = true;
        } else {
          this.errorMessage = 'Unknown error';
      ;
        }

      });
  }

  // twofactorAuth(code) {
  //   this.client.post('api/v1/twofactor/authenticate', { token: this.twofactorToken, code: code.value })
  //     .then((data: any) => {
  //       this.session.login(data.user);
  //       this.done.next(data.user);
  //     })
  //     .catch((e) => {
  //       this.errorMessage = e.message;
  //       this.twofactorToken = '';
  //       this.hideLogin = true;
  //     });
  // }

}
