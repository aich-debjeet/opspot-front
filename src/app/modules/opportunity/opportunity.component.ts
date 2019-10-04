import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute } from '@angular/router';
import { OpportunityFormComponent } from '../forms/opportunity-form/opportunity-form.component';
import { OverlayModalService } from '../../services/ux/overlay-modal';


@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  guid: string;

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
    this.loadAllOpportunities();
    this.loadAllEvents();
  }

  activity: any;
  opspot = window.Opspot;
  allevents = [];

  boosted: boolean = false;
  commentsToggle: boolean = false;
  // shareToggle: boolean = false;
  // deleteToggle: boolean = false;
  translateToggle: boolean = false;
  translateEvent: EventEmitter<any> = new EventEmitter();
  showBoostOptions: boolean = false;
  private _showBoostMenuOptions: boolean = false;
  count;
  allOpportunities = [];


  type: string;
  element: any;
  visible: boolean = false;
  showOpportunity = false;
  inProgress: boolean = false;
  opportunity: any;

  // editing: boolean = false;

  _delete: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  scroll_listener;

  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  offset = '';

  private defaultMenuOptions: Array<string> = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'share', 'follow', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v3/opportunity/' + this.guid)
      .then((data: any) => {
        if (data.opportunity) {
          this.opportunity = data.opportunity;
          this.count = this.opportunity['thumbs:up:count'];

          if (data.opportunity.owner_obj) {
            this.opportunity['ownerObj'] = data.opportunity.owner_obj;
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
    if (session && session.guid === this.opportunity.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.opportunity.ownerObj.icontime;
    }
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

  async togglePin() {
    this.opportunity.bookmark = !this.opportunity.bookmark;
    const url: string = `api/v3/bookmark/${this.opportunity.guid}/image`;
    try {
      if (this.opportunity.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
      }
    } catch (e) {
      this.opportunity.bookmark = !this.opportunity.bookmark;
    }
  }


  async wireSubmitted(wire?) {
    if (wire && this.opportunity.wire_totals) {
      this.opportunity.wire_totals.tokens =
        parseFloat(this.opportunity.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));

      this.detectChanges();
    }
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        //this.editing = true;
        this.editOptions();
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


  editOptions() {
    if (this.opportunity) {
      this.overlayModal.create(OpportunityFormComponent, this.opportunity, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          this.udpateOpportunity(payload);
        }
      }).present();
    }
  }


  udpateOpportunity(data: any) {
    this.opportunity.category = data.category;
    this.opportunity.description = data.description;
    this.opportunity.location = data.location;
    this.opportunity.title = data.title;
    // trigger component observe new changes
    this.detectChanges();
  }


  private viewed: boolean = false;

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  liked(count) {
    if (count != this.opportunity['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.opportunity['thumbs:up:count']
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

  loadAllOpportunities() {
    this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;
    this.client.get('api/v2/feeds/container/ownerGuid/opportunities?limit=3&sync=&as_activities=&force_public=1')
      .then((data: any) => {
        if (data && data.entities) {
          this.allOpportunities = data.entities;
        }
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  loadAllEvents() {
    alert();
    this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;
    this.client.get('api/v2/feeds/container/ownerGuid/events?limit=3&sync=&as_activities=&force_public=1')
      .then((data: any) => {
        if (data && data.entities) {
          this.allevents = data.entities;
          console.log("allevents: ", data);
          
        }
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

}
