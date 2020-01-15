import { Component,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { SignupModalService } from '../modals/signup/service';
import { OpspotTitle } from '../../services/ux/title';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { LoginReferrerService } from '../../services/login-referrer.service';
import { OnboardingService } from '../onboarding/onboarding.service';

@Component({
  selector: 'm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  twofactorToken: string = '';
  hideLogin: boolean = false;
  inProgress: boolean = false;
  referrer: string;
  opspot = window.Opspot;
  private redirectTo: string;

  flags = {
    canPlayInlineVideos: true
  };

  paramsSubscription: Subscription;

  constructor(
    public client: Client,
    public router: Router,
    public route: ActivatedRoute,
    public title: OpspotTitle,
    private modal: SignupModalService,
    private loginReferrer: LoginReferrerService,
    public session: Session,
    private onboarding: OnboardingService
  ) {}
  loginView = false;

  log(e) {
    this.loginView = !this.loginView;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.screen.width < 600) {
  //     this.loginView = false;
  //   } else this.loginView = true;
  // }

  ngOnInit() {
    if (this.session.isLoggedIn()) {
      this.loginReferrer.register('/newsfeed');
      // this.loginReferrer.navigate();
    }
    if (window.screen.width > 800) {
      this.loginView = true;
    }

    this.title.setTitle('Login');
    this.redirectTo = localStorage.getItem('redirect');

    this.paramsSubscription = this.route.queryParams.subscribe(params => {
      if (params['referrer']) {
        console.log(params['referrer']);
        this.referrer = params['referrer'];
      }
    });

    if (/iP(hone|od)/.test(window.navigator.userAgent)) {
      this.flags.canPlayInlineVideos = false;
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  loggedin() {
    if (this.referrer) this.router.navigateByUrl(this.referrer);
    else if (this.redirectTo) this.router.navigate([this.redirectTo]);
    else this.loginReferrer.navigate();
  }

  registered() {
    if (this.redirectTo)
      this.router.navigate([this.redirectTo]);
    else {
      this.modal.setDisplay('categories').open();
      this.loginReferrer.navigate({
        defaultUrl: '/' + this.session.getLoggedInUser().username
      });
    }
  }
}
