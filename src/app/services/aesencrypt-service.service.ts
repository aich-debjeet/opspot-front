import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptServiceService {

  constructor() { }

  encrypt(value: string): string {
    let data = CryptoJS.AES.encrypt(JSON.stringify(btoa(value.trim())), 'Secret Passphrase').toString();
    return this.split(data);
  }
  swap(value1: string, value2: string): string {
    let third = value2 + value1;
    return third;
  }

  split(value: string): string {
    let n: number = value.length;
    let first: string = value.substring(0, n/2);
    let last: string = value.substring(22, n);
    return this.swap(first, last);
  }
}
