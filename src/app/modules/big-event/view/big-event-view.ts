import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../services/translation';



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
  count


  menuOptions: Array<string> = ['translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating'];
  childEventsEmitter: EventEmitter<any> = new EventEmitter();



  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public translationService: TranslationService,
  ) { }


  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.entity_guid = params.get('guid');
        this.load();
      }
    });
  }



  load() {
    // if (this.inProgress)
    //   return false;

    // this.inProgress = true;

    this.client.get('api/v1/newsfeed/single/' + this.entity_guid)
      .then((data: any) => {
        if (data.activity) {
          this.bigEvent = data.activity;
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

  propagateTranslation($event) {
    if (this.bigEvent.remind_object && this.translationService.isTranslatable(this.bigEvent.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

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

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }




}
