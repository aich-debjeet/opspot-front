import { Injectable } from '@angular/core';
import { Client } from '../../../services/api';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private client: Client) { }

  //send email link after entering the email id
  sendEmaillink(data) {
    return this.client.post('api/v1/forgotpassword/request', data)
  }

  // send otp after 
  sendOtp(data) {
    return this.client.post('api/v1/forgotpassword/request', data)
  }

  //validate otp 
  validateOtp(data) {
    return this.client.post('api/v1/forgotpassword/confirm', data)
  }

  //resend otp for the mobile
  resendOtp(data) {
   return this.client.post('api/v1/forgotpassword/request', data)
  }

  //resent email link
  resentEmaillink(data) {
    this.client.post('api/v1/forgotpassword/request', data)
  }
}
