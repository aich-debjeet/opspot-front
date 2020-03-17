import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';

import { Session } from '../../../services/session';
import { Client } from '../../../services/api';
import { ThirdPartyNetworksService } from '../../../services/third-party-networks';

@Component({
  moduleId: module.id,
  selector: 'm-settings--general',
  templateUrl: 'general.component.html',
  styleUrls: ['general.component.scss']
})

export class SettingsGeneralComponent {

  opspot: Opspot;
  settings: string;

  error: string = '';
  changed: boolean = false;
  saved: boolean = false;
  inProgress: boolean = false;

  guid: string = '';
  name: string;
  userName: string;
  email: string;
  phone: string;
  mature: boolean = false;
  portfolio: boolean;
  enabled_mails: boolean = true;

  password: string='';
  password1: string;
  password2: string;

  languages: Array<{code, name}> = [];
  language: string = 'en';

  categories: { id, label, selected }[];
  selectedCategories: string[] = [];

  paramsSubscription: Subscription;
  openSessions: number = 1;

  reasonDelete: boolean = false;
  deactivateOptions: boolean = false;
  deleteAccountOption = [];
  openText: boolean = false;

  constructor(
    public session: Session,
    public element: ElementRef,
    public client: Client,
    public route: ActivatedRoute,
    public router: Router,
    public thirdpartynetworks: ThirdPartyNetworksService,
    private toastr: ToastrService
  ) {
    this.opspot = window.Opspot;
    this.getCategories();
  }

  ngOnInit() {
    this.deleteAccountOption = [{name: 'duplicate', description: `I have a duplicate account` , value: 'duplicate', checked: false},
                                    {name: 'followers', description: `I'm getting too many followers` , value: 'followers', checked: false},
                                    {name: 'unwanted', description: `I'm receiving unwanted contact` , value: 'unwanted', checked: false},
                                    {name: 'privacy', description: 'Receive an e-mail when other people follow you.' , value: 'privacy', checked: false},
                                    {name: 'others', description: `others` , value: 'others', checked: false},
          ]
    this.languages = [];
    for (let code in this.opspot.languages) {
      if (this.opspot.languages.hasOwnProperty(code)) {
        this.languages.push({
          code,
          name: this.opspot.languages[code],
        });
      }
    }

    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['guid'] && params['guid'] === this.session.getLoggedInUser().guid) {
        this.load(true);
      } else {
        this.load(false);
      }

