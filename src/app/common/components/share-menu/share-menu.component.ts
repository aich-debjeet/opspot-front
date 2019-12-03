import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';

type Option =
  'facebook'
  | 'twitter'
  | 'whatsapp'
  | 'repost';

@Component({
  moduleId: module.id,
  selector: 'm-share-menu',
  templateUrl: 'share-menu.component.html',
  styleUrls: ['share-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShareMenuComponent {
  @Input() entity: any;
  @Input() options: Array<Option>;
  @Input() large: boolean
  @Output() optionSelected: EventEmitter<Option> = new EventEmitter<Option>();
  @Output() entityGuid: EventEmitter<Option> = new EventEmitter<Option>();

  opened: boolean = false;
  shareToggle: boolean = false;
  categories: Array<any> = [];
  url = '';
  encodedUrl = '';
  opspot = window.Opspot;


  // @Input('url') set data(url) {
  //   this.rawUrl = url;
  //   this.encodedRawUrl = encodeURI(this.rawUrl);
  // }


  constructor(
    public session: Session,
    private client: Client,
    private cd: ChangeDetectorRef
  ) {
  }

  shareMenuHandler() {
    this.opened = !this.opened;
  }

  selectOption(option: Option) {
    this.optionSelected.emit(option);
    this.entityGuid.emit(this.entity.guid)
    this.opened = false;

    this.detectChanges();
  }

  onModalClose() {
    // this.featureToggle = false;
  }

  detectChanges() {
    this.cd.markForCheck();
  }

  //  set _url(value: string) {
  //    console.log("url1: ", value);

  //   this.url = value;
  //   this.encodedUrl = encodeURI(this.url);
  // }

  openTwitter() {
    // alert(this.entity.url)
    const url =
      'https://twitter.com/intent/tweet?tw_p=tweetbutton&url=' +
      encodeURI(this.entity.url);
    window.open(url, '_blank', 'width=620, height=220, left=80, top=80');
  }

  openFacebook() {
    // alert(this.entity.url)
    this.openWindow(
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURI(this.entity.url) +
      '&display=popup&ref=plugin&src=share_button'
    );
  }

  openWhatsapp() {
    this.openWindow(
      'https://api.whatsapp.com/send?text=' + encodeURI(this.entity.url)
    );
  }


  openWindow(url: string) {
    window.open(url, '_blank', 'width=600, height=300, left=80, top=80');
  }

}
