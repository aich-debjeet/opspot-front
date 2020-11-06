import { Component, OnInit } from '@angular/core';
import {SponsoredPostComponent} from '../../forms/sponsored-post/sponsored-post.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'app-sponsored-lists',
  templateUrl: './sponsored-lists.component.html',
  styleUrls: ['./sponsored-lists.component.scss']
})
export class SponsoredListsComponent implements OnInit {

  constructor(
    private overlayModal: OverlayModalService,
  ) { }

  ngOnInit() {
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
}
