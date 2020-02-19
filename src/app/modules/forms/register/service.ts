import { Injectable } from '@angular/core';
import { Client } from '../../../services/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private client: Client) { }

  // to get the otp number
  async getOtp(data) {
    return await this.client.post('api/v3/verification/mobile/verify', data)
  }

  register(form) {
    return this.client.post('api/v1/register', form)
  }

  validateUsername(username) {
    return this.client.get('api/v1/register/validate/' + username)
  }

  verifyMobile(data) {
    return this.client.post('api/v3/verification/mobile/confirm', data)
  }

  // resend otp for the mobile
  resendOtp(data) {
    return this.client.post('api/v1/forgotpassword/request', data)
  }
}
