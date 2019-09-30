import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute } from '@angular/router';
import { OverlayModalService } from '../../services/ux/overlay-modal';



@Component({
  selector: 'app-bluestore',
  templateUrl: './bluestore.component.html',
  styleUrls: ['./bluestore.component.scss']
})
export class BluestoreComponent implements OnInit {


  guid: string;
  inProgress: boolean = false;
  marketplace: any;
  count
  opspot = window.Opspot;

  isTranslatable: boolean;
  canDelete: boolean = false;
  activity:any;
  translateToggle: boolean = false;
  _delete: EventEmitter<any> = new EventEmitter();

  // showBoostOptions: boolean = false;
  // private _showBoostMenuOptions: boolean = false;

  @Input() focusedCommentGuid: string;


  // private defaultMenuOptions: Array<string> = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'share', 'follow', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.guid = params['guid'];
    });
    this.load();
  }

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v3/marketplace/' + this.guid)
      .then((data: any) => {
        console.log(data);
        if (data.marketplace) {
          this.marketplace = data.marketplace;
          this.count = this.marketplace['thumbs:up:count'];

          if (data.marketplace.owner_obj) {
            this.marketplace['ownerObj'] = data.marketplace.owner_obj;
          }
          this.inProgress = false;
        }
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.marketplace.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.marketplace.ownerObj.icontime;
    }
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        //this.editing = true;
       // this.editOptions();
        break;
      case 'delete':
        this.delete();
        break;
      case 'set-explicit':
        this.setExplicit(true);
        break;
      case 'remove-explicit':
        this.setExplicit(false);
        break;
      case 'translate':
        this.translateToggle = true;
        break;
    }
  }

    detectChanges() {
      this.cd.markForCheck();
      this.cd.detectChanges();
    }
  
    liked(count) {
      if (count != this.marketplace['thumbs:up:count:old']) {
        this.count = count;
      } else {
        this.count = this.marketplace['thumbs:up:count']
      }
    }
  
    setExplicit(value: boolean) {
      let oldValue = this.activity.mature,
        oldMatureVisibility = this.activity.mature_visibility;
  
      this.activity.mature = value;
      this.activity.mature_visibility = void 0;
  
      if (this.activity.custom_data && this.activity.custom_data[0]) {
        this.activity.custom_data[0].mature = value;
      } else if (this.activity.custom_data) {
        this.activity.custom_data.mature = value;
      }
  
      this.client.post(`api/v1/entities/explicit/${this.activity.guid}`, { value: value ? '1' : '0' })
        .catch(e => {
          this.activity.mature = oldValue;
          this.activity.mature_visibility = oldMatureVisibility;
  
          if (this.activity.custom_data && this.activity.custom_data[0]) {
            this.activity.custom_data[0].mature = oldValue;
          } else if (this.activity.custom_data) {
            this.activity.custom_data.mature = oldValue;
          }
        });
    }
  
    delete($event: any = {}) {
      if ($event.inProgress) {
        $event.inProgress.emit(true);
      }
      this.client.delete(`api/v1/newsfeed/${this.activity.guid}`)
        .then((response: any) => {
          if ($event.inProgress) {
            $event.inProgress.emit(false);
            $event.completed.emit(0);
          }
          this._delete.next(this.activity);
        })
        .catch(e => {
          if ($event.inProgress) {
            $event.inProgress.emit(false);
            $event.completed.emit(1);
          }
        });
    }


}
