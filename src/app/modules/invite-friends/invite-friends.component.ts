import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Session } from '../../services/session';
import { OpspotTitle } from '../../services/ux/title';
import { Client } from '../../services/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit, OnDestroy {

  opspot = window.Opspot;

  referrerParam = '';
  registerUrl = '';
  encodedRegisterUrl = '';
  registerMessage = '';
  encodedRegisterMessage = '';

  registerUrlTimeout;
  referrerParamTimeout;
  registerUrlRecentlyCopied: boolean = false;
  referrerParamRecentlyCopied: boolean = false;
  registerUrlFocused: boolean = false;
  referrerParamFocused: boolean = false;
  emails: any[];
  inProgress = false;
  @Input()maxItems;


  constructor(
    public session: Session,
    public title: OpspotTitle,
    public client: Client,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.title.setTitle('Invite Friends');
    // Create custom referral links for current user
    this.referrerParam = '?referrer=' + this.session.getLoggedInUser().username;
    this.registerUrl = this.opspot.site_url + 'register' + this.referrerParam;
    this.encodedRegisterUrl =
      encodeURI(this.opspot.site_url) +
      encodeURIComponent('register' + this.referrerParam);
    this.encodedRegisterMessage = 'Join%20me%20on%20OPS';
  }

  //Only show Messenger/Whatsapp share buttons if mobile or tablet
  // isMobileOrTablet() {
  //   return isMobileOrTablet();
  // }

 // Only show SMS share button if mobile
  // isMobile() {
  //   return isMobile();
  // }

  openWindow(url: string) {
    window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
  }

  openTwitter() {
    const url =
      'https://twitter.com/intent/tweet?tw_p=tweetbutton&text=' +
      this.encodedRegisterMessage +
      '&url=' +
      this.encodedRegisterUrl;
    window.open(url, '_blank', 'width=620, height=220, left=80, top=80');
  }

  openFacebook() {
    this.openWindow(
      'https://www.facebook.com/sharer/sharer.php?u=' +
        this.encodedRegisterUrl +
        '&display=popup&ref=plugin&src=share_button'
    );
  }

  openEmail() {
    this.openWindow(
      'mailto:?subject=Join%20me%20on%20OPS&body=Join me on OPS%0D%0A' +
        this.encodedRegisterUrl
    );
  }

  sendInvite() {
    if (!this.emails) {
      this.toastr.error('Please enter your friends email ids');
      return;
    }
    const emails = this.emails.map(el => el.value);
    this.inProgress = true;
    this.client.post('api/v3/invitations', emails)
      .then((response: any) => {
        this.inProgress = false;
        if (response.status === 'success') {
          this.toastr.success('Invitations sent');
          this.emails = [];
        } else {
          this.toastr.error('Something went wrong');
        }
      });
  }

  // openMessenger() {
  //   const encodedFacebookAppId = encodeURIComponent('184865748231073');
  //   this.openWindow(
  //     'fb-messenger://share?link=' +
  //       this.encodedRegisterUrl +
  //       '&app_id=' +
  //       encodedFacebookAppId
  //   );
  // }

  // openWhatsapp() {
  //   this.openWindow(
  //     'https://api.whatsapp.com/send?text=' +
  //       this.encodedRegisterMessage +
  //       this.encodedRegisterUrl
  //   );
  // }

  // openSMS() {
  //   this.openWindow(
  //     'sms:?&body=Join me on OPS' + this.encodedRegisterUrl
  //   );
  // }

  // Receives the inputElement whose text you want to copy and linkType ('registerUrl' || 'referrerParam')
  copyToClipboard(inputElement, linkType) {
    inputElement.select();
    document.execCommand('copy');

    // Temporarily change button text from 'copy' to 'copied'
    if (linkType === 'registerUrl') {
      clearTimeout(this.registerUrlTimeout);
      this.registerUrlRecentlyCopied = true;
      this.registerUrlTimeout = setTimeout(() => {
        this.registerUrlRecentlyCopied = false;
      }, 2000);
    } else {
      clearTimeout(this.referrerParamTimeout);
      this.referrerParamRecentlyCopied = true;
      this.referrerParamTimeout = setTimeout(() => {
        this.referrerParamRecentlyCopied = false;
      }, 2000);
    }
  }

  // Make copyable link container appear focused when you click on it
  // Receives the inputElement to be focused and linkType ('registerUrl' || 'referrerParam')
  // applyFocus(inputElement, linkType) {
  //   inputElement.focus();
  //   inputElement.select();

  //   if (linkType === 'registerUrl') {
  //     this.registerUrlFocused = true;
  //   } else {
  //     this.referrerParamFocused = true;
  //   }
  // }

  ngOnDestroy() {
    clearTimeout(this.registerUrlTimeout);
    clearTimeout(this.referrerParamTimeout);
  }


}