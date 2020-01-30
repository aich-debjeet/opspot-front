import { HttpClient, HttpHeaders } from "@angular/common/http";

/**
 * API Class
 */
export class DBPedia {

  base: string = 'http://lookup.dbpedia.org/api/search/PrefixSearch';

  static _(http: HttpClient) {
    return new DBPedia(http);
  }

  constructor(public http: HttpClient) {
  }

  /**
   * Return a GET request
   */
  get(endpoint: string, data: Object = {}, options: Object = {}) {
    endpoint += '?' + this.buildParams(data);
    return new Promise((resolve, reject) => {
      this.http.get(
        this.base + endpoint,
        this.buildOptions(options)
      )
        .subscribe(
          res => {
            return resolve(res);
          },
          err => {
            if (err.data && !err.data()) {
              return reject(err || new Error('GET error'));
            }
            if (err.status === 401 && err.error.loggedin === false) {
              window.location.href = '/login';
              return reject(err);
            }
            return reject(err);
          });
    });
  }

  /**
   * Return a GET request
   */
  getRaw(endpoint: string, data: Object = {}, options: Object = {}) {
    endpoint += '?' + this.buildParams(data);
    return new Promise((resolve, reject) => {
      this.http.get(
        this.base + endpoint,
        this.buildOptions(options)
      )
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

  /**
   * Build the options
   */
  private buildOptions(options: Object) {

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
    });

    return Object.assign(options, {
      headers: headers,
      cache: true
    });
  }

}
