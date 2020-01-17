import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.component.html',
  styleUrls: ['./privacy-security.component.scss']
})
export class PrivacySecurityComponent implements OnInit {
  displayPassword:boolean = false;
  form: FormGroup;
  guid: string = '';
  openSessions: number = 1;
  incorrectPassword: boolean = false;
  constructor(
    fb: FormBuilder,
    public session: Session,
    public client: Client,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.form = fb.group({
      currentPassword:['', Validators.required],
      newPassword: ['', [Validators.required, this.checkPassword]],
      confirmpassword: ['', Validators.required]
    },
    {validator: this.MustMatch('newPassword','confirmpassword')})
   }

  ngOnInit() {
    this.client.get('api/v1/settings/' + this.guid)
      .then((response: any) => {
        console.log('LOAD', response.channel);
        this.openSessions = response.channel.open_sessions || 1;
      });
  }
  changePassword(){
    this.form.reset();

    if(this.incorrectPassword)
    this.incorrectPassword = false;

    if(this.displayPassword) this.displayPassword = false;
    else this.displayPassword = true;
  }
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
  checkPassword(control: AbstractControl) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  closeAllSessions() {
    this.toastr.success('You have successfully logged out of all devices.', '', {
      timeOut: 3000
    });
    this.router.navigate(['/logout/all']);
  }
  save() {
    if(!this.form.valid) return;
    this.client.post('api/v1/settings/' + this.guid,
      {
        password: this.form.value.currentPassword,
        new_password: this.form.value.newPassword,
      })
      .then((response: any) => {
        if(response.status === 'success'){
          this.toastr.success('You have successfully changed your password.', '', {
            timeOut: 3000
          });
          this.form.reset();
        }
      }).catch(e=> {
        if(e.status === 'error'){
          this.incorrectPassword = true;
        }
      })
  }
}
