import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { OpspotActivityObject } from '../../../interfaces/entities';
import { ActivatedRoute } from '@angular/router';

import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'app-portfolio-inner',
  templateUrl: './portfolio-inner.component.html',
  styleUrls: ['./portfolio-inner.component.scss']
})
export class PortfolioInnerComponent implements OnInit {
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
  }
  activity: any;
  opspot = window.Opspot;

  boosted: boolean = false;
  commentsToggle: boolean = false;
  translateToggle: boolean = false;
  translateEvent: EventEmitter<any> = new EventEmitter();
  showBoostOptions: boolean = false;
  private _showBoostMenuOptions: boolean = false;
  count;
  allOpportunities: any;


  type: string;
  element: any;
  visible: boolean = false;
  inProgress: boolean = false;
  portFolio: any;

  _delete: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  scroll_listener;

  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  offset = '';
  
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
  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;
    this.portFolio = {
      "guid": "1026022979215454208",
      "type": "object",
      "subtype": "image",
      "time_created": "1572552000",
      "time_updated": "1569998980",
      "container_guid": "989399767404519427",
      "owner_guid": "989399767404519427",
      "access_id": "2",
      "nsfw": [],
      "nsfw_lock": [],
      "allow_comments": true,
      "title": "Day 31 of the 31 Days of Halloween. \nHere is a final last minute costume idea. \nHappy Halloween",
      "featured": false,
      "featured_id": false,
      "ownerObj": {
        "guid": "989399767404519427",
        "type": "user",
        "subtype": false,
        "time_created": "1561267286",
        "time_updated": false,
        "container_guid": "0",
        "owner_guid": "0",
        "site_guid": false,
        "access_id": "2",
        "tags": [],
        "nsfw": [],
        "nsfw_lock": [],
        "allow_comments": false,
        "name": "DivaDoll",
        "username": "divadoll",
        "language": "en",
        "icontime": "1569982805",
        "legacy_guid": false,
        "featured_id": false,
        "banned": "no",
        "ban_reason": false,
        "website": "",
        "briefdescription": "Hello, I'm Mrs. Doll,  I live in Minnesota with my amazing husband. We're organic, free range, hippies, who believe in a decentralized living.\n\nI love to research, explore my natural environment, and create.\n\nMy goal for this channel is to help inspire others. \n\nI am also interested in sharing art and other things that I find eye opening and spiritually engaging. \n\nI spent a fair amount of time off-grid and recently re-entered society.\n\nIn my spare time, I substitute as a Backyard Tourist, and volunteer my services as a Freelance Know-It-All. \n\n",
        "dob": "",
        "gender": "",
        "city": "Mankato",
        "merchant": {
          "service": "stripe",
          "id": "acct_1FNZ9iAfYt6GfvhP"
        },
        "boostProPlus": false,
        "fb": false,
        "mature": "0",
        "monetized": "",
        "signup_method": false,
        "social_profiles": [],
        "feature_flags": false,
        "programs": [],
        "plus": true,
        "hashtags": false,
        "verified": true,
        "founder": false,
        "disabled_boost": true,
        "boost_autorotate": true,
        "categories": [],
        "wire_rewards": {
          "description": "",
          "rewards": {
            "points": [],
            "money": [],
            "tokens": []
          }
        },
        "pinned_posts": ["1025687921954775040", "1025688964679720960", "1025687419265531904"],
        "is_mature": false,
        "mature_lock": false,
        "last_accepted_tos": "1558597098",
        "opted_in_hashtags": "1",
        "last_avatar_upload": "1569982805",
        "canary": true,
        "theme": "light",
        "toaster_notifications": true,
        "mode": "0",
        "btc_address": "",
        "chat": true,
        "urn": "urn:user:989399767404519427",
        "subscribed": false,
        "subscriber": false,
        "boost_rating": "2",
        "pro": false,
        "rewards": true,
        "p2p_media_enabled": false,
        "is_admin": false,
        "onchain_booster": "0",
        "eth_wallet": "0xdb170a3331474ee0750621bff583e4a437aa8c35",
        "rating": "1"
      },
      "category": false,
      "comments:count": false,
      "thumbs:up:count": 0,
      "thumbs:up:user_guids": false,
      "thumbs:down:count": 0,
      "thumbs:down:user_guids": false,
      "flags": {
        "mature": false
      },
      "wire_threshold": "0",
      "thumbnail": "https:\/\/cdn.minds.com\/fs\/v1\/thumbnail\/1026022979215454208\/xlarge?jwtsig=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUxNTg0MDAsInVyaSI6Imh0dHBzOlwvXC9jZG4ubWluZHMuY29tXC9mc1wvdjFcL3RodW1ibmFpbFwvMTAyNjAyMjk3OTIxNTQ1NDIwOFwveGxhcmdlIiwidXNlcl9ndWlkIjoiOTQ1NjYxMzU5NDUyODU2MzIxIn0.m-RUgYxVFuK0YHmmy1Xg-YF6ctF2-87Q0kGQ_HMmmjo",
      "cinemr_guid": false,
      "license": false,
      "mature": false,
      "boost_rejection_reason": -1,
      "rating": 2,
      "width": 564,
      "height": 752,
      "gif": false,
      "time_sent": 1569998940,
      "urn": "urn:image:1026022979215454208",
      "thumbnail_src": "https:\/\/cdn.minds.com\/fs\/v1\/thumbnail\/1026022979215454208\/xlarge?jwtsig=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUxNTg0MDAsInVyaSI6Imh0dHBzOlwvXC9jZG4ubWluZHMuY29tXC9mc1wvdjFcL3RodW1ibmFpbFwvMTAyNjAyMjk3OTIxNTQ1NDIwOFwveGxhcmdlIiwidXNlcl9ndWlkIjoiOTQ1NjYxMzU5NDUyODU2MzIxIn0.m-RUgYxVFuK0YHmmy1Xg-YF6ctF2-87Q0kGQ_HMmmjo",
      "description": null
    };
    this.count = this.portFolio['thumbs:up:count'];
    // this.client.get('' + this.guid)
    //   .then((data: any) => {
    //     if (data.event) {
    //       this.portFolio = {
    //         "guid": "1026022979215454208",
    //         "type": "object",
    //         "subtype": "image",
    //         "time_created": "1572552000",
    //         "time_updated": "1569998980",
    //         "container_guid": "989399767404519427",
    //         "owner_guid": "989399767404519427",
    //         "access_id": "2",
    //         "nsfw": [],
    //         "nsfw_lock": [],
    //         "allow_comments": true,
    //         "title": "Day 31 of the 31 Days of Halloween. \nHere is a final last minute costume idea. \nHappy Halloween",
    //         "featured": false,
    //         "featured_id": false,
    //         "ownerObj": {
    //           "guid": "989399767404519427",
    //           "type": "user",
    //           "subtype": false,
    //           "time_created": "1561267286",
    //           "time_updated": false,
    //           "container_guid": "0",
    //           "owner_guid": "0",
    //           "site_guid": false,
    //           "access_id": "2",
    //           "tags": [],
    //           "nsfw": [],
    //           "nsfw_lock": [],
    //           "allow_comments": false,
    //           "name": "DivaDoll",
    //           "username": "divadoll",
    //           "language": "en",
    //           "icontime": "1569982805",
    //           "legacy_guid": false,
    //           "featured_id": false,
    //           "banned": "no",
    //           "ban_reason": false,
    //           "website": "",
    //           "briefdescription": "Hello, I'm Mrs. Doll,  I live in Minnesota with my amazing husband. We're organic, free range, hippies, who believe in a decentralized living.\n\nI love to research, explore my natural environment, and create.\n\nMy goal for this channel is to help inspire others. \n\nI am also interested in sharing art and other things that I find eye opening and spiritually engaging. \n\nI spent a fair amount of time off-grid and recently re-entered society.\n\nIn my spare time, I substitute as a Backyard Tourist, and volunteer my services as a Freelance Know-It-All. \n\n",
    //           "dob": "",
    //           "gender": "",
    //           "city": "Mankato",
    //           "merchant": {
    //             "service": "stripe",
    //             "id": "acct_1FNZ9iAfYt6GfvhP"
    //           },
    //           "boostProPlus": false,
    //           "fb": false,
    //           "mature": "0",
    //           "monetized": "",
    //           "signup_method": false,
    //           "social_profiles": [],
    //           "feature_flags": false,
    //           "programs": [],
    //           "plus": true,
    //           "hashtags": false,
    //           "verified": true,
    //           "founder": false,
    //           "disabled_boost": true,
    //           "boost_autorotate": true,
    //           "categories": [],
    //           "wire_rewards": {
    //             "description": "",
    //             "rewards": {
    //               "points": [],
    //               "money": [],
    //               "tokens": []
    //             }
    //           },
    //           "pinned_posts": ["1025687921954775040", "1025688964679720960", "1025687419265531904"],
    //           "is_mature": false,
    //           "mature_lock": false,
    //           "last_accepted_tos": "1558597098",
    //           "opted_in_hashtags": "1",
    //           "last_avatar_upload": "1569982805",
    //           "canary": true,
    //           "theme": "light",
    //           "toaster_notifications": true,
    //           "mode": "0",
    //           "btc_address": "",
    //           "chat": true,
    //           "urn": "urn:user:989399767404519427",
    //           "subscribed": false,
    //           "subscriber": false,
    //           "boost_rating": "2",
    //           "pro": false,
    //           "rewards": true,
    //           "p2p_media_enabled": false,
    //           "is_admin": false,
    //           "onchain_booster": "0",
    //           "eth_wallet": "0xdb170a3331474ee0750621bff583e4a437aa8c35",
    //           "rating": "1"
    //         },
    //         "category": false,
    //         "comments:count": false,
    //         "thumbs:up:count": 0,
    //         "thumbs:up:user_guids": false,
    //         "thumbs:down:count": 0,
    //         "thumbs:down:user_guids": false,
    //         "flags": {
    //           "mature": false
    //         },
    //         "wire_threshold": "0",
    //         "thumbnail": "https:\/\/cdn.minds.com\/fs\/v1\/thumbnail\/1026022979215454208\/xlarge?jwtsig=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUxNTg0MDAsInVyaSI6Imh0dHBzOlwvXC9jZG4ubWluZHMuY29tXC9mc1wvdjFcL3RodW1ibmFpbFwvMTAyNjAyMjk3OTIxNTQ1NDIwOFwveGxhcmdlIiwidXNlcl9ndWlkIjoiOTQ1NjYxMzU5NDUyODU2MzIxIn0.m-RUgYxVFuK0YHmmy1Xg-YF6ctF2-87Q0kGQ_HMmmjo",
    //         "cinemr_guid": false,
    //         "license": false,
    //         "mature": false,
    //         "boost_rejection_reason": -1,
    //         "rating": 2,
    //         "width": 564,
    //         "height": 752,
    //         "gif": false,
    //         "time_sent": 1569998940,
    //         "urn": "urn:image:1026022979215454208",
    //         "thumbnail_src": "https:\/\/cdn.minds.com\/fs\/v1\/thumbnail\/1026022979215454208\/xlarge?jwtsig=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUxNTg0MDAsInVyaSI6Imh0dHBzOlwvXC9jZG4ubWluZHMuY29tXC9mc1wvdjFcL3RodW1ibmFpbFwvMTAyNjAyMjk3OTIxNTQ1NDIwOFwveGxhcmdlIiwidXNlcl9ndWlkIjoiOTQ1NjYxMzU5NDUyODU2MzIxIn0.m-RUgYxVFuK0YHmmy1Xg-YF6ctF2-87Q0kGQ_HMmmjo",
    //         "description": null
    //       };
    //       this.count = this.portFolio['thumbs:up:count'];

    //       if (data.event.owner_obj) {
    //         this.portFolio['ownerObj'] = data.event.owner_obj;
    //       }
    //       this.inProgress = false;
    //     }
    //   })
    //   .catch((e) => {
    //     this.inProgress = false;
    //   });
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.portFolio.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.portFolio.ownerObj.icontime;
    }
  }
}
