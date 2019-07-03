import { Injectable } from '@angular/core';
import { Client } from '../../../services/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private client:Client) { }

  // to get the otp number
  async getOtp(numbr){
    let response;
    return await this.client.post('api/v3/verification/mobile/verify', {
      number: numbr,
    })
  }

  register(form){
    return this.client.post('api/v1/register', form)
  }

  validateUsername(username){
    return this.client.get('api/v1/register/validate/' + username)
  }

  verifyMobile(data){
    return this.client.post('api/v3/verification/mobile/confirm', data)
  }
}
