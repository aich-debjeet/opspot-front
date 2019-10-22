import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TopbarHashtagsService } from "../../../hashtags/service/topbar.service";

type Hashtag = {
  value: string, selected: boolean
};

@Component({
  selector: 'm-onboarding--topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})

export class TopicsOnboardingComponent implements OnInit {
  static items = ['suggested_hashtags'];
  static canSkip: boolean = true;
  @Input() pendingItems: Array<string>;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  input: string = '';
  addingHashtag: boolean = false;
  hashtags: Array<Hashtag> = [];
  error: string;
  inProgress: boolean;

  constructor(
      private service: TopbarHashtagsService,
  ) {
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.inProgress = true;

    try {
      this.hashtags = await this.service.load(50);
    } catch (e) {
      console.error(e);
    }

    this.inProgress = false;
  }

  async toggleSelection(hashtag) {
    try {
      await this.service.toggleSelection(hashtag, this);
    } catch (e) {
      this.error = (e && e.message) || 'Sorry, something went wrong';
      hashtag.selected = !hashtag.selected;
    }
  }


  async addNew() {
    this.addingHashtag = true;
    let hashtag: Hashtag = {
      value: this.service.cleanupHashtag(this.input.toLowerCase()),
      selected: false,
    };
    this.hashtags.push(hashtag);
    await this.toggleSelection(hashtag);
    this.input = ''; // clear input
    this.addingHashtag = false;
  }


  keyUp(e) {
    switch (e.keyCode) {
      case 32: //space
      case 9: //tab
      case 13: //enter
      case 188: //comma
        this.addNew();
        break;
    }
  }

  close() {
    this.onClose.emit();
  }

}
