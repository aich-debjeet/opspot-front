import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { OpspotTitle } from '../../../services/ux/title';
import { ChannelOnboardingService } from "../../../modules/onboarding/channel/onboarding.service";
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';

// import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  config;
  completedPercentage: string = '';
  constructor(
    public title: OpspotTitle,
    public onboardingService: ChannelOnboardingService,
    private session: Session,
    private client: Client,
    // private cd: ChangeDetectorRef,
    // private router: Router
  ) {
    if (window.innerWidth < 800) {
      this.config = {
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      };
    } else {
      this.config = {
        slidesPerView: 8,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      };
    }
  }

  ngOnInit() {
    this.checkProgress();
    this.title.setTitle('Profile');
  }
  async checkProgress() {
    if (!this.session.isLoggedIn()) {
      return;
    }
    try {
      const response: any = await this.client.get('api/v2/onboarding/progress');
      this.completedPercentage = response.rating;
    } catch (e) {
      console.error(e);
    }
  }
  onActivate(componentRef){
    componentRef.updatePercentage.subscribe((data) => {
      console.log(data);
      if(data !== 'undefined'){
        this.completedPercentage = data;
      }
   })
  }
  onDeactivate(componentRef){
    componentRef.updatePercentage.unsubscribe();
  }
}
