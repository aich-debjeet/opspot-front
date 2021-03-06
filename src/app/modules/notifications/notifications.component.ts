import { Component, Input, ElementRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { OpspotTitle } from '../../services/ux/title';
import { Client } from '../../services/api/client';
import { Session } from '../../services/session';
import { NotificationService } from './notification.service';
import { map as _map} from 'lodash';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { NotiFilterComponent } from './noti-filter/noti-filter.component';

@Component({
  moduleId: module.id,
  selector: 'opspot-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls:['notifications.component.scss']
})

export class NotificationsComponent {

  @Input() visible: boolean = true;
  @Input() params: any;
  @Input() count: number;
  @Input() loadOnDemand: boolean;
  @ViewChild('notificationGrid') notificationList: ElementRef;
  notifications: Array<Object> = [];
  entity;
  moreData: boolean = true;
  offset: string = '';
  inProgress: boolean = false;
  _filter: string = 'all';
  toggle: boolean = false;

  opspot: any = window.Opspot;
  paramsSubscription: Subscription;
  
  constructor(
    public session: Session,
    public client: Client,
    public router: Router,
    public title: OpspotTitle,
    public notificationService: NotificationService,
    public route: ActivatedRoute,
    public el: ElementRef,
    private overlayModal: OverlayModalService,
  ) { }

  ngOnInit() {
    if (!this.session.isLoggedIn()) {
      if (!this.loadOnDemand)
        this.router.navigate(['/login']);
      return;
    }

    this.paramsSubscription = this.route.params.subscribe(params => {   
      if (params['filter']) {
        this._filter = params['filter'];
        this.notifications = [];
        this.load(true);
      }
      if (params['ts']) {
        this.notifications = [];
        this.load(true);
        this.notificationService.clear();
      }
    });

    this.notificationService.clear();
    if (!this.loadOnDemand) {
      this.title.setTitle('Notifications');
      this.load(true);
    }

  }

  onVisible() {
    if (this.notifications.length === 0 ) {
      this.load(true);
    } else {
      setTimeout(() => {
        if (this.opspot.notifications_count > 0 && this.notificationList.nativeElement.scrollTop <= 100) {
          this.load(true);
        }
      }, 200);
    }
  }
  
  ngOnDestroy() {
    if (this.paramsSubscription)
      this.paramsSubscription.unsubscribe();
  }

  load(refresh: boolean = false) {
    if (this.inProgress) return false;

    if (refresh)
      this.offset = '';

    this.inProgress = true;

    this.client.get(`api/v1/notifications/${this._filter}`, { limit: 24, offset: this.offset })
      .then((data: any) => {

        if (!data.notifications) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }

        if (refresh) {
          this.notifications = data.notifications;
        } else {
          for (let entity of data.notifications)
            this.notifications.push(entity);
        }

        if (!data['load-next'])
          this.moreData = false;
        this.offset = data['load-next'];
        this.inProgress = false;
        this.opspot.notifications_count = 0;
        this.notificationService.clear();
      });
  }

  loadEntity(entity) {
    if (entity.type === 'comment') {
      this.client.get('api/v1/entities/entity/' + entity.parent_guid)
        .then((response: any) => {
          this.entity = response.entity;
        });
    } else {
      this.entity = entity;
    }
  }

  changeFilter(filter) {
    console.log('filter',filter)
    if(filter.length === 0){
      //clear all filter
      this._filter = '';
      this.notifications = [];
    } else {
      this._filter = filter;
      this.notifications = [];
      this.load(true);
    }
  }
  markAllRead(){
    let list = {
      uuids:[]
    };
    if(this.notifications.length > 0){
      list.uuids = _map(this.notifications, 'uuid');
    }
    this.client.post(`api/v1/notifications/all/read`, list)
    .then((data: any) => {
      if(data.status === 'success'){
        this.notifications = this.notifications.map((notification:any) => {
          if(notification.status === 'unread') {
            return {...notification, status: 'read'};
          }
          return {...notification};
        });

      }
    })
    .catch((e) => {
      alert(e);
    });
  }
  openFilter(){
    if(this.toggle){
      this.toggle = false;
      return
    } else {
      this.toggle = true;
      const defaultFilter = this._filter;
      this.overlayModal.create(NotiFilterComponent, defaultFilter , {
        class: 'm-overlay-modal--hashtag-selector m-overlay-modal--screen-fit',
        onUpdate: (payload: any) => {
        console.log(payload)
        this.overlayModal.setData(payload);
        this.changeFilter(payload);
        }
      }).present();
      return
    }
  }
}
