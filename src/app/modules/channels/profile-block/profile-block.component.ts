import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../services/api';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { ProfileBlockSuccessComponent } from './profile-block-success/profile-block-success.component';

@Component({
  moduleId: module.id,
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss']
})
export class ProfileBlockComponent implements OnInit {

  constructor(
    public client: Client,
    public overlayService: OverlayModalService,
  ) { }

  ngOnInit() {
  }

  user: any = {
    blocked: false,
    guid: '',
    name: ''
  };

  showMenu: boolean = false;

  @Input('object') set data(object) {
    this.user.guid = object ? object.guid : null;
    this.user.name = object ? object.name : null;
  }


  block() {
    var self = this;
    this.user.blocked = true;
    this.client.put('api/v1/block/' + this.user.guid, {})
      .then((response: any) => {
        self.user.blocked = true;
        this.overlayService.create(ProfileBlockSuccessComponent, '', {
          class: 'm-overlay-modal--report m-overlay-modal--medium-report-success',
        }).present(); 
      })
      .catch((e) => {
        self.user.blocked = false;
      });
    this.showMenu = false;
  }

  cancel(){
    this.overlayService.dismiss();
  }


}
