import { Component, EventEmitter, ViewChild, Input, Output, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { ReCaptchaComponent } from '../../../modules/captcha/recaptcha/recaptcha.component';
import { ExperimentsService } from '../../experiments/experiments.service';

@Component({
  moduleId: module.id,
  selector: 'opspot-form-register',
  templateUrl: 'register.html',
  styleUrls:['register.scss']
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

  showFbForm: boolean = false;

  form: FormGroup;
  fbForm: FormGroup;
  opspot = window.Opspot;

  @Output() done: EventEmitter<any> = new EventEmitter();

  @ViewChild('reCaptcha') reCaptcha: ReCaptchaComponent;

  constructor(
    public session: Session,
    public client: Client,
    fb: FormBuilder,
    public zone: NgZone,
    private experiments: ExperimentsService,
  ) {
    this.form = fb.group({
      fullname:['' ,Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required,this.checkPassword]],
      password2: ['', Validators.required],
      otp:fb.group({
        otp1:'',otp2:'',otp3:'',otp4:'',otp5:'',otp6:''
      }),
      tos: [false],
      mobileNumber:['',{updateOn: 'blur'}],
      exclusive_promotions: [false],
      captcha: [''],
      Homepage121118: experiments.getExperimentBucket('Homepage121118'),
      dobGroup:fb.group({
        date:['', Validators.required],month:['', Validators.required],year:['', Validators.required],
      }),
    },{validator:this.MustMatch('password','password2') } )

    //for dob
   


  }
  dateOfBirth;
  //mobile number entered
  onMobileNumbr(){
   this.form.controls['mobileNumber'].valueChanges.subscribe(val=>{
     console.log(val.internationalNumber)
   })
  }
   
  ngOnInit() {
  
    this.dateOfBirth=this.dob();
    if (this.reCaptcha) {
      this.reCaptcha.reset();
    }
    this.onMobileNumbr()
  }

  register(e) {
    console.log(this.form.value)
    e.preventDefault();
    this.errorMessage = '';
    if (!this.form.value.tos) {
      this.errorMessage = 'To create an account you need to accept terms and conditions.';
      return;
    }

    //re-enable cookies
    document.cookie = 'disabled_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    if (this.form.value.password !== this.form.value.password2) {
      if (this.reCaptcha) {
        this.reCaptcha.reset();
      }

      this.errorMessage = 'Passwords must match.';
      return;
    }

    this.form.value.referrer = this.referrer;

    this.inProgress = true;
    this.client.post('api/v1/register', this.form.value)
      .then((data: any) => {
        // TODO: [emi/sprint/bison] Find a way to reset controls. Old implementation throws Exception;

        this.inProgress = false;
        this.session.login(data.user);

        this.done.next(data.user);
      })
      .catch((e) => {
        console.log(e);
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

  validateUsername() {
    if (this.form.value.username) {
      this.client.get('api/v1/register/validate/' + this.form.value.username)
        .then((data: any) => {
          if (data.exists) {
            this.form.controls.username.setErrors({ 'exists': true });
            this.errorMessage = data.message;
            this.takenUsername = true;
          } else {
            this.takenUsername = false;
            this.errorMessage = '';
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  setCaptcha(code) {
    this.form.patchValue({ captcha: code });
  }

  validationTimeoutHandler() {
    clearTimeout(this.usernameValidationTimeout);
    this.usernameValidationTimeout = setTimeout(this.validateUsername.bind(this), 500);
  }

  // function to give birth date selection
  dob(){
    let date=['Date',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    let month=['Month','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    let year=['Year'];
    let a =new Date().getFullYear()-13;
    let ab=a-70;
      for(let i:any=a; i>=ab; i--){
         year.push(i)
      }
     return {date,month,year}
  }
  //password controls
  checkPassword(control:AbstractControl) {
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
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {return;}
        if (control.value !== matchingControl.value) { matchingControl.setErrors({ mustMatch: true });
        } else {  matchingControl.setErrors(null);
        }
    }
  }

  
}

