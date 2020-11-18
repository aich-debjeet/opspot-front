import { Component, OnInit } from '@angular/core';
import {SponsoredPostComponent} from '../../forms/sponsored-post/sponsored-post.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-sponsored-lists',
  templateUrl: './sponsored-lists.component.html',
  styleUrls: ['./sponsored-lists.component.scss']
})
export class SponsoredListsComponent implements OnInit {
advertisements: Array<Object>;
menuOptions: Array<string> = ['delete'];
  constructor(
    private overlayModal: OverlayModalService,
    private client: Client,
  ) { }

  ngOnInit() {
    this.getAdvertisements();
  }
  createSponsored(){
    
    this.overlayModal.create(SponsoredPostComponent, '',{
      class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
      // listen to the update callback
      // onUpdate: (payload: any) => {
      //   if (payload)
      //     this.overlayModal.dismiss();
      // }
    }).present();

  }

  getAdvertisements(){
    this.client.get('api/v3/marketing/advertise',{limit:10, offset:''}).then((res)=>{
      this.advertisements= res['advertises']
    })
      .catch((e)=> console.log(e))
  }
}
