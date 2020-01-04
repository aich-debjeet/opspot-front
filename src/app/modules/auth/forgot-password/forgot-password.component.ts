import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { OpspotTitle } from '../../../services/ux/title';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotpasswordService } from './forgotpassword.service';
import { FormValidator } from '../../../helpers/form.validator'
import * as _ from 'lodash';


@Component({
  moduleId: module.id,
  selector: 'm-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})

export class ForgotPasswordComponent {

  error = '';
  inProgress = false;
  step = 0;
  username = '';
  code = '';

  // step0
  emailForm: FormGroup;
  email;
  submitted1 = false;

  //step1
  mobileForm: FormGroup;
  mobile;
  invalidMobileForm: boolean = false;

  // ste2
  otpForm: FormGroup;
  secret;
  submitted2 = false;
  otp;
  resending = false;
  invalidOtp = true;

  // step3
  updatePasswordForm: FormGroup;
  submitted3 = false;
  password;

  paramsSubscription: Subscription;
  mobilenumber;
  
  otpConfig = {
    allowNumbersOnly: true,
    length: 6
  };

  constructor(
    public client: Client,
    public router: Router,
    public route: ActivatedRoute,
    public title: OpspotTitle,
    public session: Session,
    public formBuilder: FormBuilder,
    private forgotpasswordservice: ForgotpasswordService
  ) {
    this.buildForm('mobile');
  }


  ngOnInit() {
    // this.title.setTitle('Forgot Password');
    this.paramsSubscription = this.route.params.subscribe((params) => {
      if (params['code']) {
        // console.log("params['code']: ", params['code']);
        this.setCode(params['code']);
      }
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  setCode(code: string) {
    this.step = 4;
    this.buildForm('password');
    this.code = code;
    // console.log("this.code: ",this.code);
    
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  buildForm(val: string) {
    if (val === 'email') {
      this.emailForm = this.formBuilder.group({
        emailInput: ['', [Validators.required]]
      }, { validators: FormValidator.validateEmail });
    } else if (val === 'mobile') {
      this.mobileForm = this.formBuilder.group({
        mobileInput: ['', [Validators.required]]
      });
    } else if (val === 'otp') {
      // this.otpForm = this.formBuilder.group({
      //   otpNum1: [''],
      //   otpNum2: [''],
      //   otpNum3: [''],
      //   otpNum4: [''],
      //   otpNum5: [''],
      //   otpNum6: ['']
      // }, { validators: FormValidator.otpValidation });
    } else if (val === 'password') {
      this.updatePasswordForm = this.formBuilder.group({
        newPassword: ['', [Validators.required, FormValidator.checkPassword]],
        confirmPassword: ['',Validators.required]
      }, { validators: FormValidator.passwordConfirmcheck });
    }
  }


  showView(stepNum: number) {
    this.step = stepNum;
    if (this.step === 1) {
      this.submitted1 = false;
      this.buildForm('email');
    } else if (this.step === 0) {
      this.submitted1 = false;
      this.buildForm('mobile');
    }
  }

  // step1From request for otp by email or mobilenumber
  requestEmail() {
    this.submitted1 = true;
    this.email = this.emailForm.value.emailInput;
    //localStorage.setItem("email", this.email);
    console.log(this.emailForm.valid);

    if (this.emailForm.valid) {
      this.error = '';
      this.inProgress = true;
      const data = ({
        key: 'email',
        value: this.email
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
            setTimeout(() => {
              this.error = '';
            }, 5000);
          }
        });
    }
  }

  requestMobile() {
    this.submitted1 = true;
    if (this.mobileForm.valid) {
      this.mobile = this.removeOperators(this.mobileForm.value.mobileInput.internationalNumber);
      //localStorage.setItem("mobileNumber", mobileNumber);
      this.error = '';
      this.inProgress = true;
      const data = ({
        retry: false,
        key: "phone_number",
        value: this.mobile
      });
      this.forgotpasswordservice.sendOtp(data)
        .then((data: any) => {
          this.secret = data.secret;
          this.mobilenumber = '******' + _.takeRight(this.mobile, 4).join('');
          //localStorage.setItem('phoneNumberSecret', data.secret);
          this.inProgress = false;
          this.step = 2;
          this.buildForm('otp');
        })
        .catch((e) => {
          this.inProgress = false;
          if (e.status === 'failed') {
            this.error = 'There was a problem trying to reset your password. Please try again.';
          }
          if (e.status === 'error') {
            this.error = e.message;
            setTimeout(() => {
              this.error = '';
            }, 5000);
          }
        });
    }
  }

  removeOperators(numb) {
    return numb.replace(/\s/g, '').replace('+', '').replace('-', '');
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

  // otpForm otp validation
  validateOtp() {
    // this.otp = this.otpForm.value.otpNum1 + this.otpForm.value.otpNum2 + this.otpForm.value.otpNum3 + this.otpForm.value.otpNum4 + this.otpForm.value.otpNum5 + this.otpForm.value.otpNum6;
    this.submitted2 = true;
    this.error = '';
    if (this.otp.length === this.otpConfig.length) {
      this.inProgress = true;
      const data = ({
        key: "phone_number",
        //value: localStorage.getItem("mobileNumber"), this
        value: this.mobile,
        code: this.otp,
        secret: this.secret
      });
      this.forgotpasswordservice.validateOtp(data)
        .then((data: any) => {
          // console.log("data: ", data);
          this.inProgress = false;
          if (data) {
            this.setCodeAndUsername(data.code, data.username)
          }
          // this.step = 4;
          // this.buildForm('password');
        })
        .catch((e) => {
          this.inProgress = false;
          if (e.status === 'error') {
            this.error = e.message;
            setTimeout(() => {
              this.error = '';
            }, 5000);
          }
        });
    }
  }

  setCodeAndUsername(code, username) {
    this.router.navigateByUrl('/forgot-password;username=' + username + ";code=" + code)
  }

  // resend otp for mobile
  resendOtp() {
    this.resending = true;
    const data = ({
      retry: true,
      key: "phone_number",
      value: this.mobile
    });
    this.forgotpasswordservice.resendOtp(data).then((data: any) => {
      //localStorage.setItem('phoneNumberSecret', data.secret);
      this.secret = data.secret;
      this.inProgress = false;
    })
      .catch((e) => {
        this.inProgress = false;
        if (e.status === 'failed') {
          this.error = 'There was a problem trying to reset your password. Please try again.';
        }
        if (e.status === 'error') {
          this.error = e.message;
          setTimeout(() => {
            this.error = '';
          }, 5000);
        }
      });;
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  // resend email link
  resentEmaillink() {
    this.resending = true;
    const data = {
      key: 'email',
      value: this.email
      //value: localStorage.getItem("email")
    };
    this.forgotpasswordservice.resentEmaillink(data);
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  // for updating the password
  updatePassword() {
    this.submitted3 = true;
    this.password = this.updatePasswordForm.get('newPassword').value;
    if (this.updatePasswordForm.valid) {
      const data = ({
        password: this.password,
        code: this.code,
        username: this.username
      }) 
      this.forgotpasswordservice.reset(data)
        .then((response: any) => {
          this.session.login(response.user);
          this.router.navigate(['/newsfeed']);
        })
        .catch((e) => {
          this.error = e.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        });
     // this.router.navigate(['/login']);
    }
  }

  goHome(){
    this.router.navigateByUrl('/login');
  }

  onOtpChange(otp) {
    this.otp = otp;
    if (this.otp.toString().length === 6) {
      this.invalidOtp = false;
    } else {
      this.invalidOtp = true;
    }
  }
}
