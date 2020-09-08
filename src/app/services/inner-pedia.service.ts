import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
export class InnerPediaService {
  base: string = 'https://www.onepagespotlight.com/api/v3/'
  static _(http: HttpClient) {
    return new InnerPediaService(http);
  }
  constructor(private http: HttpClient) { }

  get(endpoint: string, data: Object = {}, options: Object = {}) {
    endpoint += '?' + this.buildParams(data);
    return new Promise((resolve, reject) => {
      this.http.get(this.base + endpoint)
        .subscribe(
          res => {
            return resolve(res);
          },
          err => {
            return reject(err);
          });
    });
  }

  private buildParams(object: Object) {
    return Object.keys(object).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
    }).join('&');
  }
}
