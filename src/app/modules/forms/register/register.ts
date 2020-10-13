import { Component, EventEmitter, ViewChild, Input, Output, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { ReCaptchaComponent } from '../../../modules/captcha/recaptcha/recaptcha.component';
import { ExperimentsService } from '../../experiments/experiments.service';
import { Service } from './service';
import { MessengerEncryptionService } from '../../messenger/encryption/encryption.service';
import { FormValidator } from '../../../helpers/form.validator'


@Component({
  moduleId: module.id,
  selector: 'opspot-form-register',
  templateUrl: 'register.html',
  styleUrls: ['register.scss']
})

export class RegisterForm {

  errorMessage: string = '';
  twofactorToken: string = '';
  hideLogin: boolean = false;
  inProgress: boolean = false;
  @Input() referrer: string;
  captcha: string;
  takenUsername: boolean = false;
  usernameValidationTimeout: any;
  number;
  noViewOtp = true;
  verifiedOtp = false;
  showFbForm: boolean = false;
  invalidNumberLength: boolean = false;
  enterOtpError: boolean = true;
  countryCode = '91';

  form: FormGroup;
  fbForm: FormGroup;
  opspot = window.Opspot;
  resending = false;
  showTimer = false;

  @Output() done: EventEmitter<any> = new EventEmitter();

  @ViewChild('reCaptcha') reCaptcha: ReCaptchaComponent;
  dateOfBirth;

  otpConfig = {
    allowNumbersOnly: true,
    length: 6
  };
  otp: string;

  constructor(
    public session: Session,
    public client: Client,
    fb: FormBuilder,
    public zone: NgZone,
    private experiments: ExperimentsService,
    private service: Service,
    public encryption: MessengerEncryptionService
  ) {
    // this.dateOfBirth = this.dob();
    this.form = fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, FormValidator.checkPassword]],
      password2: ['', Validators.required],
      agreeTerms: [false],
      mobileNumber: ['', { validators: Validators.required, updateOn: 'blur' }],
      exclusive_promotions: [false],
      captcha: [''],
      Homepage121118: experiments.getExperimentBucket('Homepage121118'),
      dobGroup: fb.group({
        date: ['', Validators.required], month: ['', Validators.required], year: ['', Validators.required],
      }),
    }, { validator: this.MustMatch('password', 'password2') })

    //for dob 
  }

  //mobile number entered
  onMobileNumber() {
    let numbers;
    this.form.controls['mobileNumber'].valueChanges.subscribe(val => {
      if (val) {
        if (val.dialCode) {
          this.countryCode = this.removeOperators(val.dialCode);
        }
        if (val.internationalNumber) {
          numbers = this.removeSpace(val.internationalNumber);
          numbers = this.removeOperators(numbers);
          this.getOtp(numbers);
        }
      }
    });
  }

  onOtp() {
    if (this.otp && this.otp.toString().length === 6) {
      const phoneNumber = this.removeOperators(this.form.value.mobileNumber.internationalNumber);
      const data = {
        'number': phoneNumber,
        'code': this.otp,
        'secret': localStorage.getItem('phone-verification-secret')
      }
      this.service.verifyMobile(data)
        .then((data: any) => {
          this.verifiedOtp = true;
          if (this.errorMessage === 'Confirmation failed') {
            this.errorMessage = ''
          }
          // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
        })
        .catch((e) => {
          if (e.status === 'error') {
            this.verifiedOtp = false;
            this.errorMessage = e.message;
          }
        });
    }
  }

  //for getting otp
  getOtp(number) {
    const data = {
      number: number,
      retry: false,
      country_code: this.countryCode
    }
    this.service.getOtp(data)
      .then((res: any) => {
        this.noViewOtp = false;
        this.invalidNumberLength = false;
        localStorage.setItem('phone-verification-secret', res.secret);
        this.timer1(120);
      })
      .catch((e) => {
        if (e.status === 'error') {
          this.invalidNumberLength = true;
        }
      });
  }

  ngOnInit() {
    this.dateOfBirth = this.dob();
    if (this.reCaptcha) {
      this.reCaptcha.reset();
    }
    this.onMobileNumber();
    this.onOtp();
  }

  register() {
    // console.log(this.form.value);
    if (this.errorMessage.length > 0)
      this.errorMessage = '';
    if (!this.enterOtpError)
      this.enterOtpError = true;

    if (!this.form.value.agreeTerms) {
      if (!this.form.value.agreeTerms) {
        this.errorMessage = 'To create an account you need to accept terms and conditions.';
      }
      return;
    }
    if (this.otp.toString().length != this.otpConfig.length) {
      this.enterOtpError = false;
      return;
    }

    if (this.form.valid) {
      // const otpCode = `${this.form.value.otp.otp1}${this.form.value.otp.otp2}${this.form.value.otp.otp3}${this.form.value.otp.otp4}${this.form.value.otp.otp5}${this.form.value.otp.otp6}`;
      const phoneNumber = this.removeOperators(this.form.value.mobileNumber.internationalNumber);

      const form = {
        'name': this.form.value.fullname,
        'username': this.form.value.username,
        'number': phoneNumber,
        'code': this.otp,
        'country_code': this.countryCode,
        'secret': localStorage.getItem('phone-verification-secret'),
        'email': this.form.value.email,
        'date_of_birth': {
          'year': this.form['controls'].dobGroup['controls'].year.value,
          'month': this.form['controls'].dobGroup['controls'].month.value,
          'day': this.form['controls'].dobGroup['controls'].date.value,
        },
        'password': this.form.value.password,
        'password2': this.form.value.password2
      }
      //re-enable cookies
      document.cookie = 'disabled_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.form.value.referrer = this.referrer;

      this.inProgress = true;
      this.service.register(form)
        .then((data: any) => {
          if (data.user && data.user.guid) {
            // Setting up encryption key for chat
            this.encryption.doSetup(data.user.guid)
              .then(() => {
                // console.log('encryption setup successful!', data.user.guid);
              })
              .catch(() => {
                // console.log('encryption setup error!');
              });
          }
          // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;
          this.inProgress = false;
          this.session.login(data.user);
          this.done.next(data.user);
        })
        .catch((e) => {
          // console.log(e);
          this.inProgress = false;
          if (this.reCaptcha) {
            this.reCaptcha.reset();
          }
          if (e.status === 'failed') {
            //incorrect login details
            this.errorMessage = 'Authentication Failed';
            this.session.logout();
          } else if (e.status === 'error') {
            //two factor?
            this.errorMessage = e.message;
            this.session.logout();
          } else {
            this.errorMessage = "Sorry, there was an error. Please try again.";
          }
          return;
        });
    }
  }

  // validateUsername() {
  //   if (this.form.value.username) {
  //     this.service.validateUsername(this.form.value.username)
  //       .then((data: any) => {
  //         if (data.exists) {
  //           this.form.controls.username.setErrors({ 'exists': true });
  //           this.errorMessage = data.message;
  //           this.takenUsername = true;
  //         } else {
  //           this.takenUsername = false;
  //           this.errorMessage = '';
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }

  setCaptcha(code) {
    this.form.patchValue({ captcha: code });
  }

  // validationTimeoutHandler() {
  //   clearTimeout(this.usernameValidationTimeout);
  //   this.usernameValidationTimeout = setTimeout(this.validateUsername.bind(this), 500);
  // }

  // function to give birth date selection

  dob() {
    let date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let year = [];
    let a = new Date().getFullYear() - 16;
    let ab = a - 70;
    for (let i: any = a; i >= ab; i--) {
      year.push(i)
    }
    console.log(a);
    console.log(year);
    const val = { date, month, year };
    return val;
  }

  //password controls
  checkPassword(control: AbstractControl) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  //password error messages
  getErrorPassword() {
    return this.form.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.form.get('password').hasError('invalidPassword') ? 'Password needs to be at least eight characters, one uppercase letter, one number and no spaces' : '';
  }
  //for confirm password
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) { return; }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  nextOtpNum(event) {
    var keyCode = event.keyCode;
    if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
    let nextInput = event.srcElement.nextElementSibling;
    if (nextInput == null)
      return;
    else
      nextInput.focus();
  }

  prevOtpNum(event) {
    var keyCode = event.keyCode;
    let currInput = event.target;
    let prevInput = event.srcElement.previousElementSibling;
    if (keyCode === 8) {
      if (currInput.value !== '') {
        currInput.value = '';
      } else {
        if (event.srcElement.previousElementSibling === null) {
          return;
        } else { prevInput.focus(); }
      }
    }
  }

  removeSpace(numb) {
    return numb.replace(/\s/g, '')
  }

  removeOperators(numb) {
    return numb.replace(/\s/g, '').replace('+', '').replace(/-/g, '');
  }

  onOtpChange(otp) {
    this.otp = otp;
    if (this.otp.toString().length === 6) {
      this.onOtp();
    }
  }

  // resend otp for mobile
  resendOtp() {
    this.resending = true;
    const data = {
      number: this.removeOperators(this.form.value.mobileNumber.internationalNumber),
      retry: false,
      country_code: this.countryCode
    };
    this.service.getOtp(data).then((data: any) => {
      localStorage.setItem('phone-verification-secret', data.secret);
      this.timer1(120);
      // this.inProgress = false;
    })
      .catch((e) => {
        // this.inProgress = false;
        if (e.status === 'failed') {
          this.errorMessage = 'There was a problem trying to reset your password. Please try again.';
        }
        if (e.status === 'error') {
          this.invalidNumberLength = true;
        }
      });;
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  timerOn = true;
  m: any;
  s: any;
  timer1(remaining) {
    this.showTimer = true;
    document.getElementById("timer").style.visibility = "visible";
    this.m = Math.floor(remaining / 60);
    this.s = remaining % 60;

    this.m = this.m < 10 ? '0' + this.m : this.m;
    this.s = this.s < 10 ? '0' + this.s : this.s;

    document.getElementById('timer').innerHTML = this.m + ':' + this.s;

    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      setTimeout(() => this.timer1(remaining), 1000)
    } else {
      document.getElementById("timer").style.visibility = "hidden";
      this.showTimer = false;
    }
  }


}