import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api';

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
  constructor(
    fb: FormBuilder,
    public session: Session,
    public client: Client,
  ) {
    this.form = fb.group({
      currentPassword:[''],
      newPassword: ['', [Validators.required, this.checkPassword]],
      confirmpassword: ['', Validators.required]
    },
    {validator: this.MustMatch('newPassword','confirmpassword')})
   }

  ngOnInit() {
    // this.client.get('api/v1/settings/' + this.guid)
    //   .then((response: any) => {
    //     console.log('LOAD', response.channel);
    //     this.openSessions = response.channel.open_sessions || 1;
    //   });
  }
  changePassword(){
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
}
