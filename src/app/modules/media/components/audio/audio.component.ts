import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Client } from '../../../../services/api';
import { ScrollService } from '../../../../services/ux/scroll';
import { WebtorrentService } from '../../../webtorrent/webtorrent.service';

@Component({
  selector: 'm-audio',
  templateUrl: 'audio.component.html',
})
export class OpspotAudioComponent {

  @Output('finished') finished: EventEmitter<any> = new EventEmitter();

  src: any;
  @Input('src') set _src(src) {
    this.src = src;
  }

}
