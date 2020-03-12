import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styleUrls: ['./user-privacy.component.scss']
})
export class UserPrivacyComponent implements OnInit {

  privacys = [];
  private _inPrivacy: string;

  constructor() {
    this.privacys = ['Everyone', 'Follower', 'Following', 'Onlyme'];
  }

  model = { privacy: 'Following' };
  ngOnInit() {
  }

  @Input('toggleClass') toggleClass: boolean;
  @Output('privacyChange') privacyChange: EventEmitter<any> = new EventEmitter();

  @Input() set inPrivacy(value: string) {
    this._inPrivacy = value;
    if (this._inPrivacy) {
      this.model.privacy = this._inPrivacy;
    }
  }

  changePrivacy() {
    this.privacyChange.emit(this.model.privacy);
  }
}
