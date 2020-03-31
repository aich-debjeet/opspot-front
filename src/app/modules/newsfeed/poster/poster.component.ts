import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { Session } from '../../../services/session';

import { AttachmentService } from '../../../services/attachment';
// import { ThirdPartyNetworksSelector } from '../../third-party-networks/selector';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';
import { HashtagsSelectorComponent } from '../../hashtags/selector/selector.component';
import { Tag } from '../../hashtags/types/tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'opspot-newsfeed-poster',
  inputs: ['_container_guid: containerGuid', '_showSpecialHashtags:showSpecialHashtags', 'accessId', 'message', 'title'],
  outputs: ['load'],
  providers: [
    {
      provide: AttachmentService,
      useFactory: AttachmentService._,
      deps: [Session, Client, Upload]
    }
  ],
  templateUrl: 'poster.component.html'
})
export class PosterComponent {
  // @Input() showSpecialHashtags: boolean;
  display: string = '';
  startDate: string;
  content = '';
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  opspot;
  load: EventEmitter<any> = new EventEmitter();
  inProgress: boolean = false;

  canPost: boolean = true;
  validThreshold: boolean = true;
  tooManyTags: boolean = false;

  errorMessage: string = null;
  staticBoard: boolean = false;
  showTimezForm: FormGroup;
  opportunityForm: FormGroup;
  blueStoreForm: FormGroup;
  submitted = false;
  eventSubmitted: boolean = false;
  blueStoreSubmitted: boolean = false;
  cards = [];
  isNSFW: boolean = false;
  displayPaywal: boolean = false;
  defaultCoins: string = '';
  specialHashtags: boolean = false;
  menuOptions: Array<string> = ['create-showtimez', 'create-opportunity', 'create-the-bluestore', 'create-portfolio', 'create-my-journey'];
  // menuOptions: Array<string> = ['create-showtimez', 'create-opportunity'];
  @ViewChild('hashtagsSelector') hashtagsSelector: HashtagsSelectorComponent;

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    private formBuilder: FormBuilder
  ) {
    this.opspot = window.Opspot;
    this.cards = [];
  }
  ngOnInit() { }

  set _showSpecialHashtags(value: boolean) {
    this.specialHashtags = value;
    if (this.specialHashtags) {
      this.menuOptions = this.menuOptions.slice(0,3);
    }
  }


  set _container_guid(guid: any) {
    this.attachment.setContainer(guid);
  }

  set accessId(access_id: any) {
    this.attachment.setAccessId(access_id);
  }

  set message(value: any) {
    if (value) {
      value = decodeURIComponent(value.replace(/\+/g, '%20'));
      this.meta.message = value;
      this.showTagsError();
      this.getPostPreview({ value: value }); //a little ugly here!
    }
  }

  onMessageChange($event) {
    this.errorMessage = '';
    this.meta.message = $event;

    const regex = /(^|\s||)#(\w+)/gim;
    this.tags = [];
    let match;

    while ((match = regex.exec(this.meta.message)) !== null) {
      this.tags.push(match[2]);
    }
  }

  onTagsChange(tags: string[]) {
    if (this.hashtagsSelector.tags.length > 5) {
      this.errorMessage = 'You can only select up to 5 hashtags';
      this.tooManyTags = true;
    } else {
      this.tooManyTags = false;
      if (this.errorMessage === 'You can only select up to 5 hashtags') {
        this.errorMessage = '';
      }
    }
  }

  showTagsError() {
    if (this.tags.length > 5) {
      this.errorMessage = 'You can only select up to 5 hashtags';
      this.tooManyTags = true;
    } else {
      this.tooManyTags = false;
    }
  }

  onTagsAdded(tags: Tag[]) {
    for (let tag of tags) {
      this.meta.message += ` #${tag.value}`;
    }
  }

  onTagsRemoved(tags: Tag[]) {
    for (let tag of tags) {
      this.meta.message = this.meta.message.replace('#' + tag.value, tag.value);
    }
  }

  /**
   * Post to the newsfeed
   */
  post() {
    // console.log('clicked');
    if (!this.meta.message && !this.attachment.has()) {
      return;
    }
    if (this.defaultCoins.length > 0) {
      this.meta.wire_threshold = {
        min: this.defaultCoins,
        type: 'tokens'
      };
    }
    // if (this.hashtagsSelector.tags.length > 5) {
    //   this.showTagsError();
    //   return;
    // }

    this.errorMessage = '';

    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.tags = this.tags;
    data.mature = this.isNSFW;
    // console.log(data);
    // console.log(this.meta);
    // console.log(this.attachment.exportMeta());

    this.inProgress = true;
    this.client
      .post('api/v1/newsfeed', data)
      .then((data: any) => {
        data.activity.boostToggle = true;
        // console.log(data);
        this.load.next(data.activity);
        this.attachment.reset();
        this.meta = { wire_threshold: null };
        this.inProgress = false;
        this.cards = [];
      })
      .catch(e => {
        this.inProgress = false;
        alert(e.message);
      });
  }

  uploadAttachment(file: HTMLInputElement, event) {
    // console.log(file, event, this.attachment);
    if (file.value) {
      // this prevents IE from executing this code twice
      this.canPost = false;
      this.inProgress = true;
      this.errorMessage = null;

      this.attachment
        .upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          // console.log(guid);
          // console.log(obj);
          // console.log(this.cards);
          this.cards.push(obj);
          this.inProgress = false;
          this.canPost = true;
          file.value = null;
        })
        .catch(e => {
          // console.log(e);
          if (e && e.message) {
            this.errorMessage = e.message;
          }
          this.inProgress = false;
          this.canPost = true;
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  removeRichEmbed() {
    this.attachment.reset();
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    if (this.inProgress) {
      this.attachment.abort();
      this.canPost = true;
      this.inProgress = false;
      this.errorMessage = '';
      return;
    }

    // if we're not uploading a file right now
    this.attachment.setPendingDelete(false);
    this.canPost = false;
    this.inProgress = true;

    this.errorMessage = '';

    this.attachment.remove(imageId, file)
      .then(guid => {
        this.inProgress = false;
        this.canPost = true;
        file.value = '';
        this.cards = _remove(this.cards, function (n) {
          return n.guid !== guid;
        });
      })
      .catch(e => {
        // console.error(e);
        this.inProgress = false;
        this.canPost = true;
      });
  }

  getPostPreview(message) {
    if (!message.value) {
      return;
    }

    this.attachment.preview(message.value);
  }

  async findTrendingHashtags(searchText: string) {
    const response: any = await this.client.get('api/v2/search/suggest/tags', {
      q: searchText
    });
    return response.tags
      .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
      .slice(0, 5);
  }

  getChoiceLabel(text: string) {
    return `#${text}`;
  }
  createForms(type: string) {
    this.staticBoard = true;
    this.cards = [];
    this.renderForms(type);
  }
  renderForms(type: string) {
    // console.log(type);
    this.display = type;
    this.attachment.reset();
    // this.buildForm(type);
  }

  close() {
    // console.log('close');
    this.display = '';
    this.staticBoard = false;
  }
  changeToDefault() {
    this.display = 'default';
    this.attachment.reset();
  }
  displayPaywall() {
    if (this.displayPaywal) this.displayPaywal = false;
    else this.displayPaywal = true;
  }

  emitEvent(data) {
    // console.log(data);
    this.load.next(data.activity);
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'create-showtimez':
        this.createForms('#Showtimez');
        break;
      case 'create-opportunity':
        this.createForms('#Opportunity');
        break;
      case 'create-the-bluestore':
        this.createForms('#TheBlueStore');
        break;
      case 'create-portfolio':
        this.createForms('#Portfolio');
        break;
      case 'create-my-journey':
        this.createForms('#MyJourney');
        break;
    }
  }
}