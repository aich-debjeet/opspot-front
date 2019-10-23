import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styleUrls: ['./user-privacy.component.scss']
})
export class UserPrivacyComponent implements OnInit {

  privacys = [];
  constructor() {
    this.privacys = ['Everyone', 'Followers', 'Following', 'OnlyMe'];
  }

  model = { privacy: 'Everyone' };
  ngOnInit() {
    if (this.inPrivacy) {
      this.model.privacy = this.inPrivacy;
    }
    //  console.log(this.toggleClass)
  }

  @Input('inPrivacy') inPrivacy;
  @Input('toggleClass') toggleClass: boolean;
  @Output('privacyChange') privacyChange: EventEmitter<any> = new EventEmitter();

  changePrivacy() {
    this.privacyChange.emit(this.model.privacy);
  }
}
