import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../services/translation';
import { BoostCreatorComponent } from '../../boost/creator/creator.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { OpspotTitle } from '../../../services/ux/title';
import { ScrollService } from '../../../services/ux/scroll';




@Component({
  selector: 'app-big-event-view',
  templateUrl: './big-event-view.html',
  styleUrls: ['./big-event-view.scss']
})
export class BigEventView implements OnInit {

  inProgress: boolean = true;
  bigEvent: any;
  entity_guid;
  paramsSubscription: Subscription;
  opspot = window.Opspot;
  coverImage;

  canDelete: boolean = false;
  isTranslatable: boolean;
  translateToggle: boolean = false;
  count;
  remindMessage = '';
  remindOpen = false;
  showBoostOptions: boolean = false;
  reachoutMessage = 'I am interested in: ';
  user: any;
  isLocked = false;
  error: string = '';

  menuOptions: Array<string> = ['translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating'];
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  translateEvent: EventEmitter<any> = new EventEmitter();




  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public translationService: TranslationService,
    public overlayModal: OverlayModalService,
    public title: OpspotTitle,
    public scroll: ScrollService
  ) { }


  ngOnInit() {
    this.title.setTitle('View Event');
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.entity_guid = params.get('guid');
        console.log( this.entity_guid)
        this.load();
      }
    });
    this.onScroll();
  }



  load() {
    // if (this.inProgress)
    //   return false;

    // this.inProgress = true;

    this.client.get('api/v1/newsfeed/single/' + this.entity_guid)
      .then((data: any) => {
        if (data.activity) {
          this.bigEvent = data.activity;
          // user obj for reach out
          this.user = data.activity.ownerObj;
          this.reachoutMessage += data.activity['perma_url'];
          if (data.activity.owner_obj) {
            this.bigEvent['ownerObj'] = data.activity.owner_obj;
          }
          if (this.bigEvent.custom_data) {
            this.coverImage = this.bigEvent.custom_data[0].src;
          }

          this.count = this.bigEvent['thumbs:up:count'];

          this.inProgress = false;
        }
        this.isTranslatable = (
          this.translationService.isTranslatable(this.bigEvent)
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
    if (session && session.guid === this.bigEvent.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.bigEvent.ownerObj.icontime;
    }
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  // propagateTranslation($event) {
  //   if (this.bigEvent.remind_object && this.translationService.isTranslatable(this.bigEvent.remind_object)) {
  //     this.childEventsEmitter.emit({
  //       action: 'translate',
  //       args: [$event]
  //     });
  //   }
  // }

  liked(count) {
    if (count != this.bigEvent['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.bigEvent['thumbs:up:count']
    }
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'delete':
        this.delete();
        break;
      case 'set-explicit':
        //this.setExplicit(true);
        break;
      case 'remove-explicit':
        //this.setExplicit(false);
        break;
      case 'translate':
        this.translateToggle = true;
        break;
    }
  }

  delete($event: any = {}) {
    if ($event.inProgress) {
      $event.inProgress.emit(true);
    }
    this.client.delete(`api/v3/event/${this.bigEvent.entity_guid}`)
      .then((response: any) => {
        this.router.navigate([`newsfeed/subscribed`]);
      })
      .catch(e => {
        alert((e && e.message) || 'Server error');
      });
  }

  shareOptionSelected(option: string) {
    // console.log('shareOptionSelected', option);
    if (option === 'repost') {
      this.remindOpen = true;
    };
  }

  remindPost($event) {
    if ($event.message) {
      this.remindMessage = $event.message;
    }

    this.bigEvent.reminded = true;
    this.bigEvent.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.bigEvent.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.bigEvent.reminded = false;
        this.bigEvent.reminds--;
      });
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.bigEvent, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  propagateTranslation($event) {
    if (this.bigEvent.remind_object && this.translationService.isTranslatable(this.bigEvent.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  navToUpdate(){
    if(this.bigEvent['event_type']== "Premium"){
      this.router.navigate(['/campaign/edit/' , this.bigEvent.entity_guid]);
    }
    else{
      this.router.navigate(['/event/edit/',this.bigEvent.entity_guid]);
    }
    

  }
}
