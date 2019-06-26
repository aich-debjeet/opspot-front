import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';

import { OpspotTitle } from '../../../services/ux/title';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import Swal from 'sweetalert2';
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
  mobileOremail

  // ste2
  step2Form: FormGroup;

  // step3
  step3Form: FormGroup;




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
      })
    // })
    this.step3Form = this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, []]
    }, { validators: this.passwordConfirmcheck })
  }



  passwordConfirmcheck(c: AbstractControl): { passwordMismatched: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
      return { passwordMismatched: true };
    }
    return null;
  }


  ngOnInit() {
    // this.title.setTitle('Forgot Password');

    // this.paramsSubscription = this.route.params.subscribe((params) => {
    //   if (params['code']) {
    //     this.setCode(params['code']);
    //   }

    //   if (params['username']) {
    //     this.username = params['username'];
    //   }
    // });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  submitted1 = false;
  request() {
    this.submitted1 = true;
    this.mobileOremail = this.step1Form.value.mobileEmail
    if (isNaN(this.mobileOremail)) {
      //this.step = 3
      // this.error = '';
      // if (this.step1Form.valid)
      //   this.inProgress = true;
      // this.client.post('api/v3/verification/mobile/verify', {
      //   number: this.mobileOremail
      // })
      //   .then((data: any) => {
      //     // username.value = '';
      //     this.inProgress = false;
      //     this.step = 3;
      //   })
      //   .catch((e) => {
      //     this.inProgress = false;
      //     if (e.status === 'failed') {
      //       this.error = 'There was a problem trying to reset your password. Please try again.';
      //     }
      //     if (e.status === 'error') {
      //       this.error = e.message;
      //     }
      //   });
    } else {
      this.error = '';
      if (this.step1Form.valid)
        this.inProgress = true;
      this.client.post('api/v3/verification/mobile/verify', {
        number: this.mobileOremail
      })
        .then((data: any) => {
          // username.value = '';
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


  submitted2 = false;
  otp
  validateOtp() {
    this.otp = this.step2Form.value.otpNum1 + this.step2Form.value.otpNum2 + this.step2Form.value.otpNum3 + this.step2Form.value.otpNum4 + this.step2Form.value.otpNum5 + this.step2Form.value.otpNum6
    this.submitted2 = true;
    if (this.step2Form.valid) {
      this.client.post('api/v3/verification/mobile/confirm', {
        number: '',
        code: this.otp
      })
    }

    //this.step = 4;
  }

  submitted3 = false;
  updatePassword() {
    this.submitted3 = true;
    // this.step = 3;
  }

  nextOtpNum(event) {
    var keyCode = event.keyCode;
    if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element
    let previous = event.srcElement.previousElementSibling; //get the previous
    if (keyCode === 8) {
      if (event.srcElement.previousElementSibling === null) {
        return;
      }
      else { previous.focus(); }
    }
    else if (nextInput == null)  // check the maxLength from here
      return;
    else
      nextInput.focus();
  }

  // setCode(code: string) {
  //   this.step = 3;
  //   this.code = code;
  // }

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
