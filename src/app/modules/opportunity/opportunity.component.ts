import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityFormComponent } from '../forms/opportunity-form/opportunity-form.component';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation';
import { ScrollService } from '../../services/ux/scroll';
import { BoostCreatorComponent } from '../boost/creator/creator.component';
import { OpspotTitle } from '../../services/ux/title';



@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  guid: string;
  paramsSubscription: Subscription;
  reachoutMessage = 'Is there an opening? ';
  user: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    private router: Router,
    public translationService: TranslationService,
    public scroll: ScrollService,
    public title: OpspotTitle,
  ) { }

  ngOnInit() {
    this.title.setTitle('Opportunity');
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
    this.onScroll();
  }

  // activity: any;
  opspot = window.Opspot;
  boosted: boolean = false;
  commentsToggle: boolean = false;
  translateToggle: boolean = false;
  translateEvent: EventEmitter<any> = new EventEmitter();
  showBoostOptions: boolean = false;
  private _showBoostMenuOptions: boolean = false;
  count;
  type: string;
  element: any;
  visible: boolean = false;
  showOpportunity = false;
  inProgress: boolean = false;
  opportunity: any;
  _delete: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  scroll_listener;

  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  offset = '';
  isLocked: boolean = false;
  remindOpen = false;
  remindMessage = '';

  private defaultMenuOptions: Array<string> = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating'];

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v1/newsfeed/single/' + this.guid)
      .then((data: any) => {
        if (data.activity) {

          this.opportunity = data.activity;// user obj for reach out
          this.user = data.activity.ownerObj;
          this.reachoutMessage += data.activity['perma_url'];

          this.opportunity.url = window.Opspot.site_url + 'opportunity/' + this.opportunity.guid;

          this.count = this.opportunity['thumbs:up:count'];

          if (data.activity.owner_obj) {
            this.opportunity['ownerObj'] = data.activity.owner_obj;
          }
          this.inProgress = false;
        }
        this.isTranslatable = (
          this.translationService.isTranslatable(this.opportunity)
        );
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
        this.error = 'Sorry, there was problem.';
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
    this.client.delete(`api/v3/opportunity/${this.opportunity.entity_guid}`)
      .then((response: any) => {
        if ($event.inProgress) {
          $event.inProgress.emit(false);
          $event.completed.emit(0);
        }
        this.router.navigate([`newsfeed/subscribed`]);
        // this._delete.next(this.opportunity);
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
    const url: string = `api/v3/bookmark/${this.opportunity.guid}/opportunity`;
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
      // case 'set-explicit':
      //   //this.setExplicit(true);
      //   break;
      // case 'remove-explicit':
      //   //this.setExplicit(false);
      //   break;
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
    this.load();
    this.detectChanges();
  }

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

  propagateTranslation($event) {
    if (this.opportunity.remind_object && this.translationService.isTranslatable(this.opportunity.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.opportunity, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
  }

  shareOptionSelected(option: string) {
    if (option === 'repost') {
      this.remindOpen = true;
    }
  }

  remindPost($event) {
    if ($event.message) {
      this.remindMessage = $event.message;
    }

    this.opportunity.reminded = true;
    this.opportunity.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.opportunity.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.opportunity.reminded = false;
        this.opportunity.reminds--;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
