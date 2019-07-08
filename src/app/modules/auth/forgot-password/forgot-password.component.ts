import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, from } from 'rxjs';

import { OpspotTitle } from '../../../services/ux/title';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { LoginComponent } from '../login.component';
import { LoginForm } from '../../forms/login/login';
import { Form, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ForgotpasswordService } from './forgotpassword.service';
import {FormValidator } from '../../../helpers/form.validator'

@Component({
  moduleId: module.id,
  selector: 'm-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})

export class ForgotPasswordComponent {

  error = '';
  inProgress = false;
  step = 1;
  username = '';
  code = '';

  // step1
  step1Form: FormGroup;
  mobileOremail;
  submitted1 = false;


  // ste2
  step2Form: FormGroup;
  secret;
  submitted2 = false;
  otp;
  resending = false;


  // step3
  step3Form: FormGroup;
  submitted3 = false;

  paramsSubscription: Subscription;

  constructor(
    public client: Client,
    public router: Router,
    public route: ActivatedRoute,
    public title: OpspotTitle,
    public session: Session,
    public formBuilder: FormBuilder,
    private forgotpasswordservice: ForgotpasswordService
  ) {
    this.step1Form = this.formBuilder.group({
      forgotpInput: ['', [Validators.required]]
    }, { validators: FormValidator.emailMobileValidation });
    this.step2Form = this.formBuilder.group({
      otpNum1: [''],
      otpNum2: [''],
      otpNum3: [''],
      otpNum4: [''],
      otpNum5: [''],
      otpNum6: ['']
    }, { validators: FormValidator.otpValidation });
    this.step3Form = this.formBuilder.group({
      newPassword: ['', [Validators.required, FormValidator.checkPassword]],
      confirmPassword: ['']
    }, { validators: FormValidator.passwordConfirmcheck });
  }


  ngOnInit() {
    // this.title.setTitle('Forgot Password');

    this.paramsSubscription = this.route.params.subscribe((params) => {
      if (params['code']) {
        this.setCode(params['code']);
      }

      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  // step1From request for otp by email or mobilenumber
  request() {
    this.submitted1 = true;
    this.mobileOremail = this.step1Form.value.forgotpInput;
    if (this.step1Form.valid) {
      if (isNaN(this.mobileOremail)) { // forgot password by email
        this.error = '';
        this.inProgress = true;
        const data = ({
          key: 'email',
          value: this.mobileOremail
        });
        this.forgotpasswordservice.sendEmaillink(data)
          .then((data: any) => {
            this.inProgress = false;
            this.step = 3;
          })
          .catch((e) => {
            this.inProgress = false;
            if (e.status === 'failed') {
              this.error = 'There was a problem trying to reset your password. Please try again.';
            }
            if (e.status === 'error') {
              this.error = e.message;
            }
          });
      } else { // forgot password by moilenumber
        this.error = '';
        this.inProgress = true;
        const data = ({
          number: this.mobileOremail
        });
        this.forgotpasswordservice.sendOtp(data)
          .then((data: any) => {
            this.secret = data.secret;
            this.inProgress = false;
            this.step = 2;
          })
          .catch((e) => {
            this.inProgress = false;
            if (e.status === 'failed') {
              this.error = 'There was a problem trying to reset your password. Please try again.';
            }
            if (e.status === 'error') {
              this.error = e.message;
            }
          });
      }
    }
  }


  nextOtpNum(event) {
    let keyCode = event.keyCode;
    if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
    const nextInput = event.srcElement.nextElementSibling; // get the sibling element
    if (nextInput == null) {
      return;
    } else {
      nextInput.focus();
    }
  }

  prevOtpNum(event) {
    let keyCode = event.keyCode;
    // let currInput = event.target; // current element
    const prevInput = event.srcElement.previousElementSibling; // get the previous element
    if (keyCode === 8) { // keycode 8 is backspace
      // if (currInput.value !== '') {
      //   console.log('currInput.value NOT EMPTY');
      //   currInput.value = '';
      // } else {
      if (event.srcElement.previousElementSibling === null) {
        return;
      } else { prevInput.focus(); }
    }
    // }
  }

  // step2form otp validation
  validateOtp() {
    this.otp = this.step2Form.value.otpNum1 + this.step2Form.value.otpNum2 +
      this.step2Form.value.otpNum3 + this.step2Form.value.otpNum4 + this.step2Form.value.otpNum5 + this.step2Form.value.otpNum6;
    this.submitted2 = true;
    this.error = '';
    if (this.step2Form.valid) {
      this.inProgress = true;
      const data = ({
        number: this.mobileOremail,
        code: this.otp,
        secret: this.secret
      });
      this.forgotpasswordservice.validateOtp(data)
        .then((data: any) => {
          this.inProgress = false;
          this.step = 4;
        })
        .catch((e) => {
          this.inProgress = false;
          if (e.status === 'error') {
            this.error = e.message;
          }
        });
    }
  }

  // resend otp for mobile
  resendOtp() {
    this.resending = true;
    const data = ({
      number: this.mobileOremail
    });
    this.forgotpasswordservice.resendOtp(data);
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  // resend email link
  resentEmaillink() {
    this.resending = true;
    const data = {
      key: 'email',
      value: this.mobileOremail
    };
    this.forgotpasswordservice.resentEmaillink(data);
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  // for updating the password
  updatePassword() {
    this.submitted3 = true;
    if (this.step3Form.valid) {
      this.router.navigate(['/login']);
    }
  }
  setCode(code: string) {
    this.step = 4;
    this.code = code;
  }



  // validatePassword(password) {
  //   if (/@/.test(password.value)) {
  //     this.error = '@ is not allowed';
  //   } else {
  //     this.error = null;
  //   }
  // }

  // reset(password) {
  //   if (!this.error) {
  //     this.client.post('api/v1/forgotpassword/reset', {
  //       password: password.value,
  //       code: this.code,
  //       username: this.username
  //     })
  //       .then((response: any) => {
  //         this.session.login(response.user);
  //         this.router.navigate(['/newsfeed']);
  //       })
  //       .catch((e) => {
  //         this.error = e.message;
  //         setTimeout(() => {
  //           this.router.navigate(['/login']);
  //         }, 2000);
  //       });
  //   }
  // }




}
