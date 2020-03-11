import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptServiceService {

  constructor() { }

  encrypt(value : string) : string {
    return CryptoJS.AES.encrypt(JSON.stringify(btoa(value)), 'Secret Passphrase').toString()
  }
}
