import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OPSPedia {

  // base: string = 'http://lookup.dbpedia.org/api/search/';
  base: string = 'https://zapdos.opsplt.com/_query/api/v1/textdata/';

  constructor(public http: HttpClient) { }

  /**
   * Return a GET request
   */
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