      if (params['card'] && params['card'] !== '') {
        const el = this.element.nativeElement.querySelector('.m-settings--' + params['card']);
        if (el) {
          window.scrollTo(0, el.offsetTop - 64); // 64 comes from the topbar's height
        }
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  load(remote: boolean = false) {
    if (!remote) {
      const user = this.session.getLoggedInUser();
      this.name = user.name;
      this.userName = user.username;
      this.email = user.email;
      this.phone = user.phone;
    }

    this.client.get('api/v1/settings/' + this.guid)
      .then((response: any) => {
        this.portfolio = !!+response['channel']['portfolio_visiblity'];
        // this.email = response.channel.email;
        this.mature = !!parseInt(response.channel.mature, 10);
        this.enabled_mails = !parseInt(response.channel.disabled_emails, 10);
        this.language = response.channel.language || 'en';
        this.selectedCategories = response.channel.categories || [];
        this.openSessions = response.channel.open_sessions || 1;

        this.thirdpartynetworks.overrideStatus(response.thirdpartynetworks);

        if (window.Opspot.user) {
          window.Opspot.user.mature = this.mature;
        }
        if (this.selectedCategories.length > 0) {
          this.selectedCategories.forEach((item, index, array) => {
            const i: number = this.categories.findIndex(i => i.id === item);
            if (i !== -1)
              this.categories[i].selected = true;
          });
        }
      });
  }

  canSubmit() {
    return this.changed;
    // if (!this.changed)
    //   return false;

    // if (this.password && !this.password1 || this.password && !this.password2)
    //   return false;

    // if (this.password1 && !this.password) {
    //   this.error = 'You must enter your current password';
    //   return false;
    // }

    // if (this.password1 !== this.password2) {
    //   this.error = 'Your new passwords do not match';
    //   return false;
    // }

    // this.error = '';

    // return true;
  }

  change() {
    this.changed = true;
    this.saved = false;
  }

  save() {
    if (!this.canSubmit())
      return;

    this.inProgress = true;
    this.client.post('api/v1/settings/' + this.guid,
      {
        email: this.email,
        mature: this.mature ? 1 : 0,
        disabled_emails: this.enabled_mails ? 0 : 1,
        language: this.language,
        categories: this.selectedCategories,
        portfolio: this.portfolio ? 1 : 0
      })
      .then((response: any) => {
        this.toastr.success('You have successfully updated your preferences.', '', {
          timeOut: 3000
        });
        this.changed = false;
        this.saved = true;
        this.error = '';

        if (window.Opspot.user) {
          window.Opspot.user.mature = this.mature ? 1 : 0;

          if (window.Opspot.user.name !== this.name) {
            window.Opspot.user.name = this.name;
          }

        }

        if (this.language !== window.Opspot['language']) {
          window.location.reload(true);
        }

        this.inProgress = false;
      }).catch(e=> {
        this.inProgress = false;
        this.changed = false;
        this.error = e.message;
      })
  }

  // Third Party Networks

  connectFb() {
    this.thirdpartynetworks.connect('facebook')
      .then(() => {
        this.load();
      });
  }

  connectTw() {
    this.thirdpartynetworks.connect('twitter')
      .then(() => {
        this.load();
      });
  }

  removeFbLogin() {
    this.thirdpartynetworks.removeFbLogin();
  }

  removeFb() {
    this.thirdpartynetworks.disconnect('facebook');
  }

  removeTw() {
    this.thirdpartynetworks.disconnect('twitter');
  }

  getCategories() {
    this.categories = [];

    for (let category in window.Opspot.categories) {
      this.categories.push({
        id: category,
        label: window.Opspot.categories[category],
        selected: false
      });
    }

    this.categories.sort((a, b) => a.label > b.label ? 1 : -1);
  }

  onCategoryClick(category) {
    category.selected = !category.selected;

    if (category.selected) {
      this.selectedCategories.push(category.id);
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(category.id), 1);
    }

    this.changed = true;
    this.saved = false;
  }

  closeAllSessions() {
    this.router.navigate(['/logout/all']);
  }

  delete(password: string){
    if(password.length <= 0){
      return;
    }
    this.client.post('api/v2/settings/delete', { password })
      .then((response: any) => {
        this.toastr.success('You have successfully deleted your account.', '', {
          timeOut: 3000
        });
        this.router.navigate(['/logout']);
      })
      .catch((e: any) => {
        alert('Sorry, we could not delete your account');
      });
  }
  deactivate(){
    this.client.delete('api/v1/channel')
      .then((response: any) => {
        this.toastr.success('You have successfully deactivated your account.', '', {
          timeOut: 3000
        });
        this.router.navigate(['/logout']);
      })
      .catch((e: any) => {
        alert('Sorry, we could not disable your account');
      });
  }
  setOption(option: string){
    if(option == 'delete'){
      if(!this.reasonDelete) {
        this.reasonDelete = true;
        this.deactivateOptions = false;
      } else {
        this.reasonDelete = false;
      }
    }
    else if(option == 'deactivate'){
      if(!this.deactivateOptions) {
        this.deactivateOptions = true;
        this.reasonDelete = false;
      } else {
        this.deactivateOptions = false;
      }
    }
  }
  updateCheckedOptions(option, event){
    console.log(option,event)
    if(option.value == 'others'){
      if(option.checked == true)
      this.openText = true;
      else this.openText = false;
    }
  }
}
