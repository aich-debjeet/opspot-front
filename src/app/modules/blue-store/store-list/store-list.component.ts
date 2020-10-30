import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../services/api/client';
import { BlueStoreFormComponent } from '../../forms/blue-store-form/blue-store-form.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';



@Component({
  selector: 'app-store-list',
  host: {
    '(keyup)': 'keyup($event)'
  },
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  userGuid = window.Opspot.user.guid;
  category: string;
  market: string;
  cards: Object[] = [];
  offset: string = '';
  limit = 10;
  q: string = '';
  copiedRef = [];

  @Output() off: EventEmitter<any> = new EventEmitter();
  @Output() mreData: EventEmitter<any> = new EventEmitter();
  @Output() inProg: EventEmitter<any> = new EventEmitter();
  constructor(private route: ActivatedRoute,
    public overlayModal: OverlayModalService,
    private client: Client) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      this.category = params['category_name'];
      this.market = params['type'];
      this.mreData.emit(true);


      if (params['offset']) {
        this.offset = params['offset'];
      } else {
        this.cards = [];
        this.copiedRef = [];
        this.offset = '';
      }

      if (params['type'] == 'My Sales Board') {
        this.loadSales();
      } else {
        this.load()
      }

    })
  }

  load() {
    this.inProg.emit(true);
    this.client.get('api/v3/marketplace/category', { category_name: this.category, limit: this.limit, offset: this.offset }).then(response => {
      if (!response['activity'].length) {
        this.inProg.emit(false);
        this.mreData.emit(false);
        return;
      }
      if (response['activity'].length) {
        this.cards.push(...response['activity']);
        this.copiedRef = this.cards;
        this.inProg.emit(false);
      }
      if (response['load-next']) {
        this.off.emit(response['load-next'])
      } else {
        this.off.emit('')
      }
    })
      .catch((e) => {
        this.inProg.emit(false);
      });

  }

  loadSales() {
    this.inProg.emit(true);
    this.client.get(`api/v3/marketplace/single/${this.userGuid}`, { limit: this.limit, offset: this.offset }).then(response => {
      if (!response['activity']) {
        this.inProg.emit(false);
        this.mreData.emit(false);
        return;
      }
      if (response['activity']) {
        this.cards.push(...response['activity'])
        this.copiedRef = this.cards;
        this.inProg.emit(false);
      }
      if (response['load-next'].length) {
        this.off.emit(response['load-next'])
      } else {
        this.off.emit('')
      }
    })
      .catch((e) => {
        this.inProg.emit(false);
      });
  }

  openEditBluestore(entity) {
    this.overlayModal.create(BlueStoreFormComponent, entity, {
      class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
      // listen to the update callback
      onUpdate: (payload: any) => {
        if (payload)
          this.overlayModal.dismiss();
      }
    }).present();
  }

  keyup(e) {
    if (e.keyCode === 13) {
      if (!this.cards || !this.q) {
        return this.cards = this.copiedRef;
      }
      if (this.cards.find((item: any) => item.title.toString().toLowerCase() === this.q.toLowerCase())) {
        this.cards = this.cards.filter((item: any) => item.title.toString().toLowerCase().indexOf((this.q).toLowerCase()) !== -1)
      }
    }
  }

}
