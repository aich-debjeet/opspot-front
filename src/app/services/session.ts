/**
 * Sesions
 */
import { EventEmitter } from '@angular/core';

export class Session {

  loggedinEmitter: EventEmitter<any> = new EventEmitter();
  userEmitter: EventEmitter<any> = new EventEmitter();

  static _() {
    return new Session();
  }

	/**
	 * Return if loggedin, with an optional listener
	 */
  isLoggedIn(observe: any = null) {
  // if(localStorage.getItem('loggedIn')){
  //   window.Opspot.LoggedIn=true;
  //   window.Opspot.user=JSON.parse(localStorage.getItem('user'))
  //   return true;
  // }
    if (observe) {
      this.loggedinEmitter.subscribe({
        next: (is) => {
          if (is)
            observe(true);
          else
            observe(false);
        }
      });
    }

    if (window.Opspot.LoggedIn)
      return true;

    return false;
  }

  isAdmin() {
    if (!this.isLoggedIn)
      return false;
    if (window.Opspot.Admin)
      return true;

    return false;
  }

	/**
	 * Get the loggedin user
	 */
  getLoggedInUser(observe: any = null) {

    if (observe) {
      this.userEmitter.subscribe({
        next: (user) => {
          observe(user);
        }
      });
    }

    if (window.Opspot.user)
      return window.Opspot.user;

    return false;
  }

	/**
	 * Emit login event
	 */
  login(user: any = null) {
    //clear stale local storage
    const mobileSecret = localStorage.getItem('phone-verification-secret');
    window.localStorage.clear();
    localStorage.setItem('phone-verification-secret', mobileSecret);
    this.userEmitter.next(user);
    window.Opspot.user = user;
    // localStorage.setItem('user',JSON.stringify(user) );
    // localStorage.setItem('loggedIn','yes')

    if (user.admin === true)
      window.Opspot.Admin = true;
    window.Opspot.LoggedIn = true;
    this.loggedinEmitter.next(true);
  }

	/**
	 * Emit logout event
	 */
  logout() {
    this.userEmitter.next(null);
    delete window.Opspot.user;
    window.Opspot.LoggedIn = false;
    window.Opspot.Admin = false;
    const mobileSecret = localStorage.getItem('phone-verification-secret');
    window.localStorage.clear();
    localStorage.setItem('phone-verification-secret', mobileSecret);
    this.loggedinEmitter.next(false);
  }
}
