import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { OpspotTitle } from '../../../services/ux/title';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { LoginComponent } from '../login.component';
import { LoginForm } from '../../forms/login/login';
import { Form, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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
  otp

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
    public formBuilder: FormBuilder
  ) {
    this.step1Form = this.formBuilder.group({
      mobileEmail: ['', [Validators.required]]
    }),
      this.step2Form = this.formBuilder.group({
        // otpNum: this.formBuilder.group({
        otpNum1: ['', [Validators.required]],
        otpNum2: ['', [Validators.required]],
        otpNum3: ['', [Validators.required]],
        otpNum4: ['', [Validators.required]],
        otpNum5: ['', [Validators.required]],
        otpNum6: ['', [Validators.required]]
      }),
      // })
      this.step3Form = this.formBuilder.group({
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', []]
      }, { validators: this.passwordConfirmcheck })
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

  request() {
    this.submitted1 = true;
    this.mobileOremail = this.step1Form.value.mobileEmail
    if (this.step1Form.valid) {
      if (isNaN(this.mobileOremail)) { //forgot password by email
        this.error = '';
        this.inProgress = true;
        this.client.post('api/v1/forgotpassword/request', {
          key: "email",
          value: this.mobileOremail
        })
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
        this.client.post('api/v3/verification/mobile/verify', {
          number: this.mobileOremail
        })
          .then((data: any) => {
            this.secret = data.secret
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
    var keyCode = event.keyCode;
    if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element
    if (nextInput == null)  // check the maxLength from here
      return;
    else
      nextInput.focus();
  }

  prevOtpNum(event) {
    var keyCode = event.keyCode;
    // let currInput = event.target; // current element
    let prevInput = event.srcElement.previousElementSibling; // get the previous element
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

  validateOtp() {
    this.otp = this.step2Form.value.otpNum1 + this.step2Form.value.otpNum2 + this.step2Form.value.otpNum3 + this.step2Form.value.otpNum4 + this.step2Form.value.otpNum5 + this.step2Form.value.otpNum6
    this.submitted2 = true;
    if (this.step2Form.valid) {
      this.client.post('api/v3/verification/mobile/confirm', {
        number: this.mobileOremail,
        code: this.otp,
        secret: this.secret
      }).then(
        data => {
          if (data) {
            this.step = 4;
          }
        },
        error => { }
      )
    }
  }

  passwordConfirmcheck(c: AbstractControl) {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
      return { passwordMismatched: true };
    }
    return null;
  }

  updatePassword() {
    this.submitted3 = true;
    if (this.step3Form.valid)
      this.router.navigate(['/login']);
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
