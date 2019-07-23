import { Component, EventEmitter, ViewChild, Input, Output, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { ReCaptchaComponent } from '../../../modules/captcha/recaptcha/recaptcha.component';
import { ExperimentsService } from '../../experiments/experiments.service';
import { Service } from './service';

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
  otpView=false;
  verifiedOtp = false;
  showFbForm: boolean = false;

  form: FormGroup;
  fbForm: FormGroup;
  opspot = window.Opspot;

  @Output() done: EventEmitter<any> = new EventEmitter();

  @ViewChild('reCaptcha') reCaptcha: ReCaptchaComponent;
  dateOfBirth;

  constructor(
    public session: Session,
    public client: Client,
    fb: FormBuilder,
    public zone: NgZone,
    private experiments: ExperimentsService,
    private service: Service

  ) {
    this.form = fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.checkPassword]],
      password2: ['', Validators.required],
      otp: fb.group({
        otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: ''
      }, { updateOn: 'blur', }),
      tos: [false],
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
  onMobileNumbr() {
    let numbers;
    this.form.controls['mobileNumber'].valueChanges.subscribe(val => {
      numbers = this.removeSpace(val.internationalNumber);
      this.getOtp(numbers)
    });
  }
  onOtp() {
    this.form.controls['otp'].valueChanges.subscribe(val => {
      let a = Object.values(val);
      let values = '';
      a.forEach(a => { values += a });
      if (values.length === 6) {
       const phoneNumber = this.removeOperators(this.form.value.mobileNumber.internationalNumber);
        const data = {
          'number': phoneNumber,
          'code': values,
          'secret': localStorage.getItem('phoneNumberSecret')
        }
        this.service.verifyMobile(data)
          .then((data: any) => {
            this.verifiedOtp = true;
            if(this.errorMessage === 'Confirmation failed'){
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

    })
  }
  //for getting otp
   getOtp(numbr) {
    this.service.getOtp(numbr).then((res: any) => {
      this.otpView = true;
      localStorage.setItem('phoneNumberSecret', res.secret);
    });
  }

  ngOnInit() {
    this.dateOfBirth = this.dob();
    if (this.reCaptcha) {
      this.reCaptcha.reset();
    }
    this.onMobileNumbr()
    this.onOtp()
  }

  register(e) {
    // console.log(this.form.value);
    e.preventDefault();
    this.errorMessage = '';
    if (!this.form.value.tos) {
      this.errorMessage = 'To create an account you need to accept terms and conditions.';
      return;
    }
    if (this.form.valid) {

      const otpCode = `${this.form.value.otp.otp1}${this.form.value.otp.otp2}${this.form.value.otp.otp3}${this.form.value.otp.otp4}${this.form.value.otp.otp5}${this.form.value.otp.otp6}`;
      const phoneNumber = this.removeOperators(this.form.value.mobileNumber.internationalNumber);

      const form = {
        'name': this.form.value.fullname,
        'username': this.form.value.username,
        'number': phoneNumber,
        'code': otpCode,
        'secret': localStorage.getItem('phoneNumberSecret'),
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
            this.errorMessage = 'RegisterException::AuthenticationFailed';
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
    let date = ['Date', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let month = ['Month', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let year = ['Year'];
    let a = new Date().getFullYear() - 13;
    let ab = a - 70;
    for (let i: any = a; i >= ab; i--) {
      year.push(i)
    }
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
      this.form.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
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
  removeSpace(numb){
    return numb.replace(/\s/g, '')
  }

  removeOperators(numb){
    return numb.replace(/\s/g, '').replace('+', '').replace('-', '');
  }

}