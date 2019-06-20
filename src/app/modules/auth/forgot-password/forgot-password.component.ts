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
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        otp: this.formBuilder.group({
          otp1: ['', [Validators.required]], 
          otp2: ['', [Validators.required]], 
          otp3: ['', [Validators.required]], 
          otp4: ['', [Validators.required]], 
          otp5: ['', [Validators.required]], 
          otp6: ['', [Validators.required]]
        })
      })
  }



  ngOnInit() {
    this.title.setTitle('Forgot Password');

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

  submitted1 = false;
  request() {
    this.error = '';
    // this.inProgress = true;
    this.submitted1 = true;
    if (this.step1Form.valid)
      this.step = 2;
    // this.client.post('api/v1/forgotpassword/request', {
    //   username: username.value
    // })
    //   .then((data: any) => {
    //     username.value = '';

    //     this.inProgress = false;
    //     this.step = 2;
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
  }

  setCode(code: string) {
    this.step = 3;
    this.code = code;
  }

  validatePassword(password) {
    if (/@/.test(password.value)) {
      this.error = '@ is not allowed';
    } else {
      this.error = null;
    }
  }

  reset(password) {
    if (!this.error) {
      this.client.post('api/v1/forgotpassword/reset', {
        password: password.value,
        code: this.code,
        username: this.username
      })
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
    }
  }


  submitted2 = false;
  showForm3() {
    this.submitted2 = true;
    this.step = 3;
  }



}
