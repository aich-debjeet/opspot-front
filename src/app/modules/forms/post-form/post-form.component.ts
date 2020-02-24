import {
  Component,
  EventEmitter,
  ViewChild,
  Input,
  Output
} from '@angular/core';
import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';
import { HashtagsSelectorComponent } from '../../hashtags/selector/selector.component';
import { Tag } from '../../hashtags/types/tag';
import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { PaywallMessageComponent } from './paywall-message.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  // styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {

  opspot = window.Opspot;

  reqBody = {
    message: '',
    tags: [],
    mature: false,
    access_id: 2,
    // published: 1,
    attachment_guid: [],
    thumbnail: '',
    title: '',
    url: '',
    wire_threshold: null,
    is_rich: 0,
    description: ''
  };

  display = '';
  startDate: string;
  content = '';
  meta: any;
  tags = [];
  inProgress = false;
  canPost = true;
  validThreshold = true;
  tooManyTags = false;
  errorMessage = null;
  staticBoard = false;
  submitted = false;
  cards = [];
  isNSFW = false;
  // displayPaywal = false;
  defaultCoins = '';
  entity: any;
  paywallMessage: string;

  @ViewChild('hashtagsSelector') hashtagsSelector: HashtagsSelectorComponent;

  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  _opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }

  @Input('object') set data(object) { }

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    // private formBuilder: FormBuilder,
    private overlayModal: OverlayModalService,
    private toastr: ToastrService
  ) {
    this.opspot = window.Opspot;
    this.cards = [];
    this.resetMeta();
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
      this.getPostPreview({ value: value }); // a little ugly here!
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
    if (this.meta.message.length <= 0 && this.attachment.has()) {
      alert('What have You Created today?');
      return;
    }
    if (this.defaultCoins.length > 0) {
      if (!/\d/.test(this.defaultCoins)) {
        alert('Invalid Wire threshold');
        return;
      }
      this.meta.wire_threshold = {
        min: this.defaultCoins,
        type: 'tokens',
        message: this.paywallMessage
      };
    }

    this.errorMessage = '';

    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.tags = this.tags;
    data.mature = this.isNSFW;

    this.inProgress = true;
    this.client
      .post('api/v1/newsfeed', data)
      .then((data: any) => {
        // data.activity.boostToggle = true; //@gayatri hava to check this
        this.load.emit(data);
        this.attachment.reset();
        this.resetMeta();
        this.inProgress = false;
        this.cards = [];
      })
      .catch(e => {
        this.inProgress = false;
        alert(e.message);
      });
  }

  uploadAttachment(file: HTMLInputElement, event) {
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
          obj['src'] = this.attachment.getPreview();
          if(obj['src'].includes("data:audio/")){
            obj['src'] = 'assets/videos/video_thumbnail.png'
          }
          if(obj['src'].includes("data:video/")){
            obj['src'] = 'assets/videos/video_thumbnail.png'
          }
          // if (obj['src'] == null) {
          //   obj['src'] = 'assets/videos/video_thumbnail.png'
          // }
          this.cards.push(obj);
          this.inProgress = false;
          this.canPost = true;
          file.value = null;
        })
        .catch(e => {
          if (e && e.message) {
            this.errorMessage = e.message;
            this.toastr.error(e.message, '', { timeOut: 3000 });
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

  removeAttachment(imageId: string, file?: HTMLInputElement) {
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
        this.cards = _remove(this.cards, function (n) {
          return n.guid != guid;
        });
      })
      .catch(e => {
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

  close() {
    this.display = '';
    this.staticBoard = false;
  }

  changeToDefault() {
    this.display = 'default';
    this.attachment.reset();
  }

  displayPaywall() {
    this.overlayModal.create(PaywallMessageComponent,
      {
        coins: this.defaultCoins,
        message: this.paywallMessage
      }, {
      class: 'm-overlay-modal--paywall-selector m-overlay-modal--small',
      onSelected: (data) => {
        this.paywallMessage = data.message;
        this.defaultCoins = data.coins;
        this.overlayModal.dismiss();
      },
    }).present();
  }

  // emitEvent(data){
  //   console.log(data)
  //   this.load.next(data.activity);
  // }

  resetMeta() {
    this.meta = { message: '', wire_threshold: null };
  }
}
