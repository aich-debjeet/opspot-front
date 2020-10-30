import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { BlueStoreFormComponent } from '../../forms/blue-store-form/blue-store-form.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  defaultOption: string;
  moreData: boolean = true;
  inProgress: boolean = false;
  offset: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public overlayModal: OverlayModalService,
  ) {
    this.defaultOption = 'BlueStore'
  }

  ngOnInit() {
  }

  changeMarketType(type: string) {
    this.defaultOption = type;
  }

  onActivate(event) {
    event.off.subscribe((data) => {
      if (data) {
        this.offset = data;
      } else this.offset = '';
    })
    event.mreData.subscribe((data) => {
      this.moreData = data;
    })
    event.inProg.subscribe((data) => {
      this.inProgress = data;
    })
  }
  load() {
    this.router.navigate([], { queryParams: { offset: this.offset }, queryParamsHandling: 'merge' })

  }
  openBlustoreForm() {
    this.overlayModal.create(BlueStoreFormComponent, '', {
      class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
      // listen to the update callback
      onUpdate: (payload: any) => {
        if (payload)
          this.overlayModal.dismiss();
      }
    }).present();
  }

}
