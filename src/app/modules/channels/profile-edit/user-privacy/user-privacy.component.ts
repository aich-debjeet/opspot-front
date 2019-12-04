import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styleUrls: ['./user-privacy.component.scss']
})
export class UserPrivacyComponent implements OnInit {

  privacys = [];
  constructor() {
    this.privacys = ['Visible to Everyone', 'Visible to people who follow you', 'Visible to people you follow', 'OnlyMe'];
  }

  model = { privacy: 'Visible to Everyone' };
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
