import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { GroupsService } from '../../groups-service';

import { Client } from '../../../../services/api';
import { Session } from '../../../../services/session';
import { GroupsService } from '../../groups-service';
import { Location } from '@angular/common';

@Component({
    selector: 'opspot-groups-profile-conversation-mobile',
    templateUrl: 'mobile-conversation.html'
})
export class GroupsProfileConversationMobile {
    //   constructor(public session: Session, private router: Router) { }

    //   ngOnInit() {
    //     if (!this.group['is:member'] && this.group.membership != 2) {
    //       this.router.navigate(['/groups/conversation', this.group.guid, 'activity']);
    //       return;
    //     }
    //   }

    group;
    
    constructor(
        private _location: Location,
        public route: ActivatedRoute,
        private service: GroupsService
    ) {
        this.route.params.subscribe(params => {
            console.log("Params: ", params);
            if (params['guid']) {
            this.load(params['guid'])
            }
        })
    }

    goBack() {
        this._location.back()
    }

    async load(guid) {
        let group = await this.service.load(guid)
        this.group = group;
    }

}
